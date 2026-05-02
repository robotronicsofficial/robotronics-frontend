import { useState } from "react";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { PlanCard } from "@/components/marketing/PlanCard";

const SCHOOL_PLANS = [
  {
    name: "Basic",
    description: "Everything a school needs to launch a future-skills program.",
    pricing: { monthly: 30000, annualMonthly: 12000 },
    features: [
      "Up to 300 students",
      "Full AI, Coding & Robotics curriculum",
      "Teacher support materials",
      "Student assessments &  tracking",
      "Certificate generation system",
      "School management dashboard",
    ],
    cta: { label: "Get Started", to: "/contactUs" },
  },
  {
    name: "Pro",
    description: "Everything in Basic, plus the tools schools ask for once they grow.",
    pricing: { monthly: 75000, annualMonthly: 75000 },
    features: [
      "Everything in Basic",
      "AI-powered performance insights",
      "Advanced reporting &  analytics",
      "Priority support",
      "Dedicated onboarding",
      "Access to premium resources",
    ],
    cta: { label: "Contact Sales", to: "/contactUs" },
    popular: true,
  },
];

export const B2BPlansSection = () => {
  const [cycle, setCycle] = useState("annual");
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Eyebrow>For schools</Eyebrow>
          <Heading level={2} className="text-display-md">
            Bring AI &  Robotics to every classroom.
          </Heading>
          <Text size="lg" tone="muted">
            Modern STEM curriculum without hiring expensive trainers. Designed to scale with your school.
          </Text>
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel="Up to 60% off"
            className="mt-4"
          />
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {SCHOOL_PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              cycle={cycle}
              tone={plan.popular ? "highlighted" : "default"}
              {...plan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
