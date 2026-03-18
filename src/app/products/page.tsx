// app/products/page.tsx

// app/products/page.tsx

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Metadata } from "next";
import { getKeywords } from "@/lib/seo";
import { AnimatedReveal, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/AnimatedReveal";

// Fetch all products on the server
// app/products/page.tsx

// Fetch all products for display
// Clean rich text HTML into plain text for previews
function cleanDescription(html: string | null, maxLength = 160) {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " "); // Strip HTML
  const normalized = text.replace(/\s+/g, " ").trim(); // Normalize whitespace
  return normalized.length > maxLength
    ? normalized.slice(0, maxLength) + "…"
    : normalized;
}

async function getProducts() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("Product")
    .select(`
      *,
      images:ProductImage(url)
    `)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products;
}

// highlight-start
// ✅ 1. Create a function to fetch all unique tags for SEO
async function getAllTags() {
  const supabase = await createClient();
  const { data: tags, error } = await supabase
    .from("Tag")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
  
  // Ensure we only get unique tag names
  const uniqueTagNames = Array.from(new Set(tags.map((t) => t.name)));
  return uniqueTagNames.map((name) => ({ name }));
}
// highlight-end

// --- METADATA GENERATION ---

// highlight-start
// ✅ 2. Generate SEO metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const tags = await getAllTags();
  const tagKeywords = tags.map((tag: { name: string }) => tag.name);

  return {
    title: "Our Products | DevInfotech IT Supplies",
    description: "Browse our complete catalog of high-quality IT hardware, laptop peripherals, and enterprise solutions in Vadodara.",
    keywords: getKeywords([...tagKeywords, "it hardware", "computer sale", "laptops Vadodara"]),
  };
}
// highlight-end

// --- PAGE COMPONENT ---

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Background gradients/effects for glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary-accent)]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-[5%] py-28 min-h-screen">
        <AnimatedReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-6">
            Our Products
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            Browse our complete catalog of high-quality IT hardware and solutions.
          </p>
        </AnimatedReveal>

        {products.length === 0 ? (
          <p className="mt-4 text-slate-500 text-center text-lg">
            No products found. Please check back later!
          </p>
        ) : (
          <AnimatedStaggerGroup className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product: { id: string; slug: string; name: string; description: string | null; metaDescription?: string | null; images: { url: string }[] }) => {
              const thumbnailUrl = product.images?.[0]?.url;
              
              // Use metaDescription as a fallback if rich description fails or is missing, or vice versa
              const descText = product.description ? cleanDescription(product.description, 160) : product.metaDescription;

              return (
                <AnimatedStaggerItem key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                  className="group relative bg-white/70 rounded-3xl backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                  
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-50 lg:aspect-video relative group-hover:opacity-90 transition-opacity z-10">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-300">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between z-10">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[var(--primary-accent)] transition-colors">
                        {product.name}
                      </h3>
                      {descText ? (
                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                           {descText}
                        </p>
                      ) : (
                        <p className="text-slate-400 text-sm italic">
                           No description available.
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 flex items-center text-[var(--primary-accent)] font-bold text-sm uppercase tracking-wide">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStaggerGroup>
        )}
      </div>
    </div>
  );
}
