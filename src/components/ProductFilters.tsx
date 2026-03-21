"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const currentSort = searchParams.get("sort") || "default";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    startTransition(() => {
      router.push(`/products?${createQueryString("q", val)}`, { scroll: false });
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      router.push(`/products?${createQueryString("sort", e.target.value)}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative w-full mb-4">
      <div className="relative w-full sm:w-2/3 md:w-1/2 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className={`h-5 w-5 transition-colors ${isPending ? 'text-[var(--primary-accent)] animate-spin' : 'text-slate-400 group-focus-within:text-[var(--primary-accent)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isPending ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            )}
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search arsenal..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full pl-12 pr-4 py-3.5 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--primary-accent)]/50 focus:ring-4 focus:ring-[var(--primary-accent)]/10 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-bold text-base"
        />
      </div>
      
      <div className="w-full sm:w-auto relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary-accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </div>
        <select 
          value={currentSort}
          onChange={handleSortChange}
          className={`block w-full pl-12 pr-12 py-3.5 text-base bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl text-slate-800 font-bold focus:outline-none focus:border-[var(--primary-accent)]/50 focus:ring-4 focus:ring-[var(--primary-accent)]/10 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer appearance-none ${isPending ? 'border-[var(--primary-accent)]/50' : ''}`}
        >
          <option value="default" className="text-slate-900 bg-white">Default Sorting</option>
          <option value="price_asc" className="text-slate-900 bg-white">Price: Low to High</option>
          <option value="price_desc" className="text-slate-900 bg-white">Price: High to Low</option>
          <option value="newest" className="text-slate-900 bg-white">Newest Technology</option>
        </select>
        <div className="absolute inset-y-0 right-0 max-w-[48px] px-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[var(--primary-accent)] transition-colors">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>
    </div>
  );
}
