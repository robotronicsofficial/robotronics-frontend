import { BuildShowcaseSection } from "@/components/marketing/home/BuildShowcaseSection";
import { DashboardPreviewSection } from "@/components/marketing/home/DashboardPreviewSection";
import { FaqSection } from "@/components/marketing/home/FaqSection";
import { FeaturesSection } from "@/components/marketing/home/FeaturesSection";
import { FinalCTASection } from "@/components/marketing/home/FinalCTASection";
import { HeroSection } from "@/components/marketing/home/HeroSection";
import { HowItWorksSection } from "@/components/marketing/home/HowItWorksSection";
import { PricingSection } from "@/components/marketing/home/PricingSection";
import { TestimonialsSection } from "@/components/marketing/home/TestimonialsSection";
import { TrustSection } from "@/components/marketing/home/TrustSection";

const Home = () => (
  <>
    <HeroSection />
    <HowItWorksSection />
    <BuildShowcaseSection />
    <FeaturesSection />
    <PricingSection />
    <DashboardPreviewSection />
    <TrustSection />
    <TestimonialsSection />
    <FaqSection />
    <FinalCTASection />
  </>
);

export default Home;
