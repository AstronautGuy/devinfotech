// app/products/[slug]/image-gallery.tsx
"use client";

import { useState } from "react";
// Import the ProductImage type from local database types
import type { Database } from "@/lib/database.types";
type ProductImage = Database["public"]["Tables"]["ProductImage"]["Row"];
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
      <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl bg-white/50 border border-white/60 shadow-inner group p-6">
        <Image
          src={activeImage}
          alt={`${productName} - Main image`}
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform duration-700 p-6 drop-shadow-md group-hover:scale-[1.03]"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id || index}
            onClick={() => setActiveImage(image.url)}
            className={`
              relative aspect-square w-full overflow-hidden rounded-xl bg-white/50 border border-white/60 shadow-sm
              focus:outline-none focus:ring-4 focus:ring-[var(--primary-accent)]/20 transition-all duration-300
              ${
                activeImage === image.url
                  ? "ring-2 ring-[var(--primary-accent)] border-[var(--primary-accent)]/50 bg-white/80"
                  : "hover:bg-white/70 hover:border-white hover:shadow-md"
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
