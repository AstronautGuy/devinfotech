import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { CompanyStats } from "@/components/Stats";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <CompanyStats />
    </main>
  );
}
