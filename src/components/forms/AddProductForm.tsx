// app/admin/AddProductForm.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProduct } from '@/actions/AddProductAction';
import { useState } from 'react';

// Define the type for errors
type ProductErrors = {
    name?: string[];
    slug?: string[];
    price?: string[];
    images?: string[];
    metaTitle?: string[];
    metaDescription?: string[];
};

// Define the shape of the state returned by the action
type FormState = {
    message: string;
    errors: ProductErrors;
};

// A separate component for the submit button to use the useFormStatus hook
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {pending ? 'Creating Product...' : 'Create Product'}
        </button>
    );
}

export function AddProductForm() {
    const initialState: FormState = { message: "", errors: {} };
    const [state, dispatch] = useActionState<FormState, FormData>(createProduct, initialState);
    const [imageUrls, setImageUrls] = useState<string[]>(['']);

    const handleAddImage = () => setImageUrls([...imageUrls, '']);
    const handleImageChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };
    const handleRemoveImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    return (
        <form action={dispatch} className="space-y-6 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
            </div>

            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Product Slug (URL)</label>
                <input type="text" id="slug" name="slug" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                {state.errors?.slug && <p className="text-sm text-red-500 mt-1">{state.errors.slug[0]}</p>}
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" step="0.01" id="price" name="price" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                {state.errors?.price && <p className="text-sm text-red-500 mt-1">{state.errors.price[0]}</p>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Product Images</h3>
                {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="url"
                            name="images"
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="https://..."
                            className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddImage} className="text-sm text-blue-600 hover:text-blue-800">+ Add Another Image</button>
            </div>

            <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">SEO Fields</h3>
                <div>
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <input type="text" id="metaTitle" name="metaTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                </div>
                <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <input type="text" id="metaDescription" name="metaDescription" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                </div>
            </div>

            {state.message && <p className="text-sm text-red-500">{state.message}</p>}

            <SubmitButton />
        </form>
    );
}