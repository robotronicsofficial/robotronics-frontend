import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";
import OurServices from "@/components/site/international/services/ourServices";
import QuickContact from "@/components/site/international/services/quickContact";

const HeroSection = () => (
  <section className="bg-background pt-header pb-12">
    <Container size="wide">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>International services</Eyebrow>
        <Display size="lg">
          Future-skills delivery, <Highlight>worldwide</Highlight>.
        </Display>
        <Text size="lg" tone="muted" className="max-w-2xl">
          Curriculum integration, teacher training, after-school clubs, and more — pick the service that fits your school or organization.
        </Text>
      </div>
    </Container>
  </section>
);

const IServices = () => (
  <>
    <HeroSection />
    <OurServices />
    <QuickContact />
  </>
);

export default IServices;
