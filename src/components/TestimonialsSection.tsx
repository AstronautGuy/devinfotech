"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Subscribed to their Tally on Cloud model 6 months ago. Absolute breeze accessing inventory data from home. Highly reliable and encrypted correctly.",
    author: "Rakesh Patel",
    role: "Proprietor, Shreenath Traders",
    rating: 5
  },
  {
    quote: "Dell workstations they supplied for our CAD team were cheaper than direct quotes. Delivery was incredibly prompt and setups were ready in hours.",
    author: "Amit Desai",
    role: "CEO, Desai Engitech",
    rating: 5
  },
  {
    quote: "Managed to restore our corrupted NAS drive node data safely. Highly recommended for data rescue and annual maintenance contracts.",
    author: "Sanjay Mehta",
    role: "Director, Mehta & Sons Logistics",
    rating: 4
  }
];

export function TestimonialsSection() {
  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
            Trusted by Local Businesses
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Here is why companies rely on DevInfotech for sustainable daily operation pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 p-8 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < item.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="text-slate-700 font-medium italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="border-t border-slate-200/40 pt-4 mt-4">
                <p className="font-bold text-slate-900">{item.author}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
