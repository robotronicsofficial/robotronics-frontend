import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { DitherBackdrop } from "@/components/ui/dither-backdrop";
import { Magnet } from "@/components/ui/magnet";
import { RotatingText } from "@/components/ui/rotating-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/* Hand-marker scribble used to underline a single keyword. Default mustard
   under the headline keyword on the left; re-colored to black under
   `builders` on the right. Same SVG, two paint jobs — a tiny brand pattern
   that ties the two halves together. */
const MarkerUnderline = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 220 18"
    preserveAspectRatio="none"
    className={cn(
      "pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-primary",
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

/* Compact 4-step strip — surfaces the program flow on first paint so a
   visitor sees how short the path to value is before scrolling. The full
   HowItWorksSection below repeats each step with its description. */
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

/* Editorial poster — drenched mustard ground, static multi-line claim.
   Type bottom-anchored to the block (justify-end) so the empty top reads
   as deliberate negative space, the way a magazine cover does. Marker
   squiggle echoed under `builders` mirrors the squiggle on the left
   headline, turning a one-off ornament into a brand pattern. */
const HeroPoster = () => (
  <div className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground lg:aspect-auto lg:h-full lg:min-h-[36rem] lg:p-12">
    <h2 className="font-sans font-black tracking-[-0.04em] text-primary-foreground leading-[0.88] text-[clamp(3.25rem,10vw,9rem)]">
      The new
      <br />
      <span className="relative inline-block">
        builders
        <MarkerUnderline className="-bottom-3 h-5 text-primary-foreground" />
      </span>
      .
    </h2>
  </div>
);

/* Product demo video — same frame as HeroPoster so swapping doesn't shift
   layout. Falls back to the poster when no URL is configured. Mustard
   ground stays during load; the video itself sits muted/looping/inline
   so it works on iOS and won't grab audio focus. */
const HeroVideo = ({ src }) => (
  <div className="relative flex aspect-[4/5] w-full overflow-hidden rounded-3xl bg-primary lg:aspect-auto lg:h-full lg:min-h-[36rem]">
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
  return videoUrl ? <HeroVideo src={videoUrl} /> : <HeroPoster />;
};

export const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-background pt-header pb-24 md:pb-32">
    {/* Atmosphere — three layers, lightest in front:
        1. Dither shader (z-30 below page): subtle mustard grain across the
           whole hero. Lazy-loaded, paused off-screen.
        2. Mustard radial glows: warm light bias toward the visual side.
        3. Dot grid: gentle structure to anchor the typography column.
       Mustard stays a highlight, not a wash. */}
    <DitherBackdrop className="-z-30" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20"
    >
      <div
        className="absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
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
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-stretch lg:gap-20">
        <div className="flex flex-col items-start justify-center gap-7">
          <h1 className="font-sans font-extrabold tracking-[-0.035em] text-foreground text-balance text-[clamp(3rem,6vw+1rem,6.5rem)] leading-[0.95] max-w-2xl">
            <ShinyText>Future skills</ShinyText>
            <span className="block">for your child,</span>
            <span className="block">
              powered by{" "}
              <span className="relative inline-block whitespace-nowrap">
                <RotatingText
                  words={["AI", "robotics", "coding"]}
                  className="text-primary"
                />
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
            <Magnet>
              <Button asChild size="marketingLg" className="group/cta gap-2.5">
                <Link to="/subscriptions">
                  Start learning
                  <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </Button>
            </Magnet>
            <Button asChild size="marketingLg" variant="outline">
              <Link to="/contactUs">For schools</Link>
            </Button>
          </div>

          <RatingRow />

          <HeroStepStrip />

          <dl className="mt-2 flex flex-wrap items-start gap-x-12 gap-y-6 border-t border-border pt-8">
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

        <div className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-md lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </Container>
  </section>
);
