// app/admin/products/edit/[productId]/page.tsx

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
// We'll create EditProductForm next
import { EditProductForm } from "@/components/forms/EditProductForm";

export const dynamic = 'force-dynamic';

async function getProductById(productId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Product")
    .select(`
      *,
      images:ProductImage(*),
      _ProductToTag(
        Tag(*)
      )
    `)
    .eq("id", productId)
    .single();

  if (error || !data) {
    notFound();
  }
  
  const tags = data._ProductToTag?.map((pt: { Tag: { id: string; name: string } }) => pt.Tag) || [];
  return { ...data, tags };
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <main className="bg-gray-50 py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Edit Product
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Update the details for &quot;{product.name}&quot;.
        </p>
      </div>
      <EditProductForm product={product} />
    </main>
  );
}
