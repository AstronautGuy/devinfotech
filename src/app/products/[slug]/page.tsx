// app/products/[slug]/page.tsx

import prismadb from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import ImageGallery from './ImageGallery'; // Assuming this component exists

interface ProductPageProps {
    params: {
        slug: string;
    };
}

// Function to fetch a single product
async function getProduct(slug: string) {
    const product = await prismadb.product.findUnique({
        where: {
            slug: slug,
        },
        include: {
            images: true,
        },
    });

    if (!product) {
        notFound(); // Triggers a 404 page if product not found
    }
    return product;
}

// ✅ THIS IS THE CORE OF DYNAMIC SEO
export async function generateMetadata(
    // highlight-start
    { params: { slug } }: ProductPageProps,
    // highlight-end
    parent: ResolvingMetadata
): Promise<Metadata> {
    // fetch data
    const product = await getProduct(slug); // Use slug directly

    return {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
        openGraph: {
            title: product.metaTitle || product.name,
            description: product.metaDescription || product.description || "",
            images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
        },
    };
}

// ✅ THIS GENERATES THE PAGE CONTENT
export default async function ProductPage(
    // highlight-start
    { params: { slug } }: ProductPageProps
    // highlight-end
) {
    const product = await getProduct(slug); // Use slug directly

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-30">
                <ImageGallery
                    productName={product.name}
                    images={product.images} />
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-2xl font-semibold text-gray-700 mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <button className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}