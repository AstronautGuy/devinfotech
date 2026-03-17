export const baseKeywords = [
  "laptops", "desktop computers", "gaming PCs", "CCTV cameras", "ferule printers",
  "label printers", "computer accessories", "cloud storage", "antivirus software",
  "networking", "printers", "scanner", "routers", "servers", "monitors",
  "keyboard", "mouse", "graphics cards", "motherboards", "RAM", "CPU",
  "storage devices", "external SSD", "external HDD", "projectors", "laser printers",
  "inkjet printers", "NAS devices", "UPS", "switches", "firewalls",
  "network adapters", "webcams", "microphones", "gaming peripherals",
  "mechanical keyboards", "gaming mouse", "all-in-one PCs", "workstations"
];

const longTailModifiers = [
  "buy", "online", "India", "sale", "price", "review", "best", "latest",
  "2026", "cheap", "discount", "offers", "for office", "for home",
  "high performance", "durable", "professional", "gaming", "wireless"
];

export function getKeywords(additionalKeywords: string[] = []): string[] {
  const combined = [...baseKeywords, ...additionalKeywords];
  const result: string[] = [...combined];
  let index = 0;

  while (result.length < 250 && index < combined.length) {
    const k = combined[index];
    for (const mod of longTailModifiers) {
      if (result.length >= 250) break;
      result.push(`${k} ${mod}`);
    }
    index++;
  }
  return result.slice(0, 250);
}
