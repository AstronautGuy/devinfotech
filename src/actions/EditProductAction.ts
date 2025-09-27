// app/admin/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
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
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
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
    price: formData.get("price"),
    description: formData.get("description"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to update product.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, slug, brand, price, description, metaTitle, metaDescription } =
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
    await prismadb.$transaction(async (prisma) => {
      // ✅ Update product details
      await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          slug,
          brand,
          price,
          description,
          metaTitle,
          metaDescription,
          // highlight-start
          // ✅ 2. Synchronize the tags
          tags: {
            set: [], // This disconnects all previously connected tags
            connectOrCreate: tagNames.map((name) => ({
              where: { name: name },
              create: { name: name },
            })),
          },
          // highlight-end
        },
      });

      // ✅ Replace images (simple approach)
      await prisma.productImage.deleteMany({ where: { productId } });
      if (imageUrls.length > 0) {
        await prisma.productImage.createMany({
          data: imageUrls.map((url) => ({
            url,
            productId,
          })),
        });
      }
    });
  } catch (error) {
    console.error(error);
    return { message: "Database error: Failed to update product.", errors: {} };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/products/${slug}`);

  redirect("/admin/products");
}
