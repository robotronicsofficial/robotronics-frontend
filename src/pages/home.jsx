import { B2BPlansSection } from "@/components/marketing/home/B2BPlansSection";
import { B2CPlanSection } from "@/components/marketing/home/B2CPlanSection";
import { DashboardPreviewSection } from "@/components/marketing/home/DashboardPreviewSection";
import { FaqSection } from "@/components/marketing/home/FaqSection";
import { FeaturesSection } from "@/components/marketing/home/FeaturesSection";
import { FinalCTASection } from "@/components/marketing/home/FinalCTASection";
import { HeroSection } from "@/components/marketing/home/HeroSection";
import { HowItWorksSection } from "@/components/marketing/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/marketing/home/TestimonialsSection";
import { TrustSection } from "@/components/marketing/home/TrustSection";

const Home = () => (
  <>
    <HeroSection />
    <HowItWorksSection />
    <FeaturesSection />
    <B2CPlanSection />
    <B2BPlansSection />
    <DashboardPreviewSection />
    <TrustSection />
    <TestimonialsSection />
    <FaqSection />
    <FinalCTASection />
  </>
);

export default Home;
