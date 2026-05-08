import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  Display,
  Eyebrow,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";
import MarketingHero from "@/components/marketing/MarketingHero";
import SubscriptionPlans from "./SubscriptionPlans";

const FAQ_ITEMS = [
  {
    question: "Who can register for a learning subscription?",
    answer:
      "Any child aged 6 and up. Parents create one account and add a profile per child.",
  },
  {
    question: "If I have more than one child, do I pay once or per child?",
    answer:
      "Per child. Each kid is a separate subscription on the same parent account — there's no shared family seat. Add as many children as you like at checkout; each is billed at the same per-child rate.",
  },
  {
    question: "Do you provide e-certificates?",
    answer:
      "Yes. Active learners earn e-certificates issued through STEMSOL.org, a US-based credentialing service recognized internationally.",
  },
  {
    question: "How do payments work?",
    answer:
      "Every payment is online. Pick monthly or annual at checkout — annual subscriptions come with a steep discount.",
  },
  {
    question: "Which devices are required?",
    answer:
      "Anything with a modern browser — laptop, tablet, or phone. No special hardware required.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from the parent dashboard whenever you like. No calls, no forms.",
  },
];

const SubscriptionIntro = () => (
  <MarketingHero
    size="flagship"
    eyebrow="Subscriptions"
    title={
      <Display size="lg">
        One subscription. <Highlight>Every future skill.</Highlight>
      </Display>
    }
    subtitle="AI, Coding, Robotics & 30+ skills — all in one plan. Built for kids 6–16, trusted by parents and schools."
  />
);

const SubscriptionFaq = () => (
  <section className="bg-muted/40 py-20 md:py-24">
    <Container size="wide">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[24rem_1fr] lg:gap-20">
        <div className="flex flex-col gap-4">
          <Eyebrow>Questions</Eyebrow>
          <Heading level={2} className="text-display-md">
            Subscription details, answered.
          </Heading>
          <Text tone="muted">
            Still unsure? Reach out to support — we reply within a business day.
          </Text>
        </div>
        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </Container>
  </section>
);

const SubscriptionFinalCta = () => (
  <SectionInverse className="py-20 md:py-24">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Ready to start?
        </Heading>
        <Text size="lg" className="text-background/75">
          Pick a plan above, or talk to our schools team about rolling Robotronics.ai out across classrooms.
        </Text>
        <Button
          asChild
          size="marketingLg"
          variant="ghost"
          className="text-background hover:bg-background/10"
        >
          <Link to="/for-schools">Talk to schools team</Link>
        </Button>
      </div>
    </Container>
  </SectionInverse>
);

const SubscriptionHome = () => (
  <>
    <SubscriptionIntro />
    <SubscriptionPlans />
    <SubscriptionFaq />
    <SubscriptionFinalCta />
  </>
);

export default SubscriptionHome;
