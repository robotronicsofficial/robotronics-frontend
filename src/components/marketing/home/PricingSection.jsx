import { useState } from "react";
import PropTypes from "prop-types";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { PlanCard } from "@/components/marketing/PlanCard";
import { cn } from "@/lib/utils";

const AUDIENCES = {
  parent: {
    label: "For parents",
    heading: "One plan. Every skill.",
    description:
      "Give your child the skills of tomorrow — today. From AI to entrepreneurship, everything in one platform.",
    savingsLabel: "Save 60%",
    layout: "single",
    plans: [
      {
        name: "All-in-One Learning Plan",
        description: "One subscription. Every future skill your child needs.",
        pricing: { monthly: 2499, annualMonthly: 999 },
        features: [
          "Access to 30+ future skills (AI, Coding, Robotics, Freelancing)",
          "Learn 2 courses at a time",
          "AI trainer chat support",
          "AI quizzes & personalized feedback",
          "Project code for every lecture",
          "International e-certificates",
          "Webinars & community access",
          "Works on mobile, tablet, and desktop",
        ],
        cta: { label: "Start Subscription", to: "/subscriptions" },
        tone: "tinted",
      },
    ],
  },
  school: {
    label: "For schools",
    heading: "Bring AI & Robotics to every classroom.",
    description:
      "Modern STEM curriculum without hiring expensive trainers. Designed to scale with your school.",
    savingsLabel: "Up to 60% off",
    layout: "pair",
    plans: [
      {
        name: "Basic",
        description:
          "Everything a school needs to launch a future-skills program.",
        pricing: { monthly: 30000, annualMonthly: 12000 },
        features: [
          "Up to 300 students",
          "Full AI, Coding & Robotics curriculum",
          "Teacher support materials",
          "Student assessments & tracking",
          "Certificate generation system",
          "School management dashboard",
        ],
        cta: { label: "Get Started", to: "/contactUs" },
        tone: "default",
      },
      {
        name: "Pro",
        description:
          "Everything in Basic, plus the tools schools ask for once they grow.",
        pricing: { monthly: 75000, annualMonthly: 75000 },
        features: [
          "Everything in Basic",
          "AI-powered performance insights",
          "Advanced reporting & analytics",
          "Priority support",
          "Dedicated onboarding",
          "Access to premium resources",
        ],
        cta: { label: "Contact Sales", to: "/contactUs" },
        tone: "highlighted",
        popular: true,
      },
    ],
  },
};

const AUDIENCE_OPTIONS = [
  { value: "parent", label: "For parents" },
  { value: "school", label: "For schools" },
];

const AudienceToggle = ({ value, onChange }) => (
  <div
    role="radiogroup"
    aria-label="Audience"
    className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
  >
    {AUDIENCE_OPTIONS.map((option) => {
      const selected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(option.value)}
          className={cn(
            "inline-flex h-10 items-center rounded-full px-5 text-body-sm font-semibold transition-colors",
            selected
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

AudienceToggle.propTypes = {
  value: PropTypes.oneOf(["parent", "school"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const PricingSection = () => {
  const [audience, setAudience] = useState("parent");
  const [cycle, setCycle] = useState("annual");
  const config = AUDIENCES[audience];

  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <AudienceToggle value={audience} onChange={setAudience} />
          <Heading level={2} className="text-display-md">
            {config.heading}
          </Heading>
          <Text size="lg" tone="muted">
            {config.description}
          </Text>
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel={config.savingsLabel}
            className="mt-2"
          />
        </div>
        <div
          className={cn(
            "mx-auto mt-12 grid gap-6",
            config.layout === "pair"
              ? "max-w-4xl grid-cols-1 md:grid-cols-2"
              : "max-w-xl grid-cols-1",
          )}
        >
          {config.plans.map((plan) => (
            <PlanCard key={plan.name} cycle={cycle} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
};
