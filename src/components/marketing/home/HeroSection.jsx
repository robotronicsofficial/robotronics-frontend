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

/* A miniature parent-dashboard mock — keeps the hero anchored to a
   concrete product image instead of stock art. Pure tokens, no images. */
const DashboardMock = () => (
  <div
    aria-hidden="true"
    className="relative w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg"
  >
    <div className="flex items-center gap-3 border-b border-border pb-4">
      <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground text-body-sm font-semibold">
        AY
      </div>
      <div className="flex flex-col">
        <span className="text-body-sm font-semibold text-foreground">Ayan&apos;s progress</span>
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
            12 <span className="text-body-sm font-medium text-muted-foreground">days</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HeroSection = () => (
  <section className="bg-background pt-header pb-20 md:pb-28">
    <Container size="wide">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <Eyebrow>Future Skills · Ages 6–16</Eyebrow>
          <Display size="xl" className="max-w-xl">
            Future skills for your child,{" "}
            <Highlight>powered by AI</Highlight>.
          </Display>
          <Text size="lg" tone="muted" className="max-w-lg">
            AI, Coding, Robotics &amp; 30+ skills — all in one simple subscription. Like Netflix, but for learning.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="marketingLg">
              <Link to="/subscriptions">Start Learning</Link>
            </Button>
            <Button asChild size="marketingLg" variant="outline">
              <Link to="/contactUs">For Schools</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DashboardMock />
        </div>
      </div>
    </Container>
  </section>
);
