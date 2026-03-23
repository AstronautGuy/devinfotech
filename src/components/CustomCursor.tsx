"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export function CustomCursor() {
  const { useCustomCursor } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Core coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to lag the cursor slightly (Fluid organic motion)
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25 });
  
  const innerX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const innerY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly to center the circle visually
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers expansion if interactive element
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.tagName === "SELECT" || 
        target.closest("a") || 
        target.closest("button") || 
        target.onclick != null ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !useCustomCursor) return null;

  return (
    <>
      <style>{`
        /* Erase the generic desktop pointers on large devices */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Outer Magnetic Ring - Becomes solid block highlighting on hover */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 1 : 0.8,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderWidth: isHovered ? "0px" : "2px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      />
      
      {/* Inner Dot Follower - Subsumed into the main ring on hover */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          marginLeft: "12px",
          marginTop: "12px",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100000] mix-blend-difference hidden md:block"
      />
    </>
  );
}
