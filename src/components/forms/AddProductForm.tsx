// app/admin/AddProductForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createProduct } from "@/actions/AddProductAction";
import { useState } from "react";
import { FormState } from "@/lib/definations";
// highlight-start
import { RichTextEditor } from "@/components/RichTextEditor"; // ✅ 1. Import the rich text editor
import { ImageUploader } from "@/components/forms/ImageUploader"; // ✅ 2. Import uploader
// highlight-end

// A separate component for the submit button to use the useFormStatus hook
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? "Creating Product..." : "Create Product"}
    </button>
  );
}

export function AddProductForm() {
  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState<FormState, FormData>(
    createProduct,
    initialState,
  );
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  // highlight-start
  // ✅ 2. Add state to hold the rich text content
  const [description, setDescription] = useState<string>("");
  // highlight-end

  // highlight-start

  return (
    <form
      action={dispatch}
      className="space-y-6 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md"
    >
      {/* Product Name, Slug, and Price inputs remain the same */}
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {state.errors?.slug && (
          <p className="text-sm text-red-500 mt-1">{state.errors.slug[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Product Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {state.errors?.brand && (
          <p className="text-sm text-red-500 mt-1">{state.errors.brand[0]}</p>
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
        {/* highlight-start */}
        {/* ✅ 3. Replace the textarea with the editor and a hidden input */}
        <RichTextEditor onChange={(html) => setDescription(html)} />
        <input type="hidden" name="description" value={description} />
        {/* highlight-end */}
      </div>

      {/* Product Images Drag & Drop Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Product Images</h3>
        <ImageUploader value={imageUrls} onChange={setImageUrls} />
        {/* Hidden inputs to pass array into Server Action in FormData */}
        {imageUrls.map((url, index) => (
            url && <input key={index} type="hidden" name="images" value={url} />
        ))}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {/* highlight-start */}
        {/* ✅ 4. Add the input field for meta tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Categories / Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="e.g. electronics, audio, headphones"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {/* highlight-end */}
      </div>

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <SubmitButton />
    </form>
  );
}
