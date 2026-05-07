import { Link } from "@tanstack/react-router";
import { LifeBuoy, Mail, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { PolicyPage } from "@/components/marketing/PolicyPage";
import { CONTACT_PATH } from "@/router/paths";

const REPORT_EMAIL = "safety@robotronics.com";

const SECTIONS = [
  {
    title: "Commitment",
    body: "We are committed to the safety and well-being of every child on Robotronics.ai. Our policies are designed to protect kids from harm and to support their positive development.",
  },
  {
    title: "Background checks",
    body: "All instructors undergo thorough background checks before they're allowed to work with children. Periodic re-evaluations maintain consistent safety standards.",
  },
  {
    title: "Code of conduct",
    body: "Instructors follow a strict code of conduct prioritizing the safety and dignity of children. Inappropriate behavior results in immediate disciplinary action.",
  },
  {
    title: "Reporting procedures",
    body: "Any suspected abuse or misconduct must be reported immediately to our child-protection officer. Parents, children, and staff are encouraged to raise concerns without fear of retaliation.",
  },
  {
    title: "Parental involvement",
    body: "Parents are encouraged to be involved in their child's learning and to communicate any concerns. Regular feedback sessions keep things transparent.",
  },
  {
    title: "Training",
    body: "Instructors receive child-protection training on hire. Ongoing professional development keeps them current on best practices.",
  },
  {
    title: "Confidentiality",
    body: "Reports and concerns are handled confidentially. Records of reported incidents are securely maintained and monitored.",
  },
];

const ReportCard = () => (
  <section
    aria-labelledby="report-heading"
    className="mb-10 flex flex-col gap-4 rounded-2xl border border-primary bg-primary-soft p-6 md:p-8"
  >
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <ShieldAlert className="size-5" />
      </span>
      <Heading level={2} id="report-heading" className="text-h3">
        Report a concern
      </Heading>
    </div>

    <Text>
      If a child has shared something that worries you, or you&apos;ve noticed unsafe behavior from anyone on our platform, tell us. We respond within 24 hours.
    </Text>

    <div className="flex flex-wrap items-center gap-3">
      <Button asChild size="marketing">
        <a href={`mailto:${REPORT_EMAIL}`}>
          <Mail className="size-4" />
          {REPORT_EMAIL}
        </a>
      </Button>
      <Button asChild size="marketing" variant="outline">
        <Link to={CONTACT_PATH}>
          <LifeBuoy className="size-4" />
          Or use the contact form
        </Link>
      </Button>
    </div>
  </section>
);

const ChildBody = () => (
  <PolicyPage
    eyebrow="Safety"
    title="Child Protection Policy"
    lastUpdated="April 25, 2026"
    intro="How Robotronics.ai protects every child who learns on the platform — and how to report concerns."
    sections={SECTIONS}
  >
    <ReportCard />
  </PolicyPage>
);

export default ChildBody;
