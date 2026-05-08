import { useState } from "react";
import {
  Award,
  CalendarCheck2,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Users,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Heading, Highlight, Text } from "@/components/ui/typography";
import { FormInput, FormSelect, FormTextarea } from "@/components/forms/FormControls";
import MarketingHero from "@/components/marketing/MarketingHero";
import { useSchoolLeadMutation } from "@/hooks/useIntake";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "principal", label: "Principal / Head of School" },
  { value: "owner", label: "School owner / Director" },
  { value: "academic-head", label: "Academic head / Coordinator" },
  { value: "teacher", label: "Teacher / Trainer" },
  { value: "it-admin", label: "IT / Operations" },
  { value: "other", label: "Other" },
];

const STUDENT_RANGES = [
  { value: "<50", label: "Fewer than 50 students" },
  { value: "50-150", label: "50 – 150 students" },
  { value: "150-300", label: "150 – 300 students" },
  { value: "300-600", label: "300 – 600 students" },
  { value: "600+", label: "600+ students" },
];

const GRADE_BANDS = [
  { value: "primary", label: "Primary (KG – Grade 5)" },
  { value: "middle", label: "Middle (Grade 6 – 8)" },
  { value: "secondary", label: "Secondary (Grade 9 – 12)" },
  { value: "all", label: "All grades" },
];

const TIMELINES = [
  { value: "now", label: "Ready to start now" },
  { value: "this-term", label: "This term / next 3 months" },
  { value: "next-year", label: "Next academic year" },
  { value: "exploring", label: "Just exploring for now" },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Curriculum that scales",
    description:
      "AI, coding, and robotics tracks designed for non-specialist teachers. No expensive trainers required.",
  },
  {
    icon: LayoutDashboard,
    title: "School management dashboard",
    description:
      "See enrollment, attendance, and progress for every class on one screen.",
  },
  {
    icon: UserCheck,
    title: "Teacher accounts",
    description:
      "Each teacher manages their own class roster with pre-built lesson plans.",
  },
  {
    icon: Users,
    title: "Bulk student onboarding",
    description:
      "Add a CSV or paste a roster. We handle the per-student PINs and accounts.",
  },
  {
    icon: Award,
    title: "International e-certificates",
    description:
      "STEMSOL.org-issued certificates students can attach to college applications.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    description:
      "No marketing emails to students. Parent-controlled access. Audit logs for admins.",
  },
];

const INITIAL_FORM = {
  schoolName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  country: "Pakistan",
  role: "",
  studentRange: "",
  grades: "",
  timeline: "",
  notes: "",
};

