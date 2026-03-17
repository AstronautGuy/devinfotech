"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Eye, Heart, Key } from "lucide-react";

const VALUES = [
  {
    title: "Uncompromising Integrity",
    description: "Honest diagnostics and transparent pricing. No hidden fees or bloated hardware recommendations.",
    icon: Award,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Client-Centric Focus",
    description: "We fit technology around your workflows, not the other way around. 24/7 critical ticket diagnostics.",
    icon: Heart,
    color: "from-red-500 to-pink-400"
  },
  {
    title: "Continuous Innovation",
    description: "Migrating standard local servers onto encrypted cloud architecture smoothly for modern access formats.",
    icon: Eye,
    color: "from-purple-500 to-indigo-400"
  },
  {
    title: "Secure infrastructure",
    description: "Locking down data streams, surveillance matrices, and network routing limits securely against leaks.",
    icon: Key,
    color: "from-green-500 to-emerald-400"
  }
];

export function CoreValues() {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Principles that have guided our operational success and client trust since 1999.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
