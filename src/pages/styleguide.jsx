import { useState } from "react";
import {
  Bot,
  GraduationCap,
  Layers,
  Award,
  LineChart,
  Smartphone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BillingToggle } from "@/components/ui/billing-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FeatureCard } from "@/components/ui/feature-card";
import { Stat } from "@/components/ui/stat";
import { Stepper } from "@/components/ui/stepper";
import {
  Display,
  Eyebrow,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   Page-local building blocks
   ────────────────────────────────────────────────────────────────── */

const Shell = ({ children }) => (
  <div className="bg-background text-foreground">
    <div className="mx-auto w-shell px-6 py-24 md:py-32">{children}</div>
  </div>
);

const Section = ({ id, eyebrow, title, description, children }) => (
  <section id={id} className="mt-24 first:mt-0">
    <header className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} className="mt-3">
        {title}
      </Heading>
      {description && (
        <Text className="mt-3" tone="muted">
          {description}
        </Text>
      )}
    </header>
    <div className="mt-10">{children}</div>
  </section>
);

const Subhead = ({ children }) => (
  <Text size="sm" weight="semibold" className="mb-4 uppercase tracking-wider text-subtle-foreground">
    {children}
  </Text>
);

/* ──────────────────────────────────────────────────────────────────
   Foundation · Color
   ────────────────────────────────────────────────────────────────── */

const SEMANTIC_SWATCHES = [
  { name: "background", className: "bg-background", border: true },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card", border: true },
  { name: "primary", className: "bg-primary" },
  { name: "primary-soft", className: "bg-primary-soft", border: true },
  { name: "secondary", className: "bg-secondary", border: true },
  { name: "muted", className: "bg-muted", border: true },
  { name: "border", className: "bg-border" },
  { name: "ring", className: "bg-ring" },
  { name: "destructive", className: "bg-destructive" },
];

const NEUTRAL_RAMP = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const BRAND_RAMP = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const SemanticSwatch = ({ name, className, border }) => (
  <div className="flex flex-col gap-2">
    <div
      aria-hidden="true"
      className={cn("h-20 w-full rounded-md", border && "border border-border", className)}
    />
    <Text size="sm" weight="medium">
      {name}
    </Text>
  </div>
);

const RampSwatch = ({ family, step }) => (
  <div className="flex flex-col gap-2">
    <div
      aria-hidden="true"
      className={cn("h-16 rounded-sm", family === "neutral" && step < 200 && "border border-border")}
      style={{ backgroundColor: `var(--color-${family}-${step})` }}
    />
    <Text size="xs" tone="subtle" className="font-mono">
      {step}
    </Text>
  </div>
);