const ForSchools = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useSchoolLeadMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitLead.mutateAsync(form);
      setSubmitted(true);
      toast.success("We'll be in touch within a business day.");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <MarketingHero
        size="page"
        eyebrow="For schools"
        title={
          <Display size="lg">
            Bring AI &amp; Robotics to{" "}
            <Highlight>every classroom</Highlight>.
          </Display>
        }
        subtitle="Modern STEM, ready for your school. Trusted by 140+ partner schools across the region."
      >
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="marketingLg">
            <a href="#school-lead-form">Talk to our schools team</a>
          </Button>
          <Button asChild size="marketingLg" variant="outline">
            <a href="#school-benefits">See what's included</a>
          </Button>
        </div>
      </MarketingHero>

      <section
        id="school-benefits"
        className="bg-background py-20 md:py-24"
      >
        <Container size="wide">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Eyebrow>What's included</Eyebrow>
            <Heading level={2} className="text-display-md">
              Everything a school needs to launch a future-skills program.
            </Heading>
            <Text size="lg" tone="muted">
              From the first roster import to year-end certificates — we handle
              the rails so your teachers can focus on teaching.
            </Text>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title}>
                  <CardContent className="flex flex-col gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary"
                    >
                      <Icon className="size-5" />
                    </span>
                    <Heading level={3} className="text-h5">
                      {benefit.title}
                    </Heading>
                    <Text size="sm" tone="muted">
                      {benefit.description}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-20 md:py-24" id="school-lead-form">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <aside className="flex flex-col gap-6">
              <Eyebrow>Talk to us</Eyebrow>
              <Heading level={2} className="text-display-md">
                A 20-minute call — that's all we need.
              </Heading>
              <Text tone="muted">
                Tell us about your school below. A schools partner will reach
                out within a business day with a tailored plan, a live demo
                slot, and pricing fit for your scale.
              </Text>

              <ul className="flex flex-col gap-3">
                {[
                  "Custom rollout plan within 48 hours",
                  "Pricing tailored to your student count",
                  "PO / invoice billing supported",
                  "Onboarding assistance for teachers",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body-sm"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <CalendarCheck2
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary"
                  />
                  <div className="flex flex-col gap-1">
                    <Text weight="semibold" size="sm">
                      Prefer to schedule directly?
                    </Text>
                    <Text size="xs" tone="muted">
                      Email{" "}
                      <a
                        href="mailto:schools@robotronics.com"
                        className="font-semibold text-foreground underline underline-offset-4"
                      >
                        schools@robotronics.com
                      </a>{" "}
                      with two windows that suit you.
                    </Text>
                  </div>
                </div>
              </div>
            </aside>

            <Card>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-10 text-center">
                    <span
                      aria-hidden="true"
                      className="grid size-14 place-items-center rounded-full bg-success/15 text-success"
                    >
                      <CheckCircle2 className="size-7" />
                    </span>
                    <Heading level={3} className="text-h4">
                      Thanks — we'll be in touch
                    </Heading>
                    <Text tone="muted" className="max-w-md">
                      A schools partner will reach out to{" "}
                      <span className="font-semibold text-foreground">
                        {form.email}
                      </span>{" "}
                      within a business day with next steps and demo timing.
                    </Text>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setForm(INITIAL_FORM);
                      }}
                    >
                      Submit another inquiry
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={cn("flex flex-col gap-5")}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormInput
                        id="school-name"
                        name="schoolName"
                        label="School name"
                        value={form.schoolName}
                        onChange={handleChange}
                        autoComplete="organization"
                        required
                      />
                      <FormSelect
                        id="school-role"
                        name="role"
                        label="Your role"
                        value={form.role}
                        onChange={handleChange}
                        options={ROLES}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormInput
                        id="school-contact"
                        name="contactName"
                        label="Your name"
                        value={form.contactName}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                      <FormInput
                        id="school-email"
                        name="email"
                        type="email"
                        label="Work email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormInput
                        id="school-phone"
                        name="phone"
                        type="tel"
                        label="Phone (with country code)"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                      />
                      <FormInput
                        id="school-city"
                        name="city"
                        label="City"
                        value={form.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormSelect
                        id="school-students"
                        name="studentRange"
                        label="How many students?"
                        value={form.studentRange}
                        onChange={handleChange}
                        options={STUDENT_RANGES}
                        required
                      />
                      <FormSelect
                        id="school-grades"
                        name="grades"
                        label="Which grades?"
                        value={form.grades}
                        onChange={handleChange}
                        options={GRADE_BANDS}
                        required
                      />
                    </div>

                    <FormSelect
                      id="school-timeline"
                      name="timeline"
                      label="When do you want to start?"
                      value={form.timeline}
                      onChange={handleChange}
                      options={TIMELINES}
                      required
                    />

                    <FormTextarea
                      id="school-notes"
                      name="notes"
                      label="Anything else we should know? (optional)"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Existing curriculum, room setup, RFP requirements, accreditation needs…"
                    />

                    <Button
                      type="submit"
                      size="marketing"
                      className="w-full"
                      disabled={submitLead.isPending}
                    >
                      {submitLead.isPending ? "Sending…" : "Request a tailored plan"}
                    </Button>
                    <Text size="xs" tone="muted" className="text-center">
                      We'll only use your info to reply about your school
                      inquiry. No marketing.
                    </Text>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ForSchools;
