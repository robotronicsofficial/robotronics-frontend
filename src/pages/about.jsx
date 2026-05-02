import { Link } from "@tanstack/react-router";
import { Compass, Heart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Stat } from "@/components/ui/stat";
import {
  Display,
  Eyebrow,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";

const VALUES = [
  {
    icon: Sparkles,
    title: "Real skills, real projects",
    description:
      "Every lecture ships with project code so kids leave with something they actually built — not just notes.",
  },
  {
    icon: Compass,
    title: "Personalized at the core",
    description:
      "AI-driven feedback adapts to each child's pace, gaps, and curiosity. No two learning paths look the same.",
  },
  {
    icon: Heart,
    title: "Built for parents",
    description:
      "Transparent dashboards, child profiles, and clear progress signals — so parents always know what's working.",
  },
];

const HeroSection = () => (
  <section className="bg-background pt-header pb-20 md:pb-28">
    <Container size="wide">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>About Robotronics.ai</Eyebrow>
        <Display size="lg">
          We&apos;re building the <Highlight>future-skills layer</Highlight> for every classroom and home.
        </Display>
        <Text size="lg" tone="muted" className="max-w-2xl">
          AI, coding, and robotics aren&apos;t niche anymore — they&apos;re the literacy of the next decade. Robotronics.ai turns that literacy into a single, affordable subscription that any parent or school can switch on.
        </Text>
      </div>
    </Container>
  </section>
);

const MissionSection = () => (
  <section className="bg-muted/40 py-20 md:py-28">
    <Container size="wide">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <Eyebrow>Our mission</Eyebrow>
          <Heading level={2} className="text-display-md">
            Make future skills accessible — at scale.
          </Heading>
          <Text size="lg" tone="muted">
            Hiring an AI or robotics specialist isn&apos;t realistic for most schools, and most parents can&apos;t personally tutor their child through twelve fast-moving fields. We exist to close that gap.
          </Text>
          <Text tone="muted">
            One subscription, every skill. AI guides the lessons. Parents see what&apos;s actually happening. Schools roll out a modern STEM track without hiring a single new specialist.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Stat value="150,000+" label="Students learning today" />
          <Stat value="140+" label="Schools partnered worldwide" />
          <Stat value="30+" label="Future skills in one plan" />
          <Stat value="6–16" label="Ages we serve" />
        </div>
      </div>
    </Container>
  </section>
);

const ValuesSection = () => (
  <section className="bg-background py-20 md:py-28">
    <Container size="wide">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>What we believe</Eyebrow>
        <Heading level={2} className="text-display-md">
          Three principles that shape every release.
        </Heading>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
          >
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-lg bg-primary-soft text-primary"
            >
              <Icon className="size-5" />
            </span>
            <Heading level={3} className="text-h4">
              {title}
            </Heading>
            <Text size="sm" tone="muted">
              {description}
            </Text>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const FinalCta = () => (
  <SectionInverse className="pt-24 pb-12 md:pt-32 md:pb-16">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Join 150,000+ kids already learning what&apos;s next.
        </Heading>
        <Text size="lg" className="text-background/75">
          Pick a plan in under a minute, or talk to our schools team about rolling Robotronics.ai out across classrooms.
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="marketingLg">
            <Link to="/subscriptions">Start Learning</Link>
          </Button>
          <Button
            asChild
            size="marketingLg"
            variant="ghost"
            className="text-background hover:bg-background/10"
          >
            <Link to="/contactUs">For Schools</Link>
          </Button>
        </div>
      </div>
    </Container>
  </SectionInverse>
);

const About = () => (
  <>
    <HeroSection />
    <MissionSection />
    <ValuesSection />
    <FinalCta />
  </>
);

export default About;
