// app/products/[slug]/image-gallery.tsx
"use client";

import { useState } from "react";
// Import the ProductImage type from your Prisma client
// Make sure this path is correct for your project
import { ProductImage } from "@prisma/client";
import Image from "next/image";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string; // Add productName for better alt text
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  // Set the initial active image to the first one, or a placeholder if no images exist
  const [activeImage, setActiveImage] = useState(
    images[0]?.url || "/placeholder-image.jpg",
  );
  // You might want to create a placeholder-image.jpg in your public folder

  // If no images are provided, display a placeholder
  if (images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <span className="text-gray-500 text-lg">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Display Image */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
        <Image
          src={activeImage}
          alt={`${productName} - Main image`}
          fill
          style={{ objectFit: "contain" }} // or 'cover' depending on your preference
          className="transition-opacity duration-300"
          priority // Prioritize loading of the main image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image.url)}
            className={`
              relative aspect-square w-full overflow-hidden rounded-md 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                activeImage === image.url
                  ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white"
                  : "ring-1 ring-gray-200 hover:ring-blue-300"
              }
            `}
            aria-label={`View image of ${productName}`}
          >
            <Image
              src={image.url}
              alt={`${productName} thumbnail`}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 5vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
