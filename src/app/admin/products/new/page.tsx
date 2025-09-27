// app/admin/products/new/page.tsx
import { AddProductForm } from "@/components/forms/AddProductForm"; // Adjust path if needed

export default function NewProductPage() {
  return (
    <main className="bg-gray-50 py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add a New Product
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Fill out the details below to add a new item to the catalog.
        </p>
      </div>
      <AddProductForm />
    </main>
  );
}
