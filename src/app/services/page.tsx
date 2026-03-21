import { ServiceProcess } from "@/components/ServiceProcess";
import { getKeywords } from "@/lib/seo";
import { Metadata } from "next";
import { AnimatedReveal, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/AnimatedReveal";
import { FloatingBackground } from "@/components/FloatingBackground";
import { Monitor, Wrench, LifeBuoy, Network, Printer, ShieldCheck, HardDrive, Cpu, Search, Globe, Smartphone } from "lucide-react";

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
      
      <FloatingBackground />

      <div className="relative z-10 container mx-auto px-[5%] py-28 min-h-screen">
        <AnimatedReveal className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-6">
            Our Premium Services
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Reliable, secure, and fully managed cloud solutions tailored to empower your business operations anywhere in the world.
          </p>
        </AnimatedReveal>

        <AnimatedStaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* TALLY ON CLOUD SECTION */}
          <AnimatedStaggerItem className="h-full">
            <div className="h-full bg-white/80 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/50 group duration-500 hover:-translate-y-2">
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
          </AnimatedStaggerItem>

          {/* VPS SECTION */}
          <AnimatedStaggerItem className="h-full">
            <div className="h-full bg-white/80 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/50 group duration-500 hover:-translate-y-2">
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
          </AnimatedStaggerItem>
        </AnimatedStaggerGroup>

        {/* OTHER CORE SERVICES */}
        <AnimatedReveal delay={0.2} className="text-center mt-32 mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Comprehensive IT Solutions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From hardware procurement to digital presence, we’ve got your technology needs fully covered.
          </p>
        </AnimatedReveal>

        <AnimatedStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              title: "Computer Sales",
              desc: "Premium laptops and desktops tailored for your exact needs.",
              icon: <Monitor className="w-8 h-8 text-blue-500" />
            },
            {
              title: "Computer Repair",
              desc: "Fast, reliable diagnostics and servicing for all PC/Laptop models.",
              icon: <Wrench className="w-8 h-8 text-purple-500" />
            },
            {
              title: "IT Support & Maintenance",
              desc: "Proactive AMC contracts to keep your business running smoothly.",
              icon: <LifeBuoy className="w-8 h-8 text-emerald-500" />
            },
            {
              title: "Networking Solutions",
              desc: "Robust LAN/WAN setups and wireless network optimization.",
              icon: <Network className="w-8 h-8 text-cyan-500" />
            },
            {
              title: "Printers & Peripherals",
              desc: "High-quality printers, scanners, and essential hardware accessories.",
              icon: <Printer className="w-8 h-8 text-orange-500" />
            },
            {
              title: "Security Solutions",
              desc: "Comprehensive CCTV and biometric access control installations.",
              icon: <ShieldCheck className="w-8 h-8 text-red-500" />
            },
            {
              title: "Data Recovery",
              desc: "Professional data retrieval from corrupted or damaged drives.",
              icon: <HardDrive className="w-8 h-8 text-indigo-500" />
            },
            {
              title: "Custom PC Builds",
              desc: "High-performance workstations and gaming rigs built to order.",
              icon: <Cpu className="w-8 h-8 text-pink-500" />
            },
            {
              title: "SEO Optimization",
              desc: "Data-driven strategies to rank rank higher and increase organic traffic.",
              icon: <Search className="w-8 h-8 text-teal-500" />
            },
            {
              title: "Web Development",
              desc: "Stunning, scalable, fast websites and powerful web applications.",
              icon: <Globe className="w-8 h-8 text-yellow-500" />
            },
            {
              title: "iOS/Android Apps",
              desc: "Native and cross-platform mobile apps for iOS and Android.",
              icon: <Smartphone className="w-8 h-8 text-rose-500" />
            }
          ].map((service, i) => (
            <AnimatedStaggerItem key={i}>
              <div className="bg-white/70 backdrop-blur-lg border border-slate-200/50 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-start group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>

        {/* Service Execution Process/Roadmap */}
        <AnimatedReveal delay={0.4} className="mt-20">
          <ServiceProcess />
        </AnimatedReveal>

      </div>
    </div>
  );
}
