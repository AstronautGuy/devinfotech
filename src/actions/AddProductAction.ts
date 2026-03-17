// file: app/admin/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormState } from "@/lib/definations";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto"; // Add crypto to generate UUIDs

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  brand: z
    .string()
    .min(3, { message: "brand must be at least 3 characters long." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export async function createProduct(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    brand: formData.get("brand"),
    price: formData.get("price"),
    description: formData.get("description"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to create product.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, slug, brand, price, description, metaTitle, metaDescription } =
    validatedFields.data;

  const imageUrls = formData
    .getAll("images")
    .map(String)
    .filter((url) => url.trim() !== "");

  // ✅ This part processes the input for your tags/meta tags
  const tagsString = (formData.get("tags") as string) || "";
  const tagNames = tagsString
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  try {
    const supabase = await createClient();

    // 1. Insert product
    const { data: productData, error: productError } = await supabase
      .from("Product")
      .insert({
        id: crypto.randomUUID(), // Generate UUID manually
        name,
        slug,
        brand,
        price,
        description,
        metaTitle,
        metaDescription,
        updatedAt: new Date().toISOString(), // Add updatedAt manually
      })
      .select("id")
      .single();

    if (productError) {
      if (productError.code === "23505" && productError.message.includes("slug")) {
        return {
          message: "This slug is already in use. Please choose another.",
          errors: { slug: ["Slug already exists."] },
        };
      }
      throw productError;
    }
    
    if (!productData) throw new Error("Failed to create product");
    
    const newProductId = productData.id;

    // 2. Insert Images
    if (imageUrls.length > 0) {
      await supabase.from("ProductImage").insert(
        imageUrls.map((url) => ({ 
          id: crypto.randomUUID(), // Generate UUID manually
          url, 
          productId: newProductId 
        }))
      );
    }

    // 3. Process Tags
    if (tagNames.length > 0) {
      const { data: upsertedTags, error: tagsErr } = await supabase
        .from("Tag")
        .upsert(
          tagNames.map((name) => ({ name })),
          { onConflict: "name" }
        )
        .select("id");
      
      if (!tagsErr && upsertedTags) {
        await supabase.from("_ProductToTag").insert(
          upsertedTags.map((t) => ({ A: newProductId, B: t.id }))
        );
      }
    }
  } catch (error: unknown) {
    console.error("Database error creating product:", error);
    return { message: "Database error: Failed to create product.", errors: {} };
  }

  revalidatePath("/products");
  redirect(`/products/${slug}`);
}
