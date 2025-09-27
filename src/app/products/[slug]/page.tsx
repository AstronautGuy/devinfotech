import prismadb from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import ImageGallery from "./ImageGallery"; // Existing component

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Fetch single product with images, tags, etc.
async function getProduct(slug: string) {
  const product = await prismadb.product.findUnique({
    where: { slug },
    include: { images: true, tags: true },
  });

  if (!product) notFound();
  return product;
}

// Clean rich text HTML into plain text for meta/JSON-LD
function cleanDescription(html: string | null, maxLength = 160) {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " "); // Strip HTML
  const normalized = text.replace(/\s+/g, " ").trim(); // Normalize whitespace
  return normalized.length > maxLength
    ? normalized.slice(0, maxLength) + "…"
    : normalized;
}

// Generate dynamic metadata
export async function generateMetadata(
  { params: { slug } }: ProductPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await getProduct(slug);
  const metaDesc =
    product.metaDescription || cleanDescription(product.description);

  return {
    title: product.metaTitle || product.name,
    description: metaDesc,
    keywords: product.tags.map((tag) => tag.name),
    openGraph: {
      title: product.metaTitle || product.name,
      description: metaDesc,
      images: product.images?.map((img) => ({ url: img.url })) || [],
      url: `https://devinfotech.net/products/${product.slug}`,
      type: "website", // ✅ fixed
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle || product.name,
      description: metaDesc,
      images: product.images?.map((img) => img.url) || [],
    },
    alternates: {
      canonical: `https://devinfotech.net/products/${product.slug}`,
    },
  };
}

// Product page
export default async function ProductPage({
  params: { slug },
}: ProductPageProps) {
  const product = await getProduct(slug);

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: cleanDescription(product.description, 300),
    brand: { "@type": "Brand", name: product.brand || "Unknown Brand" },
    offers: {
      "@type": "Offer",
      url: `https://devinfotech.net/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Devinfotech",
        email: "info@devinfotech.net",
        url: "https://devinfotech.net",
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 md:mt-30">
        <ImageGallery productName={product.name} images={product.images} />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-gray-700 mb-6">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Rich text description */}
          <div
            className="prose dark:prose-invert max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />

          {/* Product tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <button className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
