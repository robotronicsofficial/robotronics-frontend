import {
  Award,
  Bot,
  GraduationCap,
  Layers,
  LineChart,
  Smartphone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Trainer",
    description:
      "An AI mentor that answers your child's questions, gives feedback, and adapts to their pace.",
  },
  {
    icon: Layers,
    title: "30+ Future Skills",
    description:
      "AI, coding, robotics, freelancing — one subscription unlocks all of them.",
  },
  {
    icon: GraduationCap,
    title: "Project-Based Learning",
    description:
      "Every lecture ships with project code so kids build real things, not just watch videos.",
  },
  {
    icon: LineChart,
    title: "Parent Dashboard",
    description:
      "Track progress, manage child profiles, and see what your kid actually learned.",
  },
  {
    icon: Award,
    title: "Recognized Certificates",
    description:
      "International e-certificates kids earn as they finish modules — proof, not participation.",
  },
  {
    icon: Smartphone,
    title: "Any Device",
    description:
      "Mobile, tablet, desktop. Learning continues wherever your child is.",
  },
];

export const FeaturesSection = () => (
  <section className="bg-background py-20 md:py-28">
    <Container size="wide">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>What&apos;s inside</Eyebrow>
        <Heading level={2} className="text-display-md">
          Everything your child needs in one subscription.
        </Heading>
        <Text size="lg" tone="muted">
          Built for curious kids and the parents who want their screen time to actually go somewhere.
        </Text>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </Container>
  </section>
);
