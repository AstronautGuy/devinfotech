import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import ImageGallery from "./ImageGallery"; // Existing component

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch single product with images, tags, etc.
async function getProduct(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Product")
    .select(`
      *,
      images:ProductImage(url),
      _ProductToTag(
        Tag(id, name)
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  // Unwrap junction table to match Prisma's output structure
  const tags = data._ProductToTag?.map((pt: { Tag: { id: string; name: string } }) => pt.Tag) || [];

  return { ...data, tags };
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
  { params }: ProductPageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const metaDesc =
    product.metaDescription || cleanDescription(product.description);

  return {
    title: product.metaTitle || product.name,
    description: metaDesc,
    keywords: product.tags.map((tag: { name: string }) => tag.name),
    openGraph: {
      title: product.metaTitle || product.name,
      description: metaDesc,
      images: product.images?.map((img: { url: string }) => ({ url: img.url })) || [],
      url: `https://devinfotech.net/products/${product.slug}`,
      type: "website", // ✅ fixed
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle || product.name,
      description: metaDesc,
      images: product.images?.map((img: { url: string }) => img.url) || [],
    },
    alternates: {
      canonical: `https://devinfotech.net/products/${product.slug}`,
    },
  };
}

// Product page
export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img: { url: string }) => img.url),
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
            {product.tags.map((tag: { id: string; name: string }) => (
              <span
                key={tag.id}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
