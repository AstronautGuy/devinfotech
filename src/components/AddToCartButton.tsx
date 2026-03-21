"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

interface ProductInput {
  id: string;
  name: string;
  price: number;
  images?: { url: string }[];
  slug: string;
}

export function AddToCartButton({ product }: { product: ProductInput }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.url,
      slug: product.slug
    });
  };

  return (
    <button 
      onClick={handleAddToCart} 
      className="group relative w-full sm:w-auto overflow-hidden bg-slate-900 text-white font-black text-lg py-5 px-10 rounded-2xl shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 border border-slate-800"
    >
      <span className="relative z-10 flex items-center gap-3">
        <svg className="w-5 h-5 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Add to Cart
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 z-0 opacity-50"></div>
    </button>
  );
}
