"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderId = searchParams.get("order_id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Clear shopping cart context permanently
    clearCart();
  }, [clearCart]);

  if (!mounted) return null;

  if (!orderId) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-12 overflow-hidden relative selection:bg-green-500/20">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-multiply overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[100%] rounded-full bg-green-500/10 blur-[150px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[80%] rounded-full bg-blue-500/10 blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-10 md:p-14 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100 shadow-inner"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Payment Verified</h1>
            <p className="text-lg text-slate-500 font-medium mb-8 max-w-md mx-auto">
              Your architectural assets have been secured. An acquisition summary has been dispatched to your communications matrix.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 flex flex-col items-center justify-center shadow-inner">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                Transaction ID Reference
              </span>
              <span className="font-mono text-xl md:text-2xl font-black text-slate-900 tracking-tighter break-all">
                {orderId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="group w-full sm:w-auto overflow-hidden bg-slate-900 text-white font-bold py-4 px-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl border border-slate-800">
                Continue Exploring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={() => window.print()} className="w-full sm:w-auto bg-white border border-slate-200 shadow-sm text-slate-700 font-bold py-4 px-8 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5 text-slate-400" />
                Save Receipt
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50/50 p-6 border-t border-slate-100">
             <p className="text-center text-xs text-slate-400 font-medium">
               For inquiries regarding acquisition <span className="font-mono font-bold">{orderId.split('-')[0].toUpperCase()}</span>, please 
               contact our support terminal at <a href="mailto:info@devinfotech.net" className="text-slate-900 hover:text-[var(--primary-accent)] underline underline-offset-4 decoration-slate-300 transition-colors">info@devinfotech.net</a>.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[var(--primary-accent)] border-t-transparent animate-spin"></div></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
