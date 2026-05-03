import { Link } from "@tanstack/react-router";
import { Award, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";

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

/* Tiny course tile that sits in front of the dashboard mock. Adds a third
   product surface so the hero shows abundance, not a lone card. */
const CourseTile = () => (
  <div
    aria-hidden="true"
    className="absolute -bottom-6 -left-6 hidden w-44 -rotate-[3deg] rounded-2xl border border-border bg-card p-3 shadow-lg sm:block"
  >
    <div className="flex aspect-video items-center justify-center rounded-xl bg-primary-soft">
      <Sparkles className="size-6 text-primary" />
    </div>
    <div className="mt-2.5 flex flex-col gap-1">
      <span className="text-caption font-semibold text-foreground">
        Block coding 101
      </span>
      <span className="text-caption text-muted-foreground">Lesson 4 · 6 min</span>
    </div>
  </div>
);

/* Certificate ribbon offset behind the main card. Softens the right column
   and proves the "earn certificates" feature without a stat card. */
const CertificateRibbon = () => (
  <div
    aria-hidden="true"
    className="absolute -right-4 -top-6 hidden w-56 rotate-[5deg] rounded-2xl border border-primary/30 bg-card p-4 shadow-md md:block"
  >
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
        <Award className="size-4" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-caption font-semibold text-foreground">
          AI Foundations
        </span>
        <span className="text-caption text-muted-foreground">
          Certificate earned
        </span>
      </div>
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
        <span className="text-caption text-muted-foreground">Week of May 2</span>
      </div>
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
  <div className="flex flex-col">
    <span className="text-h4 font-bold text-foreground">{value}</span>
    <span className="text-caption uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
  </div>
);

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-background pt-header pb-20 md:pb-28">
    {/* Atmosphere — soft mustard radial glow + faint dot grid. Kept low-opacity
        so the brand rule "don't overuse mustard" holds. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className="absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
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
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-7">
          <Eyebrow>Future Skills · Ages 6–16</Eyebrow>

          <Display size="xl" className="max-w-xl">
            <Highlight>Future skills</Highlight> for your child, powered by{" "}
            <span className="relative inline-block whitespace-nowrap">
              AI
              <MarkerUnderline />
            </span>
            .
          </Display>

          <Text size="lg" tone="muted" className="max-w-lg">
            AI, coding, robotics &amp; 30+ skills, all in one simple
            subscription. Like Netflix, but for learning.
          </Text>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="marketingLg">
              <Link to="/subscriptions">Start learning</Link>
            </Button>
            <Button asChild size="marketingLg" variant="outline">
              <Link to="/contactUs">For schools</Link>
            </Button>
          </div>

          <dl className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-6">
            <TrustItem value="150,000+" label="Kids learning" />
            <TrustItem value="140+" label="Partner schools" />
            <TrustItem value="Global" label="Access" />
          </dl>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative isolate">
            <CertificateRibbon />
            <DashboardMock />
            <CourseTile />
          </div>
        </div>
      </div>
    </Container>
  </section>
);
