// app/admin/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
import { FormState } from "@/lib/definations";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// highlight-start
// 1. Define a type for the form state
// highlight-end

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// highlight-start
// 2. Use the new type for the prevState parameter
export async function createProduct(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // highlight-end
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
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

  const { name, slug, price, description, metaTitle, metaDescription } =
    validatedFields.data;
  const imageUrls = formData
    .getAll("images")
    .map(String)
    .filter((url) => url.trim() !== "");
  const tagsString = (formData.get("tags") as string) || "";
  const tagNames = tagsString
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  try {
    await prismadb.$transaction(async (prisma) => {
      // ... (database logic remains the same)
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
