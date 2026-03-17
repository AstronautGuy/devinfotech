"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = [
  "Dell", "HP", "Lenovo", "Asus", "Acer", "Samsung", "Intel", "AMD", 
  "NVIDIA", "Hikvision", "Dahua", "TP-Link", "Cisco", "Logitech"
];

export function BrandsMarquee() {
  // Multiply list to ensure continuous infinite scrolling across screen width
  const items = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="py-12 bg-white/40 backdrop-blur-md border-y border-slate-200/60 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-16 items-center w-max px-8"
        animate={{ x: [0, "-33.33%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {items.map((brand, index) => (
          <div
            key={index}
            className="text-2xl md:text-3xl font-black tracking-tight text-slate-400/80 hover:text-slate-800 transition-colors uppercase cursor-pointer"
          >
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
