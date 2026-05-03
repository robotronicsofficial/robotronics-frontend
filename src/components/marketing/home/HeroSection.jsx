import { Link } from "@tanstack/react-router";
import {
  Award,
  ArrowRight,
  Code2,
  Cpu,
  Globe2,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight, Text } from "@/components/ui/typography";

/* Hand-marker scribble used to underline a single keyword in the headline.
   Brief calls for keyword highlights in mustard; this is the warmer take
   than a flat color swap. */
const MarkerUnderline = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 220 18"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-primary"
  >
    <path
      d="M3 11 C 40 4, 80 14, 120 7 S 200 11, 217 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

/* Live activity pill — pulsing mustard dot + parent count. Replaces the
   plain eyebrow so the hero opens with momentum, not a label. */
const LivePill = () => (
  <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 py-1.5 pr-4 pl-2 shadow-xs backdrop-blur">
    <span className="relative grid size-5 place-items-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
      <span className="relative size-2 rounded-full bg-primary" />
    </span>
    <span className="text-caption font-medium text-foreground">
      <span className="font-semibold">2,148 kids</span>{" "}
      <span className="text-muted-foreground">learning right now</span>
    </span>
  </div>
);

/* Inline rating row that sits beneath the CTAs — cheap, high-signal trust. */
const RatingRow = () => (
  <div className="flex flex-wrap items-center gap-3">
    <div className="flex items-center gap-0.5 text-primary">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
    <span className="text-body-sm text-muted-foreground">
      <span className="font-semibold text-foreground">4.9</span> from 12,000+
      parent reviews
    </span>
  </div>
);

/* Floating skill chip — stamp-style pills that orbit the dashboard mock to
   communicate the "30+ skills" promise without a list. Each takes an
   absolute position so the parent controls the scatter. */
const SkillChip = ({ icon: Icon, label, className }) => (
  <div
    className={`absolute hidden items-center gap-1.5 rounded-full border border-border bg-card py-1.5 pr-3 pl-2 text-caption font-semibold text-foreground shadow-sm md:inline-flex ${className}`}
  >
    <span className="grid size-5 place-items-center rounded-full bg-primary-soft text-primary">
      <Icon className="size-3" />
    </span>
    {label}
  </div>
);

/* Course tile — sits in front of the dashboard mock at bottom-left so the
   stack reads as three distinct surfaces. */
const CourseTile = () => (
  <div
    aria-hidden="true"
    className="absolute -bottom-8 -left-6 hidden w-48 -rotate-[3deg] rounded-2xl border border-border bg-card p-3 shadow-lg sm:block"
  >
    <div className="flex aspect-video items-center justify-center rounded-xl bg-primary-soft">
      <Sparkles className="size-7 text-primary" />
    </div>
    <div className="mt-3 flex flex-col gap-0.5">
      <span className="text-body-sm font-semibold text-foreground">
        Block coding 101
      </span>
      <span className="text-caption text-muted-foreground">
        Lesson 4 · 6 min
      </span>
    </div>
  </div>
);

/* Certificate badge — small medallion at top-right of the dashboard. Kept
   compact so it accents the corner instead of competing with the main card. */
const CertificateBadge = () => (
  <div
    aria-hidden="true"
    className="absolute -right-6 -top-5 hidden w-52 rotate-[5deg] items-center gap-2.5 rounded-2xl border border-primary/30 bg-card p-3 shadow-md md:flex"
  >
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
      <Award className="size-4" />
    </span>
    <div className="flex min-w-0 flex-col">
      <span className="text-body-sm font-semibold text-foreground">
        Certificate earned
      </span>
      <span className="text-caption text-muted-foreground">
        AI Foundations · L1
      </span>
    </div>
  </div>
);

/* Parent-dashboard mock — the load-bearing image for the hero. */
const DashboardMock = () => (
  <div
    aria-hidden="true"
    className="relative w-full max-w-md rounded-3xl border border-border bg-card p-5 shadow-xl"
  >
    <div className="flex items-center gap-3 border-b border-border pb-4">
      <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground text-body-sm font-semibold">
        AY
      </div>
      <div className="flex flex-col">
        <span className="text-body-sm font-semibold text-foreground">
          Ayan&apos;s progress
        </span>
        <span className="text-caption text-muted-foreground">
          Week of May 2
        </span>
      </div>
      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-caption font-semibold text-primary-hover">
        <span className="size-1.5 rounded-full bg-primary" />
        Live
      </span>
    </div>

    <div className="mt-5 flex flex-col gap-4">
      <div className="rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 text-body-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          AI Foundations · Module 3
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
        <div className="mt-2 flex items-center justify-between text-caption text-muted-foreground">
          <span>8 of 12 lessons</span>
          <span className="font-medium text-foreground">67%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <Award className="size-3.5" />
            Certificates
          </div>
          <div className="mt-1 text-h4 font-bold text-foreground">4</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <TrendingUp className="size-3.5" />
            Streak
          </div>
          <div className="mt-1 text-h4 font-bold text-foreground">
            12{" "}
            <span className="text-body-sm font-medium text-muted-foreground">
              days
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrustItem = ({ value, label }) => (
  <div className="flex flex-col gap-2">
    <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-primary" />
    <span className="text-h3 font-bold text-foreground">{value}</span>
    <span className="text-caption uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
  </div>
);

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-background pt-header pb-24 md:pb-32">
    {/* Atmosphere — layered mustard glow, soft dot grid, and a faint starburst
        behind the visual. Brief reads "minimal" but the page also has to feel
        alive; these all run at low opacity so mustard stays a highlight, not
        a wash. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className="absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>

    <Container size="wide">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-7">
          <LivePill />

          <h1 className="font-sans font-extrabold tracking-[-0.035em] text-foreground text-balance text-[clamp(3rem,6vw+1rem,6.5rem)] leading-[0.95] max-w-2xl">
            <Highlight>Future skills</Highlight>
            <span className="block">for your child,</span>
            <span className="block">
              powered by{" "}
              <span className="relative inline-block whitespace-nowrap">
                AI
                <MarkerUnderline />
              </span>
              .
            </span>
          </h1>

          <Text size="lg" tone="muted" className="max-w-lg">
            AI, coding, robotics &amp; 30+ skills, all in one simple
            subscription. Like Netflix, but for learning.
          </Text>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="marketingLg" className="group/cta gap-2.5">
              <Link to="/subscriptions">
                Start learning
                <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="marketingLg" variant="outline">
              <Link to="/contactUs">For schools</Link>
            </Button>
          </div>

          <RatingRow />

          <dl className="mt-2 flex flex-wrap items-start gap-x-12 gap-y-6 border-t border-border pt-8">
            <TrustItem value="150,000+" label="Kids learning" />
            <TrustItem value="140+" label="Partner schools" />
            <TrustItem value="Global" label="Access" />
          </dl>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative isolate w-full max-w-md">
            {/* Skill chips that orbit the dashboard mock — proof of breadth
                without listing all 30 skills here. */}
            <SkillChip
              icon={Cpu}
              label="AI"
              className="-left-10 top-12 -rotate-[6deg]"
            />
            <SkillChip
              icon={Code2}
              label="Coding"
              className="-right-12 top-1/2 rotate-[8deg]"
            />
            <SkillChip
              icon={Globe2}
              label="Robotics"
              className="-left-4 -bottom-2 rotate-[3deg]"
            />

            <CertificateBadge />
            <DashboardMock />
            <CourseTile />
          </div>
        </div>
      </div>
    </Container>
  </section>
);
