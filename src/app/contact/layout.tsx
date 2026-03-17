import { getKeywords } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact DevInfotech - Support and IT Audits in Vadodara",
    description: "Reach out to DevInfotech for critical AMC queries, hardware repairs, surveillance setup, or cloud pushes. Use our clean glass submission system.",
    keywords: getKeywords(["contact details", "helpdesk support", "location address", "office timings", "get in touch Vadodara"]),
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
