// app/products/page.tsx

import Link from "next/link";
import prismadb from "@/lib/prisma";
import Image from "next/image";
import { Metadata } from "next";

// Fetch all products on the server
// app/products/page.tsx

// Fetch all products for display
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

// highlight-start
// ✅ 1. Create a function to fetch all unique tags for SEO
async function getAllTags() {
  const tags = await prismadb.tag.findMany({
    orderBy: {
      name: "asc",
    },
    distinct: ["name"], // Ensure we only get unique tag names
  });
  return tags;
}
// highlight-end

// --- METADATA GENERATION ---

// highlight-start
// ✅ 2. Generate SEO metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const tags = await getAllTags();
  const tagKeywords = tags.map((tag) => tag.name);

  return {
    title: "Our Products | Your E-commerce Store",
    description: "Browse our complete collection of high-quality products.",
    // This will create a <meta name="keywords" content="tag1, tag2, ...">
    keywords: tagKeywords,
  };
}
// highlight-end

// --- PAGE COMPONENT ---

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
              const thumbnailUrl = product.images?.[0]?.url;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
