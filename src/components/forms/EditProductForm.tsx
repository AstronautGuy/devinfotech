"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { updateProduct } from "@/actions/EditProductAction";
import type { Product, ProductImage, Tag } from "@prisma/client";
import { FormState } from "@/lib/definations";
import { RichTextEditor } from "@/components/RichTextEditor";

// A type for the product prop that includes all its relations
type ProductWithRelations = Product & {
    images: ProductImage[];
    tags: Tag[];
};

// Props for the form component
interface EditProductFormProps {
    product: ProductWithRelations;
}

// A separate component for the submit button to use the useFormStatus hook
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {pending ? "Saving Changes..." : "Save Changes"}
        </button>
    );
}

export function EditProductForm({ product }: EditProductFormProps) {
    const initialState: FormState = { message: "", errors: {} };
    const [state, dispatch] = useActionState<FormState, FormData>(
        updateProduct,
        initialState,
    );

    // State for dynamically managing image URL inputs
    const [imageUrls, setImageUrls] = useState<string[]>(
        product.images.map((img) => img.url),
    );

    // State to hold the rich text editor's HTML content
    const [description, setDescription] = useState<string>(
        product.description || "",
    );

    // Handler functions for the image URL list
    const handleAddImage = () => setImageUrls([...imageUrls, ""]);
    const handleImageChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };
    const handleRemoveImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    return (
        <form
            action={dispatch}
            className="space-y-6 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md"
        >
            {/* Hidden input to pass the product ID to the server action */}
            <input type="hidden" name="productId" value={product.id} />

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Product Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={product.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state.errors?.name && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700"
                >
                    Product Slug (URL)
                </label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    defaultValue={product.slug}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state.errors?.slug && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.slug[0]}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                >
                    Price
                </label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    required
                    defaultValue={product.price}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state.errors?.price && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.price[0]}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Description
                </label>
                <RichTextEditor
                    initialContent={product.description || ""}
                    onChange={(html) => setDescription(html)}
                />
                <input type="hidden" name="description" value={description} />
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
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddImage}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    + Add Another Image
                </button>
            </div>

            <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">SEO Fields</h3>
                <div>
                    <label
                        htmlFor="metaTitle"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Meta Title
                    </label>
                    <input
                        type="text"
                        id="metaTitle"
                        name="metaTitle"
                        defaultValue={product.metaTitle || ""}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="metaDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Meta Description
                    </label>
                    <input
                        type="text"
                        id="metaDescription"
                        name="metaDescription"
                        defaultValue={product.metaDescription || ""}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Meta Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        defaultValue={product.tags.map((tag) => tag.name).join(", ")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>

            {state.message && (
                <p className="text-sm text-red-500">{state.message}</p>
            )}

            <SubmitButton />
        </form>
    );
}