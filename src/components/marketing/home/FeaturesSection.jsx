import { Award, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { GlareHover } from "@/components/ui/glare-hover";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Mustard scribble underline. Echoes the hand-marker treatment used in
   HeroSection so the feature section reads as the same brand voice. */
const MarkerUnderline = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 220 18"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full text-primary"
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

/* Skill chips. The four mustard pillars carry brand weight; neutrals are the
   breadth proof. The dashed "+18 more" tile signals depth without listing all 30. */
const SKILLS = [
  { label: "AI fundamentals", featured: true },
  { label: "Block coding" },
  { label: "Python" },
  { label: "Robotics", featured: true },
  { label: "Web design" },
  { label: "Game dev" },
  { label: "App building" },
  { label: "Machine learning", featured: true },
  { label: "3D modelling" },
  { label: "Freelancing", featured: true },
  { label: "Data viz" },
  { label: "Cybersecurity" },
];

/* Cell shell. Centralizes the bento card chrome so the six cells share one
   resting silhouette and we vary content, not packaging. GlareHover adds a
   cursor-following warm glow on hover — soft-light blend so it tints the
   surface without obscuring text or fighting inner decorations. */
const Cell = ({ className = "", children }) => (
  <GlareHover
    as="article"
    className={`flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 lg:p-8 ${className}`}
  >
    {children}
  </GlareHover>
);

/* AI Trainer — the load-bearing card. Real chat preview replaces a bullet point
   so the differentiator is shown, not described. */
const AiTrainerCell = () => (
  <Cell className="lg:col-span-7">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
      style={{
        background:
          "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
      }}
    />

    <div className="relative flex flex-col gap-2">
      <Heading level={3} className="text-h3">
        AI Trainer
      </Heading>
      <Text size="md" tone="muted" className="max-w-md">
        An AI mentor that answers your child&apos;s questions, gives feedback,
        and adapts to their pace.
      </Text>
    </div>

    <div className="relative mt-2 flex flex-col gap-3">
      <div className="flex items-end gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-body-sm font-semibold text-foreground">
          A
        </span>
        <div className="max-w-[20rem] rounded-2xl rounded-bl-md border border-border bg-background px-4 py-2.5">
          <p className="text-body-sm text-foreground">
            Why won&apos;t my robot turn left?
          </p>
        </div>
      </div>

      <div className="flex items-end justify-end gap-2.5">
        <div className="max-w-[24rem] rounded-2xl rounded-br-md bg-primary-soft px-4 py-2.5">
          <p className="text-body-sm text-foreground">
            Your{" "}
            <code className="rounded bg-card px-1 font-mono text-caption">
              motor.left()
            </code>{" "}
            speed is 0. Try{" "}
            <code className="rounded bg-card px-1 font-mono text-caption">
              motor.left(80)
            </code>{" "}
            and run it again. Want me to walk through why?
          </p>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-body-sm font-bold text-primary-foreground">
          AI
        </span>
      </div>

      <div className="ml-10 mt-1 flex items-center gap-1.5 text-caption text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60" />
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:160ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60 [animation-delay:320ms]" />
        <span className="ml-1">Ayan is typing</span>
      </div>
    </div>
  </Cell>
);

/* Project-Based — code preview proves "build, don't just watch". */
const ProjectBasedCell = () => (
  <Cell className="lg:col-span-5">
    <div className="flex flex-col gap-2">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary-soft px-2.5 py-1 text-caption font-semibold text-foreground">
        <CheckCircle2 className="size-3.5 text-primary" /> Ships with code
      </span>
      <Heading level={3} className="text-h3">
        Project-Based Learning
      </Heading>
      <Text size="md" tone="muted">
        Every lecture ships with project code so kids build real things, not
        just watch videos.
      </Text>
    </div>

    <div
      aria-hidden="true"
      className="mt-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-caption leading-relaxed text-neutral-100 shadow-md"
    >
      <div className="flex items-center gap-1.5 pb-3 text-neutral-500">
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="ml-2 text-caption">robot.py</span>
      </div>
      <pre className="overflow-hidden whitespace-pre">
        <span className="text-neutral-500">{`# drive forward until something is in the way\n`}</span>
        <span className="text-brand-300">{`while`}</span>
        <span>{` sensor.distance() `}</span>
        <span className="text-brand-300">{`>`}</span>
        <span>{` 30:\n  motor.forward(speed=`}</span>
        <span className="text-brand-300">{`80`}</span>
        <span>{`)\nmotor.stop()`}</span>
      </pre>
    </div>
  </Cell>
);

/* 30+ Skills — chip cloud is the most efficient way to show breadth and
   beat the "make 30 cards" reflex. */
const SkillsCell = () => (
  <Cell className="lg:col-span-7">
    <div className="flex flex-col gap-2">
      <Heading level={3} className="text-h3">
        <span>30+</span>{" "}
        <span className="relative inline-block whitespace-nowrap">
          future skills
          <MarkerUnderline />
        </span>
      </Heading>
      <Text size="md" tone="muted" className="max-w-md">
        AI, coding, robotics, freelancing. One subscription unlocks all of them.
      </Text>
    </div>

    <ul className="flex flex-wrap gap-2">
      {SKILLS.map(({ label, featured }) => (
        <li
          key={label}
          className={
            featured
              ? "rounded-full bg-primary px-3.5 py-1.5 text-caption font-semibold text-primary-foreground"
              : "rounded-full border border-border bg-background px-3.5 py-1.5 text-caption font-medium text-foreground"
          }
        >
          {label}
        </li>
      ))}
      <li className="rounded-full border border-dashed border-border-strong px-3.5 py-1.5 text-caption font-medium text-muted-foreground">
        +18 more
      </li>
    </ul>
  </Cell>
);

/* Parent Dashboard — mini week chart so the parent buyer sees the artifact. */
const DashboardCell = () => {
  const days = [
    { d: "M", h: 55 },
    { d: "T", h: 80 },
    { d: "W", h: 40 },
    { d: "T", h: 92, peak: true },
    { d: "F", h: 70 },
    { d: "S", h: 30 },
    { d: "S", h: 60 },
  ];

  return (
    <Cell className="lg:col-span-5">
      <div className="flex flex-col gap-2">
        <Heading level={3} className="text-h3">
          Parent Dashboard
        </Heading>
        <Text size="md" tone="muted">
          Track progress, manage child profiles, and see what your kid actually
          learned.
        </Text>
      </div>

      <div
        aria-hidden="true"
        className="mt-auto flex flex-col gap-3 rounded-2xl border border-border bg-secondary/40 p-4"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
            This week
          </span>
          <span className="text-body-sm font-semibold text-foreground">
            4h 12m
          </span>
        </div>
        <div className="flex h-24 items-end gap-2">
          {days.map(({ d, h, peak }, i) => (
            <div
              key={`${d}-${i}`}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <div
                className={`w-full rounded-md ${
                  peak ? "bg-primary" : "bg-foreground/15"
                }`}
                style={{ height: `${h}%` }}
              />
              <span className="text-caption text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </Cell>
  );
};

/* Recognized Certificates — stacked overlapping ribbons signal "real, multiple,
   earned" without the AI-cliché single trophy badge. */
const CertificatesCell = () => (
  <Cell className="lg:col-span-6">
    <div className="flex flex-col gap-2">
      <Heading level={3} className="text-h3">
        Recognized Certificates
      </Heading>
      <Text size="md" tone="muted" className="max-w-sm">
        International e-certificates kids earn as they finish modules. Proof,
        not participation.
      </Text>
    </div>

    <div
      aria-hidden="true"
      className="relative mt-auto h-36 w-full"
    >
      <div className="absolute bottom-0 right-[40%] w-44 -rotate-[8deg] rounded-2xl border border-border bg-secondary/60 p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full border border-border bg-card">
            <Award className="size-3.5 text-muted-foreground" />
          </span>
          <span className="truncate text-caption font-semibold text-foreground">
            Block Coding 1
          </span>
        </div>
      </div>
      <div className="absolute bottom-4 right-[18%] w-48 -rotate-[2deg] rounded-2xl border border-border bg-card p-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-foreground text-background">
            <Award className="size-3.5" />
          </span>
          <span className="truncate text-caption font-semibold text-foreground">
            Robotics Foundations
          </span>
        </div>
      </div>
      <div className="absolute bottom-9 right-0 w-52 rotate-[4deg] rounded-2xl border border-primary/40 bg-card p-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <Award className="size-4" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-caption font-semibold text-foreground">
              AI Foundations
            </span>
            <span className="text-caption text-muted-foreground">
              Earned May 2
            </span>
          </div>
        </div>
      </div>
    </div>
  </Cell>
);

/* Any Device — three hand-built device shapes. Generic Smartphone icon would
   read as AI-template; building the silhouettes ourselves looks intentional. */
const AnyDeviceCell = () => (
  <Cell className="lg:col-span-6">
    <div className="flex flex-col gap-2">
      <Heading level={3} className="text-h3">
        Any Device
      </Heading>
      <Text size="md" tone="muted" className="max-w-sm">
        Mobile, tablet, desktop. Learning continues wherever your child is.
      </Text>
    </div>

    <div aria-hidden="true" className="mt-auto flex h-36 items-end justify-end gap-3">
      <div className="flex h-28 w-14 flex-col gap-1.5 rounded-xl border border-border bg-background p-1.5 shadow-sm">
        <div className="h-1.5 rounded bg-foreground/15" />
        <div className="h-1.5 rounded bg-foreground/10" />
        <div className="mt-auto h-3 rounded bg-primary" />
      </div>

      <div className="flex h-32 w-24 flex-col gap-2 rounded-xl border border-border bg-background p-2 shadow-md">
        <div className="h-3 rounded bg-foreground/15" />
        <div className="h-2 rounded bg-foreground/10" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 rounded bg-foreground/10" />
          <div className="h-6 rounded bg-primary" />
        </div>
        <div className="mt-auto h-3 rounded bg-foreground/10" />
      </div>

      <div className="flex flex-col items-stretch">
        <div className="flex h-24 w-44 flex-col gap-2 rounded-t-xl border border-b-0 border-border bg-background p-2 shadow-md">
          <div className="h-3 rounded bg-foreground/15" />
          <div className="grid grid-cols-3 gap-1">
            <div className="h-12 rounded bg-foreground/10" />
            <div className="h-12 rounded bg-primary" />
            <div className="h-12 rounded bg-foreground/10" />
          </div>
        </div>
        <div className="h-1.5 w-44 rounded-b-xl bg-border-strong" />
      </div>
    </div>
  </Cell>
);

export const FeaturesSection = () => (
  <section className="relative bg-muted/40 py-20 md:py-28">
    <Container size="wide">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>What&apos;s inside</Eyebrow>
        <Heading level={2} className="text-display-md text-balance">
          Everything your child needs in{" "}
          <span className="relative inline-block whitespace-nowrap">
            one subscription
            <MarkerUnderline />
          </span>
          .
        </Heading>
        <Text size="lg" tone="muted" className="max-w-xl text-pretty">
          Built for curious kids and the parents who want their screen time to
          actually go somewhere.
        </Text>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        <AiTrainerCell />
        <ProjectBasedCell />
        <SkillsCell />
        <DashboardCell />
        <CertificatesCell />
        <AnyDeviceCell />
      </div>
    </Container>
  </section>
);
