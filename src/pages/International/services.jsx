import { Display, Highlight } from "@/components/ui/typography";
import MarketingHero from "@/components/marketing/MarketingHero";
import OurServices from "@/components/site/international/services/ourServices";
import QuickContact from "@/components/site/international/services/quickContact";

const HeroSection = () => (
  <MarketingHero
    size="page"
    eyebrow="International services"
    title={
      <Display size="md">
        Future-skills delivery, <Highlight>worldwide</Highlight>.
      </Display>
    }
    subtitle="Curriculum integration, teacher training, after-school clubs, and more — pick the service that fits your school or organization."
  />
);

const IServices = () => (
  <>
    <HeroSection />
    <OurServices />
    <QuickContact />
  </>
);

export default IServices;