const ColorSection = () => (
  <Section
    id="color"
    eyebrow="Foundation"
    title="Color"
    description="Three brand colors only. Mustard is reserved for action — CTAs, active states, and keyword emphasis. Neutrals carry everything else."
  >
    <div>
      <Subhead>Semantic</Subhead>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-5">
        {SEMANTIC_SWATCHES.map((swatch) => (
          <SemanticSwatch key={swatch.name} {...swatch} />
        ))}
      </div>
    </div>

    <div className="mt-12">
      <Subhead>Brand · mustard</Subhead>
      <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
        {BRAND_RAMP.map((step) => (
          <RampSwatch key={step} family="brand" step={step} />
        ))}
      </div>
    </div>

    <div className="mt-12">
      <Subhead>Neutral</Subhead>
      <div className="grid grid-cols-6 gap-3 md:grid-cols-11">
        {NEUTRAL_RAMP.map((step) => (
          <RampSwatch key={step} family="neutral" step={step} />
        ))}
      </div>
    </div>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Foundation · Typography
   ────────────────────────────────────────────────────────────────── */

const TypeRow = ({ label, sample, children }) => (
  <div className="flex flex-col gap-1 border-t border-border py-6 first:border-t-0 first:pt-0 md:flex-row md:items-baseline md:gap-8">
    <div className="md:w-44 md:shrink-0">
      <Text size="xs" tone="subtle" className="font-mono">
        {label}
      </Text>
      {sample && (
        <Text size="xs" tone="subtle" className="font-mono">
          {sample}
        </Text>
      )}
    </div>
    <div className="min-w-0 flex-1">{children}</div>
  </div>
);

const TypographySection = () => (
  <Section
    id="typography"
    eyebrow="Foundation"
    title="Typography"
    description="Poppins across the entire app. Display sizes are fluid via clamp; everything else is fixed for predictability."
  >
    <div>
      <Subhead>Display</Subhead>
      <TypeRow label="display-xl" sample="3.25 → 5.25rem">
        <Display size="xl">
          Future skills <Highlight>powered by AI</Highlight>.
        </Display>
      </TypeRow>
      <TypeRow label="display-lg" sample="2.5 → 4rem">
        <Display size="lg">
          Future skills <Highlight>powered by AI</Highlight>.
        </Display>
      </TypeRow>
      <TypeRow label="display-md" sample="2 → 3rem">
        <Display size="md">Future skills powered by AI.</Display>
      </TypeRow>
    </div>

    <div className="mt-12">
      <Subhead>Heading</Subhead>
      <TypeRow label="h1" sample="2.25rem">
        <Heading level={1}>The fastest way to learn future skills.</Heading>
      </TypeRow>
      <TypeRow label="h2" sample="1.75rem">
        <Heading level={2}>The fastest way to learn future skills.</Heading>
      </TypeRow>
      <TypeRow label="h3" sample="1.375rem">
        <Heading level={3}>The fastest way to learn future skills.</Heading>
      </TypeRow>
      <TypeRow label="h4" sample="1.125rem">
        <Heading level={4}>The fastest way to learn future skills.</Heading>
      </TypeRow>
      <TypeRow label="h5" sample="1rem">
        <Heading level={5}>The fastest way to learn future skills.</Heading>
      </TypeRow>
    </div>

    <div className="mt-12">
      <Subhead>Body</Subhead>
      <TypeRow label="body-lg" sample="1.125rem">
        <Text size="lg">
          AI, Coding, Robotics &amp; 30+ skills under one parent account. Every active child has a separate paid seat.
        </Text>
      </TypeRow>
      <TypeRow label="body" sample="1rem">
        <Text>
          AI, Coding, Robotics &amp; 30+ skills under one parent account. Every active child has a separate paid seat.
        </Text>
      </TypeRow>
      <TypeRow label="body-sm" sample="0.875rem">
        <Text size="sm">
          One parent account, separate paid seats for each active learner.
        </Text>
      </TypeRow>
      <TypeRow label="caption" sample="0.8125rem">
        <Text size="xs">Skill-building, not screen time.</Text>
      </TypeRow>
      <TypeRow label="eyebrow" sample="0.75rem · tracked">
        <Eyebrow>Future Skills · Ages 6–16</Eyebrow>
      </TypeRow>
    </div>

    <div className="mt-12">
      <Subhead>Tone</Subhead>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Text>Default — primary reading color.</Text>
        <Text tone="muted">Muted — supporting copy and helper text.</Text>
        <Text tone="subtle">Subtle — meta, timestamps, low-priority labels.</Text>
        <Text tone="brand">Brand — used sparingly for emphasis.</Text>
        <div className="rounded-md bg-foreground p-4">
          <Text tone="inverted">Inverted — text on dark surfaces.</Text>
        </div>
      </div>
    </div>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Foundation · Radii / Elevation / Motion
   ────────────────────────────────────────────────────────────────── */

const RADII = [
  { name: "xs", className: "rounded-xs", value: "4px" },
  { name: "sm", className: "rounded-sm", value: "6px" },
  { name: "md", className: "rounded-md", value: "10px" },
  { name: "lg", className: "rounded-lg", value: "14px" },
  { name: "xl", className: "rounded-xl", value: "20px" },
  { name: "2xl", className: "rounded-2xl", value: "28px" },
  { name: "full", className: "rounded-full", value: "∞" },
];

const RadiiSection = () => (
  <Section
    id="radii"
    eyebrow="Foundation"
    title="Radii"
    description="Small components stay tight; large surfaces breathe. Use full only for pills and avatars."
  >
    <div className="grid grid-cols-3 gap-6 md:grid-cols-7">
      {RADII.map(({ name, className, value }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div className={cn("h-20 w-20 border border-border-strong bg-card", className)} />
          <div className="text-center">
            <Text size="sm" weight="medium">
              {name}
            </Text>
            <Text size="xs" tone="subtle" className="font-mono">
              {value}
            </Text>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const SHADOWS = [
  { name: "xs", className: "shadow-xs" },
  { name: "sm", className: "shadow-sm" },
  { name: "md", className: "shadow-md" },
  { name: "lg", className: "shadow-lg" },
  { name: "xl", className: "shadow-xl" },
];

const ElevationSection = () => (
  <Section
    id="elevation"
    eyebrow="Foundation"
    title="Elevation"
    description="Five steps. Cards default to xs; popovers and menus to md; modals to xl."
  >
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
      {SHADOWS.map(({ name, className }) => (
        <div key={name} className="flex flex-col items-center gap-4">
          <div className={cn("h-24 w-full rounded-lg border border-border bg-card", className)} />
          <Text size="sm" weight="medium">
            shadow-{name}
          </Text>
        </div>
      ))}
    </div>
  </Section>
);

const EASINGS = [
  { name: "out-quint", className: "ease-out-quint" },
  { name: "in-out-quint", className: "ease-in-out-quint" },
  { name: "spring", className: "ease-spring" },
];

const MotionSection = () => (
  <Section
    id="motion"
    eyebrow="Foundation"
    title="Motion"
    description="Hover any track to see the easing. Default duration is 220ms; reach for slower only on layout shifts."
  >
    <div className="space-y-6">
      {EASINGS.map(({ name, className }) => (
        <div key={name} className="group">
          <Text size="xs" tone="subtle" className="mb-2 font-mono">
            ease-{name}
          </Text>
          <div className="relative h-12 overflow-hidden rounded-md border border-border bg-card">
            <div
              style={{ "--track-distance": 7 }}
              className={cn(
                "absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 rounded-md bg-primary transition-transform duration-700 group-hover:translate-x-[calc(100%*var(--track-distance,8))]",
                className,
              )}
            />
          </div>
        </div>
      ))}
    </div>
    <Text size="sm" tone="muted" className="mt-6">
      Tokens · duration-instant 60ms · fast 140ms · base 220ms · slow 360ms
    </Text>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Primitives · Buttons
   ────────────────────────────────────────────────────────────────── */

const ButtonsSection = () => (
  <Section
    id="buttons"
    eyebrow="Primitive"
    title="Button"
    description="Mustard primary on black text. Outline secondary for the hero pair. Marketing sizes are pill-shaped."
  >
    <div className="flex flex-col gap-8">
      <div>
        <Subhead>Variants</Subhead>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div>
        <Subhead>Marketing</Subhead>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="marketingLg">Start Learning</Button>
          <Button size="marketingLg" variant="outline">
            For Schools
          </Button>
          <Button size="marketing">Get Started</Button>
          <Button size="marketing" variant="outline">
            Talk to Sales
          </Button>
        </div>
      </div>

      <div>
        <Subhead>Sizes</Subhead>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button>Default</Button>
          <Button size="lg">LG</Button>
          <Button size="marketing">Marketing</Button>
          <Button size="marketingLg">Marketing LG</Button>
        </div>
      </div>
    </div>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Primitives · Cards (incl. plan-card variants)
   ────────────────────────────────────────────────────────────────── */

const CardsSection = () => (
  <Section
    id="cards"
    eyebrow="Primitive"
    title="Card"
    description="Default for content. `tinted` for the B2C plan (this-is-the-choice card). `highlighted` for the B2B Pro popular plan."
  >
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Default card</CardTitle>
          <CardDescription>Standard content surface.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text size="sm">
            Used for everything that isn&apos;t a pricing plan — feature blocks, dashboards, lists.
          </Text>
        </CardContent>
      </Card>

      <Card tone="tinted">
        <CardHeader>
          <CardTitle>Tinted · B2C plan</CardTitle>
          <CardDescription>Soft mustard surface, mustard border.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text size="sm">
            The single highlighted parent plan. Reads as the obvious primary choice.
          </Text>
        </CardContent>
      </Card>

      <Card tone="highlighted" className="relative">
        <Badge variant="popular" className="absolute right-4 top-4">
          Most Popular
        </Badge>
        <CardHeader>
          <CardTitle>Highlighted · B2B Pro</CardTitle>
          <CardDescription>Mustard border, lifted shadow, popular badge.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text size="sm">
            The recommended school plan. Stands out next to the basic option without competing for attention with the rest of the page.
          </Text>
        </CardContent>
      </Card>
    </div>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Primitives · Stepper
   ────────────────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  { label: "Choose a plan", description: "Pick the right subscription for your child or school." },
  { label: "Select courses", description: "Browse 30+ skills across AI, coding, and robotics." },
  { label: "Learn with AI", description: "Personalized guidance, quizzes, and project codes." },
  { label: "Track progress", description: "Parent dashboard, certificates, and performance insights." },
];

const StepperSection = () => (
  <Section
    id="stepper"
    eyebrow="Primitive"
    title="Stepper"
    description="Horizontal four-step on desktop, stacked on mobile. Mustard fills steps up to and including `activeIndex`."
  >
    <Stepper steps={HOW_IT_WORKS} activeIndex={1} />
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Primitives · Feature grid
   ────────────────────────────────────────────────────────────────── */

const FEATURES = [
  { icon: Bot, title: "AI Trainer", description: "An AI mentor that answers questions, gives feedback, and adapts to your child's pace." },
  { icon: Layers, title: "30+ Future Skills", description: "AI, coding, robotics, freelancing — one subscription covers all of them." },
  { icon: GraduationCap, title: "Project-Based Learning", description: "Every lecture ships with project code so kids build, not just watch." },
  { icon: LineChart, title: "Parent Dashboard", description: "Track progress, manage child profiles, and see real performance insights." },
  { icon: Award, title: "Recognized Certificates", description: "International e-certificates kids can show off and add to a portfolio." },
  { icon: Smartphone, title: "Any Device", description: "Mobile, tablet, desktop — learning continues wherever your child is." },
];

const FeaturesSection = () => (
  <Section
    id="features"
    eyebrow="Primitive"
    title="Feature card"
    description="Outline icon turns mustard on hover. The whole card lifts a subtle shadow."
  >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Primitives · Stat / BillingToggle / FAQ / Inverse
   ────────────────────────────────────────────────────────────────── */

const StatSection = () => (
  <Section
    id="stat"
    eyebrow="Primitive"
    title="Trust stat"
    description="Bold display number, mustard underline, muted label. Composes into a 3-up trust band."
  >
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      <Stat value="150,000+" label="Students learning today" />
      <Stat value="140+" label="Schools partnered worldwide" />
      <Stat value="30+" label="Future skills in one subscription" />
    </div>
  </Section>
);

const BillingToggleSection = () => {
  const [cycle, setCycle] = useState("annual");
  return (
    <Section
      id="billing-toggle"
      eyebrow="Primitive"
      title="Billing toggle"
      description="Shared between B2C and B2B pricing. Optional savings pill on the annual side."
    >
      <div className="flex flex-col items-start gap-4">
        <BillingToggle value={cycle} onChange={setCycle} savingsLabel="Save 60%" />
        <Text size="sm" tone="muted">
          Selected: <span className="font-mono">{cycle}</span>
        </Text>
      </div>
    </Section>
  );
};

const FAQ_ITEMS = [
  { question: "Who can join Robotronics.ai?", answer: "Any child aged 6–16. Parents create the account and add child profiles for each kid in the household." },
  { question: "What devices do we need?", answer: "Anything with a modern browser — mobile, tablet, or desktop. No special hardware required to get started." },
  { question: "How does the AI trainer work?", answer: "It walks your child through lessons, answers questions, and quizzes them after each module so the learning actually sticks." },
  { question: "Can I track my child's progress?", answer: "Yes — the parent dashboard shows time spent, courses completed, certificates earned, and personalized performance insights." },
];

const FaqSection = () => (
  <Section
    id="faq"
    eyebrow="Primitive"
    title="FAQ accordion"
    description="Native `<details>` for accessibility. The plus rotates 45° and turns mustard when open."
  >
    <FaqAccordion items={FAQ_ITEMS} />
  </Section>
);

const InverseSection = () => (
  <Section
    id="inverse"
    eyebrow="Primitive"
    title="Inverse band"
    description="The dark surface for the final CTA and footer. Mustard CTA on black creates the high-contrast moment the brand brief calls out."
  >
    <SectionInverse className="rounded-2xl px-8 py-16 md:px-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Turn screen time into <Highlight>skill time</Highlight>.
        </Heading>
        <Text size="lg" className="text-background/80">
          AI, Coding, Robotics, and clear paid seats for every active learner.
        </Text>
        <Button size="marketingLg">Start Learning Now</Button>
      </div>
    </SectionInverse>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────── */

const StyleGuide = () => (
  <Shell>
    <header className="max-w-3xl">
      <Eyebrow>Robotronics · Design System</Eyebrow>
      <Display size="lg" className="mt-4">
        Foundation
      </Display>
      <Text size="lg" tone="muted" className="mt-5">
        White, black, and mustard. One typeface. Everything else composes from the tokens and primitives below — no one-off colors, no one-off type sizes.
      </Text>
    </header>

    <ColorSection />
    <TypographySection />
    <RadiiSection />
    <ElevationSection />
    <MotionSection />
    <ButtonsSection />
    <CardsSection />
    <StepperSection />
    <FeaturesSection />
    <StatSection />
    <BillingToggleSection />
    <FaqSection />
    <InverseSection />
  </Shell>
);

export default StyleGuide;
