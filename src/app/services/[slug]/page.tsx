import { servicesData } from "@/lib/servicesData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AnimatedReveal, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/AnimatedReveal";
import { FloatingBackground } from "@/components/FloatingBackground";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | DevInfotech Services`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden pb-20">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${service.bgColor}/10 blur-[150px]`}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-300/20 blur-[150px]"></div>
      </div>
      
      <FloatingBackground />

      <div className="relative z-10 container mx-auto px-[5%] py-24 min-h-screen">
        <Link href="/services" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Text Detail */}
          <AnimatedReveal>
            <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full ${service.bgColor}/10 ${service.color} text-sm font-bold uppercase tracking-wider mb-6 border ${service.bgColor}/20`}>
              Premium IT Service
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {service.longDesc}
            </p>
            <div className="flex gap-4">
              <Link href="/contact" className={`inline-flex items-center justify-center px-8 py-4 rounded-xl ${service.bgColor} text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                Get Started Now
              </Link>
            </div>
          </AnimatedReveal>

          {/* Right Floating Illustration */}
          <AnimatedReveal delay={0.2} className="relative w-full aspect-square max-w-[600px] mx-auto">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor}/20 to-transparent rounded-full blur-3xl animate-pulse`}></div>
            <div className="absolute inset-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <Icon className={`w-48 h-48 ${service.color} drop-shadow-xl`} />
            </div>
            
            {/* Floating UI Elements for aesthetic */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="font-bold text-slate-800 text-sm">Enterprise<br/>Ready</div>
            </div>

            <div className="absolute -bottom-10 -right-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-2 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-2 h-2 rounded-full ${service.bgColor}`} />)}
               </div>
               <div className="font-bold text-slate-400 text-xs tracking-wider uppercase">Optimal Performance</div>
            </div>
          </AnimatedReveal>
        </div>

        {/* Features & Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          <AnimatedStaggerGroup>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Core Features</h3>
            <div className="flex flex-col gap-4">
              {service.features.map((feature, i) => (
                <AnimatedStaggerItem key={i}>
                  <div className="flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl ${service.bgColor}/10 flex items-center justify-center mr-4 shrink-0`}>
                      <Icon className={`w-5 h-5 ${service.color}`} />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{feature}</span>
                  </div>
                </AnimatedStaggerItem>
              ))}
            </div>
          </AnimatedStaggerGroup>

          <AnimatedStaggerGroup>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Key Benefits</h3>
            <div className="flex flex-col gap-4">
              {service.benefits.map((benefit, i) => (
                <AnimatedStaggerItem key={i}>
                  <div className="flex items-center p-5 bg-[var(--primary-accent)]/5 rounded-2xl border border-[var(--primary-accent)]/20 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-accent)]/10 flex items-center justify-center mr-4 shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[var(--primary-accent)]" />
                    </div>
                    <span className="text-lg text-slate-800 font-medium">{benefit}</span>
                  </div>
                </AnimatedStaggerItem>
              ))}
            </div>
          </AnimatedStaggerGroup>

        </div>
      </div>
    </div>
  );
}
