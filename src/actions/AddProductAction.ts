// app/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prisma';
import { z } from 'zod';

// Define a schema for validation using Zod
const productSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
    slug: z.string().min(3, { message: 'Slug must be at least 3 characters long.' }),
    price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    // For images, we'll handle an array of strings
});

export async function createProduct(prevState: any, formData: FormData) {
    const validatedFields = productSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        price: formData.get('price'),
        description: formData.get('description'),
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
        return {
            message: 'Failed to create product.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, slug, price, description, metaTitle, metaDescription } = validatedFields.data;

    // Get all image URLs from the form
    const imageUrls = formData.getAll('images').map(String).filter(url => url.trim() !== "");

    try {
        // Use a transaction to ensure both product and images are created, or neither are.
        await prismadb.$transaction(async (prisma) => {
            const product = await prisma.product.create({
                data: {
                    name,
                    slug,
                    price,
                    description,
                    metaTitle,
                    metaDescription,
                },
            });

            if (imageUrls.length > 0) {
                await prisma.productImage.createMany({
                    data: imageUrls.map((url) => ({
                        url: url,
                        productId: product.id,
                    })),
                });
            }
        });
    } catch (error) {
        console.error(error);
        // Check for unique constraint violation on the slug
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return { message: 'This slug is already in use. Please choose another.', errors: { slug: ['Slug already exists.'] } };
        }
        return { message: 'Database error: Failed to create product.', errors: {} };
    }

    // Revalidate the products page to show the new product
    revalidatePath('/products');
    // Redirect to the new product's page after creation
    redirect(`/products/${slug}`);
}