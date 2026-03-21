// app/admin/products/actions.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto"; // Add crypto to generate UUIDs
import { FormState } from "@/lib/definations"; // ✅ single source
import { z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  brand: z
    .string()
    .min(3, { message: "Brand must be at least 3 characters long." }),
  category: z.string().optional(),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaTags: z.string().optional(),
});

export async function updateProduct(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const productId = formData.get("productId") as string;
  if (!productId) {
    return { message: "Product ID is missing.", errors: {} };
  }

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    price: formData.get("price"),
    description: formData.get("description"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    metaTags: formData.get("metaTags"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to update product.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, slug, brand, category, price, description, metaTitle, metaDescription, metaTags } =
    validatedFields.data;
  const imageUrls = formData
    .getAll("images")
    .map(String)
    .filter((url) => url.trim() !== "");

  // highlight-start
  // ✅ 1. Get and process tags from the form
  const tagsString = (formData.get("tags") as string) || "";
  const tagNames = tagsString
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");
  // highlight-end

  try {
    const supabase = await createClient();

    // 1. Update product
    const { error: updateError } = await supabase
      .from("Product")
      .update({
        name,
        slug,
        brand,
        category,
        price,
        description,
        metaTitle,
        metaDescription,
        metaTags,
        updatedAt: new Date().toISOString(), // Supabase handles Default manually on update
      })
      .eq("id", productId);

    if (updateError) {
      if (updateError.code === "23505" && updateError.message.includes("slug")) {
        return {
          message: "This slug is already in use. Please choose another.",
          errors: { slug: ["Slug already exists."] },
        };
      }
      throw updateError;
    }

    // 2. Replace images
    await supabase.from("ProductImage").delete().eq("productId", productId);
    if (imageUrls.length > 0) {
      await supabase.from("ProductImage").insert(
        imageUrls.map((url) => ({ 
          id: crypto.randomUUID(), // Add UUID manually
          url, 
          productId 
        }))
      );
    }

    // 3. Replace Tags
    // First, clear existing mappings
    await supabase.from("_ProductToTag").delete().eq("A", productId);
    
    if (tagNames.length > 0) {
      // Upsert tags
      const { data: upsertedTags, error: tagsErr } = await supabase
        .from("Tag")
        .upsert(
          tagNames.map((name) => ({ name })),
          { onConflict: "name" }
        )
        .select("id");
      
      if (!tagsErr && upsertedTags) {
        // Link tags to product
        await supabase.from("_ProductToTag").insert(
          upsertedTags.map((t) => ({ A: productId, B: t.id }))
        );
      }
    }
  } catch (error) {
    console.error("Database error updating product:", error);
    return { message: "Database error: Failed to update product.", errors: {} };
  }

  revalidateTag("products");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${slug}`);

  redirect("/admin/products");
}
