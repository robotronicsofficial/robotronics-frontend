import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase, Building2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";
import { useJobs } from "@/hooks/useJobs";

const summarize = (description) => {
  if (!description?.trim()) return "Full role details on the job page.";
  const trimmed = description.trim();
  return trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;
};

const HeroSection = () => (
  <section className="bg-background pt-header pb-12">
    <Container size="wide">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>Careers</Eyebrow>
        <Display size="lg">
          Build the <Highlight>future-skills layer</Highlight> with us.
        </Display>
        <Text size="lg" tone="muted" className="max-w-2xl">
          We&apos;re a small team shipping AI-powered learning to 150K+ kids worldwide. If that sounds like the kind of work you want on your résumé — read on.
        </Text>
      </div>
    </Container>
  </section>
);

const JobRow = ({ job }) => (
  <Link
    to="/CareerDetailPage/$id"
    params={{ id: job._id }}
    className="group/job grid grid-cols-1 gap-4 border-b border-border py-8 transition-colors hover:bg-muted/30 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-6 md:px-6"
  >
    <div className="flex flex-col gap-1">
      <Text size="xs" tone="subtle" className="font-mono uppercase tracking-wider">
        {job.title || "Open role"}
      </Text>
      <Heading level={3} className="text-h4">
        {job.position || job.title || "Untitled role"}
      </Heading>
      <Text size="sm" tone="muted" className="line-clamp-2 max-w-prose">
        {summarize(job.description)}
      </Text>
    </div>
    <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
      <Briefcase className="size-4" />
      {job.experience || "Open level"}
    </div>
    <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
      <MapPin className="size-4" />
      {job.location || "Anywhere"}
    </div>
    <div className="flex justify-end">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover/job:border-primary group-hover/job:bg-primary group-hover/job:text-primary-foreground"
      >
        <ArrowUpRight className="size-4" />
      </span>
    </div>
  </Link>
);

const RolesSection = () => {
  const { data: jobs = [], isLoading, error } = useJobs();
  return (
    <section className="bg-background py-16">
      <Container size="wide">
        <div className="flex flex-col gap-3 border-b border-border pb-6">
          <Eyebrow>Open roles</Eyebrow>
          <Heading level={2} className="text-display-md">
            Where you fit in.
          </Heading>
        </div>

        {isLoading ? (
          <Text tone="muted" className="py-10 text-center">
            Loading open roles…
          </Text>
        ) : error ? (
          <Text className="py-10 text-center text-destructive">
            {error.message || "We couldn't load open roles right now."}
          </Text>
        ) : jobs.length === 0 ? (
          <Text tone="muted" className="py-10 text-center">
            No open roles right now — but we&apos;re always interested in great people.
          </Text>
        ) : (
          <div className="flex flex-col">
            {jobs.map((job) => (
              <JobRow key={job._id} job={job} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

const CultureSection = () => (
  <section className="bg-muted/40 py-20 md:py-24">
    <Container size="wide">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <Eyebrow>Why join</Eyebrow>
          <Heading level={2} className="text-display-md">
            Real ownership, real impact, real kids learning.
          </Heading>
          <Text tone="muted">
            Our average tenure is 4.5 years. People stay because the problem is meaningful, the team is small, and the surface area you own is large from day one.
          </Text>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Hybrid by default; flexible hours",
            "Training & conference budget",
            "Equipment of your choice",
            "Health insurance for you and family",
            "Quarterly team off-sites",
            "Direct line to the founders",
          ].map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-body-sm"
            >
              <Building2 className="size-4 shrink-0 text-primary" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);

const FinalCta = () => (
  <SectionInverse className="pt-24 pb-12 md:pt-32 md:pb-16">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Don&apos;t see your role?
        </Heading>
        <Text size="lg" className="text-background/75">
          Send a résumé anyway — if you&apos;re unusually good, we&apos;ll find a way to work together.
        </Text>
        <Button asChild size="marketingLg">
          <Link to="/JobApplicationForm">Send your résumé</Link>
        </Button>
      </div>
    </Container>
  </SectionInverse>
);

const CareerJob = () => (
  <>
    <HeroSection />
    <RolesSection />
    <CultureSection />
    <FinalCta />
  </>
);

export default CareerJob;
