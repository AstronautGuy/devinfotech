import Link from "next/link";
import { createClient as createBrowserClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { Metadata } from "next";
import { getKeywords } from "@/lib/seo";
import { ProductFilters } from "@/components/ProductFilters";
import { AnimatedReveal, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/AnimatedReveal";

// Description cleaner removed as it was unused
interface TagRecord {
  Tag?: { name: string };
}
interface ProductRecord {
  id: string;
  name: string;
  brand?: string;
  price: number;
  slug: string;
  createdAt: string;
  images?: { url: string }[];
  _ProductToTag?: TagRecord[];
}

const getProducts = unstable_cache(
  async () => {
    const supabaseAnon = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    const { data: products, error } = await supabaseAnon
      .from("Product")
      .select(`
        *,
        images:ProductImage(url),
        _ProductToTag(
          Tag(name)
        )
      `)
      .order("createdAt", { ascending: false });
    if (error) return [];
    return products || [];
  },
  ['all-products-v3'],
  { revalidate: 3600, tags: ['products'] }
);

const getAllTags = unstable_cache(
  async () => {
    const supabaseAnon = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    const { data: tags, error } = await supabaseAnon
       .from("Tag")
       .select("name")
       .order("name", { ascending: true });
    if (error) return [];
    const uniqueTagNames = Array.from(new Set(tags.map((t: { name: string }) => t.name)));
    return uniqueTagNames.map((name) => ({ name }));
  },
  ['all-tags-v3'],
  { revalidate: 3600, tags: ['tags'] }
);

export async function generateMetadata(): Promise<Metadata> {
  const tags = await getAllTags();
  const tagKeywords = tags.map((tag: { name: string }) => tag.name);
  return {
    title: "Our Arsenal | DevInfotech IT Supplies",
    description: "Browse our complete catalog of high-quality IT hardware, laptop peripherals, and enterprise solutions in Vadodara.",
    keywords: getKeywords([...tagKeywords, "it hardware", "computer sale", "laptops Vadodara"]),
  };
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined;
  const sort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : undefined;

  let products: ProductRecord[] = await getProducts();

  if (q) {
    const lowerQ = q.toLowerCase();
    products = products.filter((p: ProductRecord) => 
      p.name.toLowerCase().includes(lowerQ) || 
      (p.brand && p.brand.toLowerCase().includes(lowerQ))
    );
  }

  if (category) {
    products = products.filter((p: ProductRecord) => 
      p._ProductToTag?.some((pt: TagRecord) => pt.Tag?.name === category)
    );
  }

  if (sort === 'price_asc') {
    products.sort((a: ProductRecord, b: ProductRecord) => a.price - b.price);
  } else if (sort === 'price_desc') {
    products.sort((a: ProductRecord, b: ProductRecord) => b.price - a.price);
  } else if (sort === 'newest') {
    products.sort((a: ProductRecord, b: ProductRecord) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const tags = await getAllTags();
  const uniqueCategories = tags.map((t: { name: string }) => t.name);

  return (
    <div className="text-slate-900 min-h-screen relative overflow-hidden">
      {/* Gentle Ambient Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-[80vh] z-0 pointer-events-none opacity-40 mix-blend-multiply">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[100%] rounded-full bg-[var(--primary-accent)]/20 blur-[150px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] rounded-full bg-indigo-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-[5%] pt-40 md:pt-48 pb-24 min-h-screen">
        <AnimatedReveal className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 drop-shadow-sm">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-accent)] to-indigo-500">Devfinity</span> Arsenal
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Discover our curated collection of raw computational power, elite peripherals, and enterprise infrastructure.
          </p>
        </AnimatedReveal>

        <AnimatedReveal className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Left Sidebar: Categories */}
          <aside className="w-full lg:w-1/4 bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/60 p-6 flex flex-col gap-2 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-xs font-bold text-slate-400 mb-4 tracking-[0.2em] uppercase">Architecture</h2>
            <Link
              href="/products"
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                !category 
                  ? 'bg-[var(--primary-accent)]/10 border-l-2 border-[var(--primary-accent)] text-[var(--primary-accent)]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              All Machinery
              {!category ? (
                <svg className="w-4 h-4 text-[var(--primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </Link>
            {uniqueCategories.map((cat: string) => {
              const isActive = category === cat;
              return (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[var(--primary-accent)]/10 border-l-2 border-[var(--primary-accent)] text-[var(--primary-accent)]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {cat}
                  {isActive ? (
                    <svg className="w-4 h-4 text-[var(--primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </aside>

          {/* Right Main Content */}
          <main className="w-full lg:w-3/4 flex flex-col gap-6">
            <ProductFilters />

            <div className="text-slate-500 text-sm px-2 font-mono tracking-widest uppercase font-bold shadow-none">
              {`// ${products.length} Node${products.length !== 1 ? 's' : ''} Activated`}
            </div>

            {products.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/60 p-16 text-center text-slate-500 shadow-sm flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-slate-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">Database empty. No architecture matches your query.</p>
              </div>
            ) : (
              <AnimatedStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product: ProductRecord) => {
                  const thumbnailUrl = product.images?.[0]?.url;
                  const primaryCategory = product._ProductToTag?.[0]?.Tag?.name || "CORE COMPONENT";
                  
                  return (
                    <AnimatedStaggerItem key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="group flex flex-col bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 overflow-hidden hover:border-[var(--primary-accent)]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 h-full relative"
                      >
                        {/* Image Container with Radial Glow */}
                        <div className="aspect-square w-full p-8 flex flex-col justify-center items-center relative overflow-hidden bg-white/50">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--primary-accent)]/5 blur-3xl rounded-full z-0 group-hover:bg-[var(--primary-accent)]/10 transition-colors duration-500"></div>
                          
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={product.name}
                              width={300}
                              height={300}
                              priority={true}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-contain max-h-[220px] w-full group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 z-10 drop-shadow-md"
                            />
                          ) : (
                            <div className="text-slate-400 z-10">
                              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="px-6 py-5 flex flex-col flex-grow border-t border-white/40 z-20">
                          <p className="text-[10px] font-black text-[var(--primary-accent)] uppercase tracking-widest mb-2 line-clamp-1">
                            {primaryCategory}
                          </p>
                          <h3 className="text-[16px] font-bold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xl font-black text-slate-900 tracking-tight">
                              ₹{product.price.toLocaleString("en-IN")}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[var(--primary-accent)] group-hover:text-white transition-colors duration-300 text-slate-400 shadow-sm border border-slate-200">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                               </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedStaggerItem>
                  );
                })}
              </AnimatedStaggerGroup>
            )}
          </main>
        </AnimatedReveal>
      </div>
    </div>
  );
}
