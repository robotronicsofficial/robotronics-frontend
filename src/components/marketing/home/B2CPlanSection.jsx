import { useState } from "react";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { PlanCard } from "@/components/marketing/PlanCard";

const PARENT_PLAN = {
  name: "All-in-One Learning Plan",
  description: "One subscription. Every future skill your child needs.",
  pricing: {
    monthly: 2499,
    annualMonthly: 999,
  },
  features: [
    "Access to 30+ future skills (AI, Coding, Robotics, Freelancing)",
    "Learn 2 courses at a time",
    "AI trainer chat support",
    "AI quizzes &  personalized feedback",
    "Project code for every lecture",
    "International e-certificates",
    "Webinars &  community access",
    "Works on mobile, tablet, and desktop",
  ],
  cta: { label: "Start Subscription", to: "/subscriptions" },
};

export const B2CPlanSection = () => {
  const [cycle, setCycle] = useState("annual");
  return (
    <section className="bg-background py-20 md:py-28">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Eyebrow>For parents</Eyebrow>
          <Heading level={2} className="text-display-md">
            One plan. Every skill.
          </Heading>
          <Text size="lg" tone="muted">
            Give your child the skills of tomorrow — today. From AI to entrepreneurship, everything in one platform.
          </Text>
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel="Save 60%"
            className="mt-4"
          />
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          <PlanCard tone="tinted" cycle={cycle} {...PARENT_PLAN} />
        </div>
      </Container>
    </section>
  );
};
