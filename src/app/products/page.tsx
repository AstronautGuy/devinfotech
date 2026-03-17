// app/products/page.tsx

// import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Metadata } from "next";
import { getKeywords } from "@/lib/seo";

// Fetch all products on the server
// app/products/page.tsx

// Fetch all products for display
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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-6">
            Our Products
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            Browse our complete catalog of high-quality IT hardware and solutions.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="mt-4 text-slate-500 text-center text-lg">
            No products found. Please check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product: { id: string; name: string; description: string | null; images: { url: string }[] }) => {
              const thumbnailUrl = product.images?.[0]?.url;

              return (
                <div
                  key={product.id}
                  className="group bg-white/80 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-xl overflow-hidden transition hover:border-[var(--primary-accent)]/50 duration-500 flex flex-col"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-100 lg:aspect-video relative group-hover:opacity-75 transition-opacity">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-500">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                           {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
