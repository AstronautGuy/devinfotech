// app/admin/products/edit/[productId]/page.tsx

import { notFound } from "next/navigation";
import prismadb from "@/lib/prisma";
// We'll create EditProductForm next
import { EditProductForm } from "@/components/forms/EditProductForm";

async function getProductById(productId: string) {
  const product = await prismadb.product.findUnique({
    where: { id: productId },
    include: { images: true },
  });

  if (!product) {
    notFound();
  }
  return product;
}

export default async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

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
