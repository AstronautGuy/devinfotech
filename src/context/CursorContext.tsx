"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CursorContextType {
  useCustomCursor: boolean;
  toggleCursor: () => void;
  mounted: boolean;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("useCustomCursor");
    if (stored !== null) {
      setUseCustomCursor(stored === "true");
    }
  }, []);

  const toggleCursor = () => {
    setUseCustomCursor((prev) => {
      const next = !prev;
      localStorage.setItem("useCustomCursor", String(next));
      return next;
    });
  };

  return (
    <CursorContext.Provider value={{ useCustomCursor, toggleCursor, mounted }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
