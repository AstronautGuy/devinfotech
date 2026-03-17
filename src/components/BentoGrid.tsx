"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Shield, Wrench, HardDrive, ArrowRight } from "lucide-react";
import Link from "next/link";

const ITEMS = [
  {
    title: "Cloud VPS & Tally",
    description: "Reliable cloud environment tailored for ERP & workflow management with 99.9% uptime uptime.",
    icon: Cloud,
    color: "from-blue-500 to-cyan-400",
    size: "md:col-span-2",
    link: "/services"
  },
  {
    title: "IT Hardware Sales",
    description: "Enterprise laptops, workstations, and peripherals from top brands.",
    icon: HardDrive,
    color: "from-orange-500 to-yellow-400",
    size: "md:col-span-1",
    link: "/products"
  },
  {
    title: "CCTV Surveillance",
    description: "Secure node recording infrastructure design for offices and homes.",
    icon: Shield,
    color: "from-green-500 to-emerald-400",
    size: "md:col-span-1",
    link: "/services"
  },
  {
    title: "Repair & Annual Maintenance",
    description: "Ensure your systems never experience bottlenecks with 24/7 dedicated local support tickets & hardware checkups.",
    icon: Wrench,
    color: "from-purple-500 to-indigo-400",
    size: "md:col-span-2",
    link: "/contact"
  }
];

export function BentoGrid() {
  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
            Total IT Ecosystem
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From managed cloud pipelines to certified surveillance arrays, we furnish all your tech gaps under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group border-beam-card relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-500 flex flex-col justify-between ${item.size}`}
              >
                <div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} w-fit text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[var(--primary-accent)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <Link href={item.link} className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-[var(--primary-accent)] transition-colors mt-auto">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Subtle decor mesh overlay inside hover */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
