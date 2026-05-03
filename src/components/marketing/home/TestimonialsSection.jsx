import { Quote } from "lucide-react";

import { BlurText } from "@/components/ui/blur-text";
import { Container } from "@/components/ui/container";
import { TiltedCard } from "@/components/ui/tilted-card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "It's like Netflix — but for learning. My daughter actually asks for screen time now.",
    name: "Sana Iqbal",
    role: "Parent of two · Karachi",
  },
  {
    quote: "We went from struggling to find a STEM teacher to having every kid building real projects in two months.",
    name: "Ayesha Khan",
    role: "Principal · LGS Garden Town",
  },
  {
    quote: "The AI trainer is what sold us. My son gets feedback the second he asks for it, not next class.",
    name: "Bilal Mahmood",
    role: "Parent · Lahore",
  },
];

const TestimonialCard = ({ quote, name, role, className }) => (
  <TiltedCard className={cn("h-full", className)}>
    <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6">
      <Quote
        aria-hidden="true"
        className="size-7 shrink-0 text-primary"
        strokeWidth={2.25}
      />
      <blockquote className="text-body text-foreground">{quote}</blockquote>
      <figcaption className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
        <span className="text-body-sm font-semibold text-foreground">
          {name}
        </span>
        <span className="text-caption text-muted-foreground">{role}</span>
      </figcaption>
    </figure>
  </TiltedCard>
);

export const TestimonialsSection = () => (
  <section className="bg-background py-20 md:py-28">
    <Container size="wide">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>Loved by parents &amp; schools</Eyebrow>
        <Heading level={2} className="text-display-md">
          <BlurText text="The shortcut to a future-ready kid." />
        </Heading>
        <Text size="lg" tone="muted">
          Real words from the parents and educators using Robotronics.ai every day.
        </Text>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </Container>
  </section>
);
