// app/admin/products/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prisma';
import { z } from 'zod';

// ... (keep your existing deleteProduct action)

const productSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
    slug: z.string().min(3, { message: 'Slug must be at least 3 characters long.' }),
    price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});


export async function updateProduct(prevState: any, formData: FormData) {
    const productId = formData.get('productId') as string;
    if (!productId) {
        return { message: 'Product ID is missing.', errors: {} };
    }

    const validatedFields = productSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        price: formData.get('price'),
        description: formData.get('description'),
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Failed to update product.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, slug, price, description, metaTitle, metaDescription } = validatedFields.data;
    const imageUrls = formData.getAll('images').map(String).filter(url => url.trim() !== "");

    try {
        await prismadb.$transaction(async (prisma) => {
            // 1. Update the core product details
            await prisma.product.update({
                where: { id: productId },
                data: { name, slug, price, description, metaTitle, metaDescription },
            });

            // 2. Delete all existing images for this product
            await prisma.productImage.deleteMany({
                where: { productId: productId },
            });

            // 3. Create the new set of images
            if (imageUrls.length > 0) {
                await prisma.productImage.createMany({
                    data: imageUrls.map(url => ({
                        url: url,
                        productId: productId,
                    })),
                });
            }
        });
    } catch (error) {
        console.error(error);
        return { message: 'Database error: Failed to update product.', errors: {} };
    }

    // Revalidate paths to show updated data
    revalidatePath('/admin/products');
    revalidatePath(`/products/${slug}`);

    // Redirect back to the main product list
    redirect('/admin/products');
}

// You might also want to move your createProduct action into this file to keep them together.