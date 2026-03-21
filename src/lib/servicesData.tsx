import { 
  Cloud, Server, Monitor, Wrench, LifeBuoy, Network, 
  Printer, ShieldCheck, HardDrive, Cpu, Search, Globe, Smartphone, LucideIcon, PenTool, LayoutTemplate
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  features: string[];
  benefits: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "tally-on-cloud",
    title: "Tally on Cloud",
    shortDesc: "Experience the freedom of accounting without limits. Secure, reliable financial access anytime.",
    longDesc: "Tally on Cloud transforms traditional accounting by moving your complete financial desktop infrastructure to our highly secure, hyper-available cloud servers. Eliminate the need for local hardware maintenance, avoid data loss risks, and empower your remote teams to collaborate seamlessly. Our infrastructure is optimized specifically for Tally ERP9 and Prime setups, guaranteeing zero-lag performance and automatic daily encrypted backups.",
    icon: Cloud,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    features: [
      "Access Tally from anywhere, anytime",
      "No local dependency or installation required",
      "Secure cloud-hosted environment for safety",
      "Multi-user capability for seamless teamwork",
      "Reliable performance with minimum downtime",
      "Automated daily snapshot backups"
    ],
    benefits: [
      "Zero upfront hardware capital expenditure.",
      "Bulletproof protection against ransomware.",
      "Work from any device (Windows, Mac, Mobile).",
      "Scales instantly as your business grows."
    ]
  },
  {
    slug: "vps-hosting",
    title: "VPS (Managed Windows Servers)",
    shortDesc: "Your personal remote computer in the cloud. Fully managed infrastructure for ultimate data safety.",
    longDesc: "Our Managed Virtual Private Servers (VPS) offer the ultimate balance of raw computational power and remote accessibility. Designed for enterprises that demand dedicated resources without the hassle of physical server management, our Windows servers act exactly like your local desktop, but powered by enterprise-grade data centers. Fully backed by Cloudflare security protocols, ensuring DDoS protection and minimal latency globally.",
    icon: Server,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    features: [
      "Protected by Cloudflare for maximum security",
      "Works seamlessly like a personal remote computer",
      "Fully managed environment so you focus on business",
      "Data stored securely on robust cloud infrastructure",
      "Regular backups ensure your data is always safe",
      "Root administrative access included"
    ],
    benefits: [
      "Isolates your critical operations from local network threats.",
      "99.9% Guaranteed Server Uptime SLA.",
      "No costly cooling or power redundancy setups needed.",
      "Instant resource allocation scaling."
    ]
  },
  {
    slug: "computer-sales",
    title: "Computer Sales",
    shortDesc: "Premium laptops and desktops tailored for your exact needs.",
    longDesc: "We provide end-to-end procurement of IT hardware tailored specifically for your individual or enterprise requirements. Whether you need sleek ultrabooks for corporate executives, ruggedized laptops for field reporting, or high-performance desktops for graphic rendering, we offer direct access to top-tier brands including Dell, HP, Lenovo, and Apple at competitive wholesale margins.",
    icon: Monitor,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    features: [
      "Authorized partnerships with major OEMs",
      "Bulk enterprise discounts",
      "Pre-configured OS and essential software",
      "Warranty management and extension support"
    ],
    benefits: [
      "Get precisely the hardware you need without overspending.",
      "Hassle-free deployment with pre-configured systems.",
      "We handle the RMA and warranty claims for you."
    ]
  },
  {
    slug: "computer-repair",
    title: "Computer Repair",
    shortDesc: "Fast, reliable diagnostics and servicing for all PC/Laptop models.",
    longDesc: "Hardware malfunctions can cripple productivity. Our expert technicians provide rapid, component-level repair services for laptops, desktops, and workstations. From screen replacements and battery swaps to motherboard chip-level soldering and liquid damage recovery, our lab is equipped to resurrect your critical hardware quickly and affordably.",
    icon: Wrench,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    features: [
      "Component-level motherboard repair",
      "Screen and battery replacements",
      "Thermal paste application and deep cleaning",
      "Liquid damage logic board recovery"
    ],
    benefits: [
      "Fraction of the cost of buying a new machine.",
      "Rapid turnaround times to minimize downtime.",
      "Genuine replacement parts with trusted warranties."
    ]
  },
  {
    slug: "it-support-amc",
    title: "IT Support & Maintenance",
    shortDesc: "Proactive AMC contracts to keep your business running smoothly.",
    longDesc: "An Annual Maintenance Contract (AMC) is your ultimate insurance policy against IT downtime. Rather than waiting for systems to break, our proactive IT support actively mitigates disaster through routine health checks, remote monitoring, and priority incident response. We function as your outsourced, dedicated IT department.",
    icon: LifeBuoy,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500",
    features: [
      "24/7 Remote Desktop Support",
      "Scheduled physical maintenance visits",
      "Priority SLA incident response",
      "Software patching and antivirus management"
    ],
    benefits: [
      "Predictable, flat-rate IT expenditure.",
      "Catch hardware failures before they happen.",
      "Free up your staff to focus on their actual jobs."
    ]
  },
  {
    slug: "networking-solutions",
    title: "Networking Solutions",
    shortDesc: "Robust LAN/WAN setups and wireless network optimization.",
    longDesc: "The backbone of any modern organization is its network infrastructure. We architect, cable, and configure high-throughput local and wide area networks (LAN/WAN). From pulling CAT6a cables in a new office to configuring complex VLANs, setting up secure site-to-site VPNs, and eliminating Wi-Fi dead zones, we build networks that simply work.",
    icon: Network,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500",
    features: [
      "Structured cabling and rack management",
      "Enterprise Wi-Fi deployment (Ubiquiti/Aruba/Cisco)",
      "Router, Switch, and Firewall configuration",
      "Network Penetration and Vulnerability Auditing"
    ],
    benefits: [
      "Eliminate dropped packets and slow transfer speeds.",
      "Secure internal data from guest networks.",
      "Future-proof infrastructure ready for gigabit speeds."
    ]
  },
  {
    slug: "printers-peripherals",
    title: "Printers & Peripherals",
    shortDesc: "High-quality printers, scanners, and essential hardware accessories.",
    longDesc: "Despite moving toward a digital world, physical documentation remains crucial. We supply, configure, and service a vast array of printing and imaging solutions—ranging from standard office lasers and multifunction ink tanks to specialized label/ferrule printers and high-speed commercial scanners.",
    icon: Printer,
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    features: [
      "Enterprise Multi-Function Printer (MFP) Leasing/Sales",
      "Thermal and Barcode printer implementation",
      "Network printer sharing and secure print configuration",
      "Original toner and ink consumable supply"
    ],
    benefits: [
      "Reduce printing bottlenecks in high-volume environments.",
      "Dramatically lower cost-per-page with optimized hardware.",
      "Never run out of ink with scheduled consumable delivery."
    ]
  },
  {
    slug: "security-solutions",
    title: "Security Solutions",
    shortDesc: "Comprehensive CCTV and biometric access control installations.",
    longDesc: "Protect your physical assets and restrict unauthorized access with our integrated security infrastructure. We deploy high-definition IP-CCTV systems capable of facial recognition and night vision alongside biometric attendance and door interlocking systems, giving you total command over your facility from your smartphone.",
    icon: ShieldCheck,
    color: "text-red-500",
    bgColor: "bg-red-500",
    features: [
      "IP and Analog HD CCTV Installation",
      "Biometric/RFID Door Access Control Systems",
      "Time and Attendance Software Integration",
      "Cloud-stored video recording and motion alerts"
    ],
    benefits: [
      "Deter theft and monitor productivity 24/7 remotely.",
      "Automate payroll integration via biometric data.",
      "Highly scalable from single-office to multi-warehouse."
    ]
  },
  {
    slug: "data-recovery",
    title: "Data Recovery",
    shortDesc: "Professional data retrieval from corrupted or damaged drives.",
    longDesc: "A dead hard drive shouldn't mean the end of your business history. Our dedicated data recovery clean-room partners and advanced software forensics allow us to retrieve critical data from physically shattered hard disks, accidentally formatted SSDs, RAID array failures, and corrupted flash memory.",
    icon: HardDrive,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500",
    features: [
      "Class-100 Clean Room physical recovery",
      "RAID array rebuilds and partition recovery",
      "Deleted file and formatted drive extraction",
      "Ransomware encrypted data consultation"
    ],
    benefits: [
      "Rescue years of accounting or family photos believed lost.",
      "Strict confidentiality and data destruction policies post-recovery.",
      "No-Data, No-Fee evaluation structures."
    ]
  },
  {
    slug: "custom-pc-builds",
    title: "Custom PC Builds",
    shortDesc: "High-performance workstations and gaming rigs built to order.",
    longDesc: "Off-the-shelf computers often compromise on critical components. For professionals requiring massive CAD rendering power, developers compiling heavy codebases, or enthusiasts demanding high-FPS gaming, we hand-craft custom PC builds. We meticulously select every component for maximum synergy, stability, and aesthetic perfection.",
    icon: Cpu,
    color: "text-pink-500",
    bgColor: "bg-pink-500",
    features: [
      "Precision thermal management and custom water cooling",
      "Overclocking and stability stress testing",
      "Immaculate cable management and aesthetic RGB tuning",
      "Optimized workstation configurations for Premiere/AutoCAD"
    ],
    benefits: [
      "Vastly out-perform pre-built machines at the same price.",
      "Easily upgradeable components down the line.",
      "Stunning aesthetics that act as office centerpieces."
    ]
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortDesc: "Data-driven strategies to rank higher and increase organic traffic.",
    longDesc: "A beautiful website is useless if nobody can find it on Google. Our comprehensive Search Engine Optimization (SEO) strategies involve deep technical audits, semantic keyword mapping, high-quality backlink generation, and content restructuring to establish true domain authority and drive highly qualified organic leads straight to your inbox.",
    icon: Search,
    color: "text-teal-500",
    bgColor: "bg-teal-500",
    features: [
      "Comprehensive On-Page and Technical SEO Audits",
      "Competitor keyword gap analysis",
      "High DA backlink outreach campaigns",
      "Google My Business (Local SEO) domination"
    ],
    benefits: [
      "Stop paying for expensive Pay-Per-Click ads.",
      "Capture customers actively searching for your solutions.",
      "Build long-term, compounding digital brand equity."
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortDesc: "Stunning, scalable, fast websites and powerful web applications.",
    longDesc: "We don't just build websites; we engineer blazing-fast digital experiences. Utilizing modern stacks like Next.js, React, and robust cloud databases, our development team crafts highly functional web applications ranging from sleek corporate portfolios to massive multi-tenant SaaS dashboards.",
    icon: Globe,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    features: [
      "Modern frameworks (React, Next.js, Node)",
      "Headless CMS and E-commerce integrations",
      "Flawless mobile-responsive UI/UX",
      "API Development and third-party software integration"
    ],
    benefits: [
      "Load times under 1 second to maximize user retention.",
      "Completely bespoke design tailored to your exact brand.",
      "Infinitely scalable architecture ready for millions of hits."
    ]
  },
  {
    slug: "mobile-apps",
    title: "iOS/Android Apps",
    shortDesc: "Native and cross-platform mobile apps for iOS and Android.",
    longDesc: "Put your business directly into the pockets of your customers. We design and develop intuitive, high-performance mobile applications for both Apple iOS and Google Android platforms. Utilizing cross-platform technologies like React Native or Flutter, we deliver flawless native experiences efficiently.",
    icon: Smartphone,
    color: "text-rose-500",
    bgColor: "bg-rose-500",
    features: [
      "Cross-platform development (React Native / Flutter)",
      "Native device integration (Camera, GPS, Biometrics)",
      "Push notification deployment engines",
      "App Store and Google Play publishing support"
    ],
    benefits: [
      "Increase customer loyalty and direct engagement.",
      "Monetize via in-app purchases or subscription models.",
      "One unified codebase deploys to both major platforms."
    ]
  },
  {
    slug: "branding",
    title: "Brand Identity",
    shortDesc: "Comprehensive logo design and brand identity kits for modern businesses.",
    longDesc: "Your brand is more than just a logo; it's the emotional connection between you and your customers. We craft cohesive brand identities spanning from typography and color palettes to marketing materials and business cards. Stand out from your competition with stunning, memorable design.",
    icon: PenTool,
    color: "text-amber-500",
    bgColor: "bg-amber-500",
    features: ["Custom Logo Design", "Full Brand Guidelines", "Business Card & Stationery", "Digital Asset Kits"],
    benefits: ["Build instant trust with a premium look.", "Maintain visual consistency across all platforms."]
  },
  {
    slug: "ui-ux",
    title: "UI/UX Design",
    shortDesc: "Beautiful, intuitive, and user-centric interfaces for apps and websites.",
    longDesc: "We design digital experiences that users love. From wireframing complex software architectures to prototyping high-fidelity mobile application interfaces, our UI/UX team focuses on minimizing friction and maximizing user delight through stunning visual aesthetics.",
    icon: LayoutTemplate,
    color: "text-violet-500",
    bgColor: "bg-violet-500",
    features: ["High-Fidelity Prototyping (Figma)", "User Journey Mapping", "Wireframing & UX Architecture", "Interactive Animations Design"],
    benefits: ["Lower user bounce rates.", "Increase software adoption metrics.", "Reduce development rework significantly."]
  }
];
