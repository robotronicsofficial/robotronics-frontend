import { Award, BookOpen, Sparkles, TrendingUp, Users } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* A second, larger dashboard preview composed entirely of tokens.
   Lives between pricing and the trust band to show parents what they
   actually get inside the product. No screenshots — purely UI primitives
   so it always looks correct under brand changes. */

const ChildRow = ({ initials, name, badge, progress }) => (
  <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-body-sm font-semibold">
      {initials}
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-body-sm font-semibold text-foreground">
          {name}
        </span>
        <span className="text-caption text-muted-foreground">{badge}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

const StatTile = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-caption text-muted-foreground">
      <Icon className="size-3.5" />
      {label}
    </div>
    <div className="text-h3 font-bold text-foreground">{value}</div>
  </div>
);

export const DashboardPreviewSection = () => (
  <section className="bg-background py-20 md:py-28">
    <Container size="wide">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>Parent dashboard</Eyebrow>
          <Heading level={2} className="text-display-md">
            See exactly what your child is learning.
          </Heading>
          <Text size="lg" tone="muted">
            Track progress, manage every child profile from a single account, and watch certificates roll in. No more guessing what happened during screen time.
          </Text>
          <ul className="mt-2 flex flex-col gap-3 text-body-sm text-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              Real-time progress per child, per course
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              Certificates and project portfolio in one place
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              Performance insights that flag what to work on next
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex flex-col">
              <span className="text-body-sm font-semibold text-foreground">
                Family overview
              </span>
              <span className="text-caption text-muted-foreground">
                3 active learners
              </span>
            </div>
            <div className="rounded-full bg-primary-soft px-3 py-1 text-caption font-semibold text-primary">
              All-in-One Plan
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <ChildRow initials="AY" name="Ayan · AI Foundations" badge="67%" progress={67} />
            <ChildRow initials="ZR" name="Zara · Robotics 101" badge="42%" progress={42} />
            <ChildRow initials="HM" name="Hamza · Coding Basics" badge="91%" progress={91} />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatTile icon={Award} label="Certificates" value="12" />
            <StatTile icon={BookOpen} label="Courses" value="8" />
            <StatTile icon={TrendingUp} label="Streak" value="21d" />
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary bg-primary-soft p-4">
            <Sparkles className="size-5 shrink-0 text-primary" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-body-sm font-semibold text-foreground">
                AI suggestion for Zara
              </span>
              <span className="text-caption text-muted-foreground">
                Try the &ldquo;Build a sumo bot&rdquo; project — it builds on her last module.
              </span>
            </div>
            <Users className="size-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>
    </Container>
  </section>
);
