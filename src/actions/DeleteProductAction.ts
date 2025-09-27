// app/admin/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import prismadb from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function deleteProduct(productId: string) {
  try {
    await prismadb.product.delete({
      where: { id: productId },
    });
  } catch (error) {
    // Handle potential errors, e.g., product not found
    console.error("Failed to delete product:", error);
    return { error: "Failed to delete product." };
  }

  // Revalidate paths to reflect the change
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
