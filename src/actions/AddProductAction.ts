// file: app/admin/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
import { FormState } from "@/lib/definations";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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
    await prismadb.$transaction(async (prisma) => {
      // ✅ This creates the product and connects the tags
      const product = await prisma.product.create({
        data: {
          name,
          slug,
          brand,
          price,
          description,
          metaTitle,
          metaDescription,
          // highlight-start
          tags: {
            connectOrCreate: tagNames.map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          },
          // highlight-end
        },
      });

      // Create associated images
      if (imageUrls.length > 0) {
        await prisma.productImage.createMany({
          data: imageUrls.map((url) => ({
            url: url,
            productId: product.id,
          })),
        });
      }
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[] | undefined;
        if (target?.includes("slug")) {
          return {
            message: "This slug is already in use. Please choose another.",
            errors: { slug: ["Slug already exists."] },
          };
        }
      }
    }
    return { message: "Database error: Failed to create product.", errors: {} };
  }

  revalidatePath("/products");
  redirect(`/products/${slug}`);
}
