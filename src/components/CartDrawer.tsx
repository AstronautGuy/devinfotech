"use client";

import React from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 pointer-events-auto transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div 
        className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-white/80 backdrop-blur-3xl border-l border-white/60 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 pointer-events-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[var(--primary-accent)]" />
            Your Command Center
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-70">
              <ShoppingBag className="w-16 h-16 mb-4 stroke-1" />
              <p className="text-lg font-medium">Your arsenal is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-white/60 p-4 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group">
                {item.image ? (
                  <div className="w-20 h-20 bg-slate-100 rounded-xl relative overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight mb-1">{item.name}</h4>
                  <p className="text-lg font-black text-slate-900 font-mono tracking-tight mb-3">₹{item.price.toLocaleString("en-IN")}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 rounded-full border border-slate-200">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-3 hover:text-[var(--primary-accent)] transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-3 hover:text-[var(--primary-accent)] transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-500 transition-colors bg-red-50 hover:bg-red-100 p-1.5 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-200/50 bg-white/50 backdrop-blur-md">
            <div className="flex justify-between items-end mb-6">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter font-mono">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            
            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
              <button className="w-full bg-slate-900 text-white font-black text-lg py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] border border-slate-800 flex justify-center">
                Initialize Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
