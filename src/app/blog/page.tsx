import Link from "next/link";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { FloatingBackground } from "@/components/FloatingBackground";

export default function BlogComingSoonPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden flex flex-col justify-center items-center">
      <FloatingBackground />
      <AnimatedReveal className="relative z-10 text-center px-4 mt-20">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
          Under Construction
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Coming Soon</h1>
        <p className="text-xl text-slate-600 max-w-lg mx-auto mb-8">
          We are currently crafting amazing content for our Blog. Stay tuned!
        </p>
        <Link href="/" className="inline-block px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
          Return Home
        </Link>
      </AnimatedReveal>
    </div>
  );
}
