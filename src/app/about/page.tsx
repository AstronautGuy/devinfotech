import Image from "next/image";
import { Timeline } from "@/components/Timeline"; 
import { CoreValues } from "@/components/CoreValues";
import { getKeywords } from "@/lib/seo";
import { Metadata } from "next";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { FloatingBackground } from "@/components/FloatingBackground";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About DevInfotech - Absolute IT Solutions since 1999",
    description: "Founded in 1999 by Mr. Rajan Ghanshyam, DevInfotech delivers reliable Cloud VPS, CCTV designs, and absolute AMC support structures in Vadodara.",
    keywords: getKeywords(["about devinfotech", "company history", "India IT services", "Vadodara ISP", "Rajan Ghanshyam"]),
  };
}

export default function About() {
  const data = [
    {
      title: "1999",
      content: (
        <div key="1999">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            The Genesis:{" "}
            <span className="font-bold">Om Computer Services (OCS)</span> was
            founded, laying the groundwork for a future in technology. In the
            same year, we began managing the network for{" "}
            <span className="font-bold">Planet Internet</span>, Vadodara&apos;s
            pioneering Internet Service Provider.
          </p>
          {/* Placeholder images - replace src with your actual image paths */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://placehold.co/500x500/000000/FFFFFF?text=OCS+Launch"
              alt="OCS Launch"
              width={500}
              height={500}
              className="rounded-lg object-cover h-full w-full"
            />
            <Image
              src="https://placehold.co/500x500/111111/FFFFFF?text=Planet+Internet"
              alt="Planet Internet"
              width={500}
              height={500}
              className="rounded-lg object-cover h-full w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2005",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Building the Core Team: To meet growing demand for reliable IT
            support, we hired our first full-time technicians, transitioning
            from a solo venture into a collaborative team dedicated to client
            success.
          </p>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div key="2012">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Service Diversification: Our services evolved beyond individual
            computer repairs to include comprehensive network infrastructure and
            server management for small to medium-sized businesses across
            Vadodara.
          </p>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div key="2016">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A New Identity: Om Computer Services rebranded to{" "}
            <span className="font-bold">DevInfotech</span>, marking a strategic
            shift towards modern IT solutions, enterprise support, and
            future-ready technologies.
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div key="2019">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Our First Dedicated Office: We inaugurated our first official office
            space, a significant milestone that provided a professional
            environment for our expanding team and client consultations.
          </p>
          <Image
            src="https://placehold.co/600x400/222222/FFFFFF?text=New+Office"
            alt="New Office"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div key="2020">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Serving the Community: Honored to be chosen as a technology partner
            for the{" "}
            <span className="font-bold">
              Vadodara City Police Cyber Crime Cell
            </span>
            , contributing to the city&aposd;s digital safety and security
            infrastructure.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div key="2021">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Strengthening National Security: Began providing critical IT
            infrastructure support to the{" "}
            <span className="font-bold">Forensic Science Laboratory (FSL)</span>
            , Gandhinagar, at their Vadodara unit.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div key="2022">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Corporate & Global Reach: A year of significant expansion, securing
            major contracts with industrial giant{" "}
            <span className="font-bold">JK Lakshmi Cement</span> and extending
            our AMC services to clients in the{" "}
            <span className="font-bold">USA</span> and server infrastructure in
            the <span className="font-bold">Netherlands</span>.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div key="2023">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Powering National Infrastructure: Entrusted with providing
            mission-critical IT solutions for the{" "}
            <span className="font-bold">Indian Railway Authorities</span>, a
            testament to our capability in handling large-scale, essential
            operations.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div key="2024">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Cloud Innovation: Launched a proprietary cloud server network across
            Vadodara, offering secure local cloud solutions. We proudly welcomed
            esteemed clients like{" "}
            <span className="font-bold">Delta Shree Diagnostics</span> and{" "}
            <span className="font-bold">Om Containers</span> to our new
            platform.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div key="2025">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            New Ventures & Leadership: Expanded into the international
            biomedical field with{" "}
            <span className="font-bold">Mankind Biomediks (USA)</span>,
            strengthened our leadership with{" "}
            <span className="font-bold">Devnash</span> joining the business, and
            launched our creative wing,{" "}
            <span className="font-bold">Devolve Studio</span>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Background gradients/effects for glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary-accent)]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"></div>
      </div>
      
      <FloatingBackground />

      <div className="relative z-10 container mx-auto px-[5%] py-28 min-h-screen">
        <AnimatedReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-6">
            About DevInfotech
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            Established in <strong>1999</strong> by <strong>Mr. Rajan Ghanshyam</strong>, DevInfotech was founded with a clear vision: to provide affordable, reliable, and cutting-edge IT services under one roof. With decades of experience, we are dedicated to long-term service, robust business support, and serving as a trusted partner for all your technological needs.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.2} className="bg-white/80 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-slate-200/60 shadow-xl mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">Our Journey</h2>
            <Timeline data={data} />
        </AnimatedReveal>

        {/* Core Values Section */}
        <AnimatedReveal delay={0.4}>
          <CoreValues />
        </AnimatedReveal>
      </div>
    </div>
  );
}

// 1999 om computer services (ocs)
//1999 planet internet vadodaras first ISP ( amc)
//2016 ocs became devinfotech
//first office 2019
//2020 cyber crime vadodara
//2021 fnd vadodara
//2022 jklakshmi
//2022 usa amc
//2022 netherland server amcs
//2023 and current railway authorities india
//2024 built a personal cloud server network across vadodara
//2024 cloud clients like delta shree diagnostics joined and om containers
//2025 worked with mankind biomediks (usa)
//2025 devnash joined business
//2025 started a sister company named devolve studio
