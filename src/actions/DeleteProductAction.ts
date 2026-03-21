// app/admin/products/actions.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteProduct(productId: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("Product").delete().eq("id", productId);
    if (error) throw error;
  } catch (error) {
    // Handle potential errors, e.g., product not found
    console.error("Failed to delete product:", error);
    return { error: "Failed to delete product." };
  }

  // Revalidate paths to reflect the change
  revalidateTag("products");
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
