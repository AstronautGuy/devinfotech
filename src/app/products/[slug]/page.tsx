import prismadb from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import ImageGallery from "./ImageGallery"; // Assuming this component exists

interface ProductPageProps {
    params: {
        slug: string;
    };
}

// Function to fetch a single product with its images and tags
async function getProduct(slug: string) {
    const product = await prismadb.product.findUnique({
        where: {
            slug: slug,
        },
        include: {
            images: true,
            tags: true, // Fetches the related tags
        },
    });

    if (!product) {
        notFound(); // Triggers a 404 page if product not found
    }
    return product;
}

// ✅ Generates dynamic SEO metadata
export async function generateMetadata(
    { params: { slug } }: ProductPageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const product = await getProduct(slug);

    return {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
        // Adds the product's tags to the <meta name="keywords"> tag for SEO
        keywords: product.tags.map((tag) => tag.name),
        openGraph: {
            title: product.metaTitle || product.name,
            description: product.metaDescription || product.description || "",
            images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
        },
    };
}

// ✅ Generates the page content
export default async function ProductPage({ params: { slug } }: ProductPageProps) {
    const product = await getProduct(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 md:mt-30">
                <ImageGallery productName={product.name} images={product.images} />
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-semibold text-gray-700 mb-6">
                        ₹{product.price.toFixed(2)}
                    </p>

                    {/* Correctly renders the rich text (HTML) description */}
                    <div
                        className="prose dark:prose-invert max-w-none text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.description || "" }}
                    />

                    {/* Displays the product tags visually on the page */}
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