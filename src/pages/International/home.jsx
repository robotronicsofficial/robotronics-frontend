import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Stat } from "@/components/ui/stat";
import {
  Display,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";
import MarketingHero from "@/components/marketing/MarketingHero";
import OurServices from "@/components/site/international/services/ourServices";
import QuickContact from "@/components/site/international/services/quickContact";
import { CONTACT_PATH } from "@/router/paths";

const HeroSection = () => (
  <MarketingHero
    size="page"
    eyebrow="Robotronics International"
    title={
      <Display size="md">
        AI &amp; Robotics learning, <Highlight>shipping worldwide</Highlight>.
      </Display>
    }
    subtitle="15,000+ international students learning robotics, coding, and AI through Robotronics. Available wherever a modern browser reaches."
    actions={
      <>
        <Button asChild size="marketingLg">
          <Link to="/subscriptions">Start Learning</Link>
        </Button>
        <Button asChild size="marketingLg" variant="outline">
          <Link to="/International/Iservices">Browse services</Link>
        </Button>
      </>
    }
  />
);

const TrustSection = () => (
  <section className="bg-background pb-12">
    <Container size="wide">
      <div className="grid grid-cols-1 gap-10 border-t border-border pt-12 md:grid-cols-3">
        <Stat value="15,000+" label="International students" />
        <Stat value="140+" label="Schools partnered" />
        <Stat value="30+" label="Future skills" />
      </div>
    </Container>
  </section>
);

const FinalCta = () => (
  <SectionInverse className="pt-24 pb-12 md:pt-32 md:pb-16">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Bring Robotronics to your country.
        </Heading>
        <Text size="lg" className="text-background/75">
          Run a school, run a learning center, or want to distribute? Let&apos;s talk.
        </Text>
        <Button asChild size="marketingLg">
          <Link to={CONTACT_PATH}>Talk to international team</Link>
        </Button>
      </div>
    </Container>
  </SectionInverse>
);

const IHome = () => (
  <>
    <HeroSection />
    <TrustSection />
    <OurServices />
    <QuickContact />
    <FinalCta />
  </>
);

export default IHome;
