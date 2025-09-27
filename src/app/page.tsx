import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { CompanyStats } from "@/components/Stats";

export default function Home() {
  // Base categories + brands
  const baseKeywords = [
    // Product types
    "laptops",
    "desktop computers",
    "gaming PCs",
    "CCTV cameras",
    "ferule printers",
    "label printers",
    "computer accessories",
    "cloud storage",
    "antivirus software",
    "networking",
    "printers",
    "scanner",
    "routers",
    "servers",
    "monitors",
    "keyboard",
    "mouse",
    "graphics cards",
    "motherboards",
    "RAM",
    "CPU",
    "storage devices",
    "external SSD",
    "external HDD",
    "projectors",
    "laser printers",
    "inkjet printers",
    "NAS devices",
    "UPS",
    "switches",
    "firewalls",
    "network adapters",
    "webcams",
    "microphones",
    "gaming peripherals",
    "mechanical keyboards",
    "gaming mouse",
    "all-in-one PCs",
    "workstations",

    // Brands
    "Dell",
    "HP",
    "Lenovo",
    "Apple",
    "Asus",
    "Acer",
    "Samsung",
    "Sony",
    "LG",
    "Canon",
    "Epson",
    "Brother",
    "Casio",
    "Microsoft",
    "Intel",
    "AMD",
    "NVIDIA",
    "Seagate",
    "Western Digital",
    "Kingston",
    "Logitech",
    "TP-Link",
    "Cisco",
    "Netgear",
    "Synology",
    "Hikvision",
    "Dahua",
    "MSI",
    "Corsair",
    "Razer",
    "SteelSeries",
    "HyperX",
    "EVGA",
    "Gigabyte",
    "Zotac",
    "Anker",
    "Wacom",
  ];

  // Specific products & high-priority items
  const specificProducts = [
    "Casio KL-820 label printer",
    "Casio KL-120 label printer",
    "Dell XPS 15 laptop",
    "Dell Inspiron 16 laptop",
    "Dell wireless mouse",
    "HP LaserJet 1020 printer",
    "HP DeskJet 2720 printer",
    "Logitech MX Master 3 mouse",
    "Logitech G502 gaming mouse",
    "Apple Magic Keyboard",
    "Apple Magic Mouse",
    "Asus ROG Zephyrus laptop",
    "Lenovo ThinkPad X1 Carbon",
    "Acer Predator Helios 300",
    "Canon PIXMA G7020",
    "Epson EcoTank L3150",
    "Brother PT-E850TKW ferule printer",
    "Samsung T7 external SSD",
    "Western Digital My Passport HDD",
    "Kingston 16GB DDR4 RAM",
    "NVIDIA RTX 4080 graphics card",
    "Apple MacBook Pro 16",
    "Apple MacBook Air M2",
    "Dell Alienware m15",
    "MSI Stealth 15M laptop",
    "Razer Blade 17 laptop",
    "Corsair K95 RGB Platinum keyboard",
    "SteelSeries Apex Pro keyboard",
    "HyperX Alloy FPS Pro keyboard",
    "Razer DeathAdder V2 mouse",
    "Corsair Dark Core RGB mouse",
    "Logitech G Pro X Superlight mouse",
    "Samsung 980 Pro 2TB NVMe SSD",
    "Crucial MX500 1TB SSD",
    "G.Skill Trident Z RGB 32GB RAM",
    "Intel Core i9-14900K CPU",
    "AMD Ryzen 9 7950X CPU",
    "ASUS ROG Strix Z790-E motherboard",
    "MSI MPG B650 Carbon WiFi",
    "Corsair Vengeance LPX 64GB RAM",
    "EVGA GeForce RTX 4090 FTW3 Ultra",
    "AMD Radeon RX 7900 XTX",
    "Logitech C920 HD Pro webcam",
    "Elgato Stream Deck MK.2",
    "Wacom Intuos Pro tablet",
    "Apple iPad Pro 12.9",
    "Samsung Galaxy Tab S9 Ultra",
    "Microsoft Surface Pro 10",
    "Seagate 2TB external HDD",
    "TP-Link Archer AX6000 router",
    "Netgear Nighthawk RAXE500",
    "Ubiquiti UniFi 6 Pro AP",
    "Logitech G413 mechanical keyboard",
    "Corsair K70 RGB MK.2",
    "HP OfficeJet Pro 9015",
    "Canon imageCLASS LBP6230dn",
    "Brother HL-L2350DW",
    "Acer Nitro 5 laptop",
    "Asus TUF Gaming F15",
    "Lenovo Legion 5 Pro",
    "Dell OptiPlex 7090 desktop",
    "HP EliteDesk 800 G6",
    "Apple iMac 24-inch M1",
    "Asus ProArt StudioBook",
    "Gigabyte AORUS GeForce RTX 4080",
    "Zotac Gaming GeForce RTX 4070 Ti",
    "ADATA XPG SX8200 Pro 1TB SSD",
    "Western Digital WD Black SN850 2TB SSD",
    "Crucial Ballistix 16GB RAM",
    "Intel Core i7-13700K CPU",
    "AMD Ryzen 7 7800X CPU",
    "ASUS TUF Gaming Z690-Plus motherboard",
    "MSI MAG B660 Tomahawk WiFi",
    "Logitech MX Keys keyboard",
    "Razer Huntsman V2 keyboard",
    "Corsair K60 RGB Pro",
    "HP ZBook Studio G9",
    "Dell Precision 5570",
    "Lenovo ThinkStation P360",
    "Samsung 870 EVO 1TB SSD",
    "Kingston NV2 2TB SSD",
    "Seagate IronWolf 4TB NAS HDD",
  ];

  // Merge base + specific, ensure uniqueness
  const combinedKeywordsSet = new Set([...baseKeywords, ...specificProducts]);
  let combinedKeywords = Array.from(combinedKeywordsSet);

  // Ensure 500+ keywords by adding long-tail variations
  const longTailModifiers = [
    "buy",
    "online",
    "India",
    "sale",
    "price",
    "review",
    "best",
    "latest",
    "2025",
    "cheap",
    "discount",
    "offers",
    "for office",
    "for home",
    "high performance",
    "durable",
    "professional",
    "gaming",
    "wireless",
    "corded",
    "compact",
    "portable",
    "eco-friendly",
  ];

  while (combinedKeywords.length < 520) {
    combinedKeywords.push(
      ...combinedKeywords.map(
        (k) =>
          `${k} ${longTailModifiers[Math.floor(Math.random() * longTailModifiers.length)]}`,
      ),
    );
    combinedKeywords = Array.from(new Set(combinedKeywords)); // ensure uniqueness
  }

  const keywords = combinedKeywords.slice(0, 520);
  const title = "DevInfotech - Laptops, Desktops, Casio Printers & Accessories";
  const description =
    "Buy laptops, desktops, Casio KL-820 label printers, Dell mice, HP printers, computer accessories, cloud storage, antivirus software, and IT solutions from DevInfotech. Quality products and services for all major brands in India. Contact info@devinfotech.net.";

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta name="author" content="DevInfotech" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devinfotech.net/products" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "DevInfotech Products",
              brand: { "@type": "Organization", name: "DevInfotech" },
              url: "https://devinfotech.net/products",
              description: description,
              offers: {
                "@type": "Offer",
                url: "https://devinfotech.net/products",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
              keywords: keywords.join(", "),
            }),
          }}
        />
      </head>

      <main>
        <HeroSection />
        <WelcomeSection />
        <CompanyStats />
      </main>
    </>
  );
}
