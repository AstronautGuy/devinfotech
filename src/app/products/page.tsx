// app/products/page.tsx

import Link from "next/link";
import prismadb from "@/lib/prisma";
import Image from "next/image";

// Fetch all products on the server
// app/products/page.tsx

async function getProducts() {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // ✅ Include the images for each product
    include: {
      images: {
        take: 1, // We only need the first image for the thumbnail
      },
    },
  });
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products
        </h2>

        {products.length === 0 ? (
          <p className="mt-4 text-gray-500">
            No products found. Please check back later!
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => {
              // Get the first image URL, if it exists
              const thumbnailUrl = product.images?.[0]?.url;

              return (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {/* Updated Image Display */}
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  {/* ... rest of the card component */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
