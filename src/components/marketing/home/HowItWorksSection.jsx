import { BlurText } from "@/components/ui/blur-text";
import { Container } from "@/components/ui/container";
import { Stepper } from "@/components/ui/stepper";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const STEPS = [
  {
    label: "Choose a plan",
    description: "Pick the subscription that fits your child or your school.",
  },
  {
    label: "Select courses",
    description: "Browse 30+ skills across AI, coding, and robotics.",
  },
  {
    label: "Learn with AI",
    description: "Personalized guidance, quizzes, and project codes for every lecture.",
  },
  {
    label: "Track progress",
    description: "Parent dashboard, certificates, and real performance insights.",
  },
];

export const HowItWorksSection = () => (
  <section className="bg-muted/40 py-20 md:py-28">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <Eyebrow>How it works</Eyebrow>
        <Heading level={2} className="text-display-md text-balance">
          <BlurText text="From sign-up to skills, in four steps." />
        </Heading>
        <Text size="lg" tone="muted" className="text-pretty">
          No setup, no hardware, no special trainers. Pick a plan and your child starts learning the same day.
        </Text>
      </div>
      <Stepper steps={STEPS} activeIndex={STEPS.length - 1} className="mt-16 max-w-5xl mx-auto" />
    </Container>
  </section>
);
