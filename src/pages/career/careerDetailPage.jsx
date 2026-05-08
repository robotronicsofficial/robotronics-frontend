import { Link, useParams } from "@tanstack/react-router";
import { ArrowUpRight, Briefcase, ChevronLeft, MapPin } from "lucide-react";

import JobApplicationForm from "@/components/site/careers/CareerDetailPage/jobApplicationForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Heading,
  Text,
} from "@/components/ui/typography";
import PageState from "@/components/layout/PageState";
import { getJobsErrorMessage } from "../../lib/jobs";
import { useJob } from "../../hooks/useJobs";

const Bullets = ({ items, fallback }) => {
  if (!items?.length) {
    return <Text tone="muted">{fallback}</Text>;
  }
  return (
    <ul className="ml-5 flex max-w-prose list-disc flex-col gap-2 text-body text-foreground marker:text-primary">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

const CareerDetailPage = () => {
  const { id } = useParams({ strict: false });
  const { data: job, isLoading, error } = useJob(id);

  if (isLoading) return <PageState message="Loading job details…" />;

  if (error && !job) {
    return (
      <PageState>
        <Text className="text-destructive">
          {getJobsErrorMessage(error, { detail: true })}
        </Text>
        <Button asChild variant="outline" className="mt-6 gap-1.5">
          <Link to="/CareerJob">
            <ChevronLeft className="size-4" />
            Back to careers
          </Link>
        </Button>
      </PageState>
    );
  }

  if (!job) return <PageState message="No job selected." />;

  const responsibilities = (job.keyResponsibilities || []).filter(Boolean);
  const skills = (job.requiredSkills || []).filter(Boolean);

  return (
    <>
      <header className="bg-muted/40 pt-header pb-12">
        <Container size="narrow" className="px-6">
          <div className="flex flex-col items-start gap-5">
            <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5 px-2">
              <Link to="/CareerJob">
                <ChevronLeft className="size-4" />
                Back to careers
              </Link>
            </Button>
            <Eyebrow>Open role</Eyebrow>
            <Display size="md">{job.position || job.title || "Open position"}</Display>
            <div className="flex flex-wrap items-center gap-2">
              {job.experience && (
                <Badge variant="outline" className="gap-1.5">
                  <Briefcase className="size-3" />
                  {job.experience}
                </Badge>
              )}
              {job.location && (
                <Badge variant="outline" className="gap-1.5">
                  <MapPin className="size-3" />
                  {job.location}
                </Badge>
              )}
            </div>
            <Button asChild size="marketing" className="mt-2">
              <a href="#application-form" className="gap-2">
                Apply now
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </Container>
      </header>

      <Container size="narrow" className="px-6 pb-20">
        <section className="mt-12 flex flex-col gap-10">
          {job.description && (
            <div className="flex flex-col gap-3">
              <Heading level={2} className="text-h3">
                About the role
              </Heading>
              <Text size="lg" className="max-w-prose text-foreground">
                {job.description}
              </Text>
            </div>
          )}

          {job.roleOverview && (
            <div className="flex flex-col gap-3">
              <Heading level={2} className="text-h3">
                Role overview
              </Heading>
              <Text className="max-w-prose text-foreground">{job.roleOverview}</Text>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Heading level={2} className="text-h3">
              Key responsibilities
            </Heading>
            <Bullets
              items={responsibilities}
              fallback="Responsibilities will be shared during the hiring process."
            />
          </div>

          <div className="flex flex-col gap-3">
            <Heading level={2} className="text-h3">
              Required skills
            </Heading>
            <Bullets
              items={skills}
              fallback="Skill requirements will be shared during the hiring process."
            />
          </div>
        </section>

        <section
          id="application-form"
          className="mt-16 scroll-mt-24 rounded-2xl border border-border bg-card p-6 md:p-10"
        >
          <div className="flex flex-col gap-2">
            <Heading level={2} className="text-h2">
              Apply for this role
            </Heading>
            <Text tone="muted">
              Submit your details and CV. We review every application and respond within a week.
            </Text>
          </div>
          <div className="mt-8">
            <JobApplicationForm job={job} />
          </div>
        </section>
      </Container>
    </>
  );
};

export default CareerDetailPage;
