import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Magnet } from "@/components/ui/magnet";
import { RotatingText } from "@/components/ui/rotating-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { HeroBuildLab } from "./visuals/HeroBuildLab";

const MarkerUnderline = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 220 18"
    preserveAspectRatio="none"
    className={cn(
      "pointer-events-none block h-3 w-full text-primary",
      className,
    )}
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

const HERO_STEPS = ["Choose a plan", "Select courses", "Learn with AI", "Track progress"];

const HeroStepStrip = () => (
  <ol
    aria-label="How it works"
    className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-sm"
  >
    {HERO_STEPS.map((label, index) => (
      <li key={label} className="flex items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-caption font-semibold text-primary-foreground">
          {index + 1}
        </span>
        <span className="font-medium text-foreground">{label}</span>
        {index < HERO_STEPS.length - 1 && (
          <ChevronRight aria-hidden="true" className="size-3.5 text-border" />
        )}
      </li>
    ))}
  </ol>
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

const HeroVideo = ({ src }) => (
  <div className="relative flex aspect-[4/5] w-full overflow-hidden rounded-3xl bg-primary lg:aspect-auto lg:h-[34rem]">
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Product demo"
      className="size-full object-cover"
    />
  </div>
);

HeroVideo.propTypes = {
  src: PropTypes.string.isRequired,
};

const HeroVisual = () => {
  const videoUrl = import.meta.env.VITE_HERO_VIDEO_URL;
  return videoUrl ? <HeroVideo src={videoUrl} /> : <HeroBuildLab />;
};

export const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-background pt-header pb-16 md:pb-20">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20"
    >
      <div
        className="absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-25 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
    </div>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
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

    <Container size="wide">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center lg:gap-14 xl:gap-16">
        <div className="flex min-w-0 flex-col items-start justify-center gap-5">
          <h1 className="font-sans font-extrabold tracking-[-0.035em] text-foreground text-balance text-[clamp(2.75rem,4.8vw+1rem,5.5rem)] leading-[0.96] max-w-2xl">
            <ShinyText>Future skills</ShinyText>
            <span className="block">for your child,</span>
            <span className="block">
              powered by{" "}
              <span className="relative inline-block whitespace-nowrap">
                <RotatingText
                  words={["AI", "robotics", "coding"]}
                  className="text-primary"
                  decoration={<MarkerUnderline />}
                  decorationClassName="-bottom-1"
                />
              </span>
              .
            </span>
          </h1>

          <Text size="lg" tone="muted" className="max-w-lg">
            AI, coding, and robotics for every child. One parent account,
            separate paid seats.
          </Text>

          <HeroStepStrip />

          <div className="flex flex-wrap items-center gap-3">
            <Magnet>
              <Button asChild size="marketingLg" className="group/cta gap-2.5">
                <Link to="/subscriptions">
                  Start learning
                  <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </Button>
            </Magnet>
            <Button asChild size="marketingLg" variant="outline">
              <Link to="/for-schools">For schools</Link>
            </Button>
          </div>

          <RatingRow />

          <dl className="mt-1 flex flex-wrap items-start gap-x-12 gap-y-5 border-t border-border pt-6">
            <TrustItem
              value={<CountUp to={150000} suffix="+" />}
              label="Kids learning"
            />
            <TrustItem
              value={<CountUp to={140} suffix="+" />}
              label="Partner schools"
            />
            <TrustItem value="Global" label="Access" />
          </dl>
        </div>

        <div className="flex min-w-0 w-full justify-center lg:justify-end">
          <div className="w-full min-w-0 max-w-md lg:max-w-[40rem]">
            <HeroVisual />
          </div>
        </div>
      </div>
    </Container>
  </section>
);
