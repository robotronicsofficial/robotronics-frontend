import { useState } from "react";
import PropTypes from "prop-types";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { AnnualOfferCountdown } from "@/components/marketing/AnnualOfferCountdown";
import { PlanCard } from "@/components/marketing/PlanCard";
import { cn } from "@/lib/utils";
const SCHOOLS_PATH = "/for-schools";

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
        pricing: { monthly: 2499, annual: 11988 },
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
    savingsLabel: "Save with annual billing",
    layout: "pair",
    plans: [
      {
        name: "Basic",
        description:
          "Everything a school needs to launch a future-skills program.",
        pricing: { monthly: 30000, annual: 300000 },
        features: [
          "Up to 300 students",
          "Full AI, Coding & Robotics curriculum",
          "Teacher support materials",
          "Student assessments & tracking",
          "Certificate generation system",
          "School management dashboard",
        ],
        cta: { label: "Talk to schools team", to: SCHOOLS_PATH },
        tone: "default",
      },
      {
        name: "Pro",
        description:
          "Everything in Basic, plus the tools schools ask for once they grow.",
        pricing: { monthly: 75000, annual: 750000 },
        features: [
          "Everything in Basic",
          "AI-powered performance insights",
          "Advanced reporting & analytics",
          "Priority support",
          "Dedicated onboarding",
          "Access to premium resources",
        ],
        cta: { label: "Talk to schools team", to: SCHOOLS_PATH },
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

/* Two equal-width options → CSS-only traveling thumb. Width is fixed at
   `calc(50% - p)`, position via `translateX(activeIndex * 100%)`. No JS
   measurement, no layout properties animated. */
const AudienceToggle = ({ value, onChange }) => {
  const activeIndex = AUDIENCE_OPTIONS.findIndex((o) => o.value === value);
  return (
    <div
      aria-label="Audience"
      className="relative grid grid-cols-2 rounded-full border border-border bg-card p-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary transition-transform duration-[var(--duration-base)] ease-out-quint motion-reduce:transition-none"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {AUDIENCE_OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex h-10 items-center justify-center rounded-full px-5 text-body-sm font-semibold transition-colors duration-[var(--duration-fast)]",
              selected
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

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
          {/* Heading + description re-mount on audience change so the
             swap-in keyframe runs. BillingToggle stays outside — its
             savingsLabel changes silently in place. */}
          <div
            key={audience}
            className="flex flex-col items-center gap-5 animate-swap-in motion-reduce:animate-none"
          >
            <Heading level={2} className="text-display-md">
              {config.heading}
            </Heading>
            <Text size="lg" tone="muted">
              {config.description}
            </Text>
          </div>
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel={config.savingsLabel}
            className="mt-2"
          />
          {cycle === "annual" && <AnnualOfferCountdown />}
        </div>
        <div
          key={audience}
          className={cn(
            "mx-auto mt-12 grid gap-6 animate-swap-in motion-reduce:animate-none",
            config.layout === "pair"
              ? "max-w-4xl grid-cols-1 md:grid-cols-2"
              : "max-w-xl grid-cols-1",
          )}
        >
          {config.plans.map((plan) => (
            <PlanCard
              key={plan.name}
              cycle={cycle}
              giftable={audience === "parent"}
              {...plan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
