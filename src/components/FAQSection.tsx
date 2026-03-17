"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What does Tally on Cloud mean for my business?",
    answer: "It allows you to access your Tally ERP data from anywhere, on any device, securely. It eliminates the need for expensive local servers and ensures automatic data backups with 24/7 uptime."
  },
  {
    question: "Do you offer on-site support for hardware repairs?",
    answer: "Yes! We provide on-site repair and diagnostics across Vadodara for enterprise clients under our Annual Maintenance Contracts (AMC), ensuring minimum operational downtime."
  },
  {
    question: "What brands of hardware do you supply?",
    answer: "We are authorized dealers and partners for industry giants like Dell, HP, Lenovo, Asus, and Asus. We offer laptops, workstations, high-end servers, and accessories at competitive rates."
  },
  {
    question: "How secure are your CCTV installations?",
    answer: "We use top-tier node-encrypted recording hardware from Hikvision and Dahua. We configure secure remote-viewing pipelines so you can monitor your premises from your phone safely without exposing files to public internet routing leaks."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-[5%] max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Quick answers to help you navigate our IT setup and repair workflows.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left font-bold text-slate-900 text-lg hover:bg-slate-100/80 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
