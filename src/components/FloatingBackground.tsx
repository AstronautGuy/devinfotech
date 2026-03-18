"use client";

import { motion } from "framer-motion";
import React from "react";

export function FloatingBackground() {
  return (
    <>
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[5%] opacity-20 pointer-events-none hidden lg:block text-[var(--primary-accent)] z-0"
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[5%] opacity-10 pointer-events-none hidden lg:block text-slate-500 z-0"
      >
        <svg width="250" height="250" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="10" stroke="currentColor" strokeWidth="2" transform="rotate(20 50 50)" />
          <rect x="30" y="30" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" transform="rotate(-15 50 50)" />
        </svg>
      </motion.div>
    </>
  );
}
