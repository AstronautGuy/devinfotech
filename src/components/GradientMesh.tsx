"use client";

import React from "react";
import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-slate-50">
      {/* Absolute floating gradient spheres */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 1, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-2/3 left-1/2 w-[450px] h-[450px] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1, 1.2, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-400/15 blur-[100px] pointer-events-none"
      />
    </div>
  );
}
