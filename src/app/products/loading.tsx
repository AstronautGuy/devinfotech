export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute inset-0 z-[-1] opacity-30">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-500 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-10">
        <div className="h-10 w-64 bg-slate-200/30 backdrop-blur-md rounded-xl animate-pulse border border-white/20"></div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="h-12 w-full sm:w-80 bg-slate-200/30 backdrop-blur-md rounded-xl animate-pulse border border-white/20"></div>
          <div className="h-12 w-full sm:w-48 bg-slate-200/30 backdrop-blur-md rounded-xl animate-pulse border border-white/20"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="h-8 w-32 bg-slate-200/30 backdrop-blur-md rounded-lg animate-pulse mb-4 border border-white/20"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-24 bg-slate-200/40 backdrop-blur-md rounded-lg animate-pulse border border-white/20" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden min-h-[400px] shadow-2xl transition-all h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="aspect-square w-full p-6 bg-slate-100/10 flex items-center justify-center animate-pulse">
                  <div className="w-40 h-40 rounded-full bg-slate-300/20 mix-blend-overlay border border-white/5 shadow-inner"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-1 pb-8 animate-pulse">
                  <div className="w-16 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4"></div>
                  <div className="w-3/4 h-8 rounded-lg bg-slate-200/20 mb-2"></div>
                  <div className="w-1/2 h-8 rounded-lg bg-slate-200/30 mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
