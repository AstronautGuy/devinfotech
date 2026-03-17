"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Settings, ShieldCheck, HeartHandshake } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Audit & Consultation",
    description: "We analyze your current infrastructure, identify bottleneck gaps, and frame an absolute hardware/cloud requirement roadmap.",
    icon: Search,
    color: "from-blue-500 to-cyan-400"
  },
  {
    number: "02",
    title: "Secure Deployment",
    description: "Our certified engineers deploy routers, servers, or cloud VPS matrices with zero operational downtime for your daily workflow.",
    icon: Settings,
    color: "from-purple-500 to-pink-400"
  },
  {
    number: "03",
    title: "Vulnerability Locking",
    description: "We secure node routings, implement backup encryption pipelines, and lock down your surveillance networks against external leaks.",
    icon: ShieldCheck,
    color: "from-green-500 to-emerald-400"
  },
  {
    number: "04",
    title: "24/7 AMC Support",
    description: "Under Annual Maintenance Contracts, we resolve support critical tickets within pre-agreed local hourly turnarounds.",
    icon: HeartHandshake,
    color: "from-orange-500 to-yellow-400"
  }
];

export function ServiceProcess() {
  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-[5%]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
            Our Service Execution Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            From initial diagnostics to continuous monthly maintenance agreements, we manage the lifecycle end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28%] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-300 -z-10" />

          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <Icon className="w-6 h-6" />
                  <span className="absolute -bottom-3 -right-3 bg-white border border-slate-200 text-slate-900 text-xs px-2 py-1 rounded-full shadow-md font-bold">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
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
