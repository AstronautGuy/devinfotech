import { ServiceProcess } from "@/components/ServiceProcess";
import { getKeywords } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Services - DevInfotech | Cloud Hosting, CCTV & IT Repairs",
    description: "Explore our comprehensive IT services in Vadodara: Tally on Cloud offerings, VPS hosting infrastructure setups, CCTV diagnostics, and Annual Maintenance Contracts (AMC).",
    keywords: getKeywords(["services portfolio", "it maintenance", "cloud hosting services", "vps servers", "networking audits", "cctv installation"]),
  };
}

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Background radial gradients for glass effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary-accent)]/10 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-[5%] py-28 min-h-screen">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-6">
            Our Premium Services
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Reliable, secure, and fully managed cloud solutions tailored to empower your business operations anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* TALLY ON CLOUD SECTION */}
          <div className="bg-white/80 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-xl transition hover:border-[var(--primary-accent)]/50 group duration-500">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-8 border border-black/5 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Tally on Cloud</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Experience the freedom of accounting without limits. Our Tally on Cloud service ensures your financial data is always at your fingertips, securely and reliably.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Access Tally from anywhere, anytime</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">No local dependency or installation required</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Secure cloud-hosted environment for safety</span>
              </li>
               <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Multi-user capability for seamless teamwork</span>
              </li>
               <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Reliable performance with minimum downtime</span>
              </li>
            </ul>
          </div>

          {/* VPS SECTION */}
          <div className="bg-white/80 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-xl transition hover:border-purple-500/50 group duration-500">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-8 border border-black/5 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-slate-900">VPS (Managed Windows Severs)</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your personal remote computer in the cloud. Fully managed infrastructure emphasizing ultimate data safety and security practices.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-slate-700">Protected by <strong>Cloudflare</strong> for maximum security</span>
              </li>
              <li className="flex items-start">
                 <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Works seamlessly like a personal remote computer</span>
              </li>
              <li className="flex items-start">
                 <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Fully managed environment so you can focus on business</span>
              </li>
               <li className="flex items-start">
                 <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Data stored securely on robust cloud infrastructure</span>
              </li>
               <li className="flex items-start">
                 <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-700">Regular backups ensure your data is always safe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Execution Process/Roadmap */}
        <ServiceProcess />

      </div>
    </div>
  );
}
