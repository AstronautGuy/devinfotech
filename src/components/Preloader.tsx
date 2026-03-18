"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    // Cleanup to ensure body scroll is restored
    return () => {
        document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    // Simulate initial loading sequence for visual wow-factor
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading presentation
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col items-center justify-center text-center space-y-4 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                {/* Rotating Abstract Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-sky-500 rounded-full opacity-70"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-l-2 border-cyan-300 rounded-full opacity-90"
                />
                {/* Center Core */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
                />
              </div>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black tracking-tighter"
              >
                DEV<span className="text-sky-400">INFOTECH</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="text-slate-400 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mt-2"
              >
                Initializing Experience
              </motion.p>
            </div>

            {/* Futuristic Loading Bar */}
            <div className="w-48 md:w-64 h-1 mt-8 bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-300 to-sky-500 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
