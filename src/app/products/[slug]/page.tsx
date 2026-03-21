import { createClient as createBrowserClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import ImageGallery from "./ImageGallery"; 

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getProduct = unstable_cache(
  async (slug: string) => {
    const supabaseAnon = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data, error } = await supabaseAnon
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

    if (error || !data) return null;

    const tags = data._ProductToTag?.map((pt: { Tag: { id: string; name: string } }) => pt.Tag) || [];

    return { ...data, tags };
  },
  ['unique-product-detail-v2'],
  { revalidate: 3600, tags: ['products'] }
);

function cleanDescription(html: string | null, maxLength = 160) {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " "); 
  const normalized = text.replace(/\s+/g, " ").trim(); 
  return normalized.length > maxLength
    ? normalized.slice(0, maxLength) + "…"
    : normalized;
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

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
      type: "website", 
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

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    sku: product.id.split('-')[0].toUpperCase(),
    mpn: product.id.split('-')[0].toUpperCase(),
    image: product.images.map((img: { url: string }) => img.url),
    description: cleanDescription(product.description, 300),
    brand: { "@type": "Brand", name: product.brand || "DevInfotech" },
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
    <div className="text-slate-900 min-h-screen relative overflow-hidden selection:bg-[var(--primary-accent)] selection:text-white pb-32">
      {/* Ambient Orbs - Multiply for Light Mode */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none opacity-20 mix-blend-multiply overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[100%] rounded-full bg-[var(--primary-accent)]/30 blur-[150px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[80%] rounded-full bg-indigo-500/20 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 pt-40 md:pt-48 relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Image Gallery */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-36 relative z-20">
            <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-4 lg:p-8 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <ImageGallery productName={product.name} images={product.images} />
            </div>
            
            {/* Visual Anchor beneath gallery */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
               <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
               <span className="text-xs uppercase tracking-widest font-mono text-slate-500 font-bold whitespace-nowrap">ID: {product.id.split('-')[0].toUpperCase()}</span>
               <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
          </div>

          {/* Right Column: Scrolling Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20 text-[var(--primary-accent)] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                {product.brand || "DevInfotech Component"}
              </span>
              {product.tags.map((tag: { id: string; name: string }) => (
                <span
                  key={tag.id}
                  className="bg-white/60 border border-white text-slate-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Title & Price */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 font-mono tracking-tighter">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                 <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></span>
                 <span className="text-xs font-black text-green-700 uppercase tracking-widest">In Stock</span>
              </div>
            </div>

            {/* Premium Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button className="group relative w-full sm:w-auto overflow-hidden bg-slate-900 text-white font-black text-lg py-5 px-10 rounded-2xl shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 border border-slate-800">
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 z-0 opacity-50"></div>
              </button>
              <button className="w-full sm:w-auto bg-white/40 border border-white/60 shadow-sm text-slate-700 font-bold text-lg py-5 px-10 rounded-2xl hover:bg-white/80 hover:border-white transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                <svg className="w-5 h-5 text-[var(--primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Sales
              </button>
            </div>

            {/* Technical Specifications Container */}
            <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--primary-accent)]/5 blur-[50px] rounded-full group-hover:bg-[var(--primary-accent)]/15 transition-colors duration-700 pointer-events-none"></div>
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-200/50 pb-4 relative z-10">
                  <svg className="w-6 h-6 text-[var(--primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Architecture Overview
               </h3>
               <div
                  className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium prose-headings:text-slate-900 prose-headings:font-black prose-a:text-[var(--primary-accent)] prose-strong:text-slate-900 relative z-10"
                  dangerouslySetInnerHTML={{ __html: product.description || "No precise technical specifications found in the database layer." }}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
