import React from "react";
import { ShieldAlert, Mail, LifeBuoy } from "lucide-react";
import { Link } from "@tanstack/react-router";

const REPORT_EMAIL = "safety@robotronics.com";

const ChildBody = () => {
  return (
    <div>
      <div className="flex flex-col lg:p-20 p-8 bg-background gap-y-20">
        <div className="">
          {/* Text */}
          <div className="lg:w-full px-10">
            <div className="flex flex-col gap-y-12">
              <h1
                className="text-5xl poppins-bold text-foreground"
                data-aos="fade-up"


              >
                Child Protection Policy
              </h1>

              {/* Reporting contact card */}
              <section
                aria-labelledby="report-a-concern-heading"
                data-aos="fade-up"
                className="flex flex-col gap-y-4 rounded-2xl border border-border bg-card p-6 lg:p-8"
              >
                <div className="flex items-center gap-x-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2
                    id="report-a-concern-heading"
                    className="text-2xl poppins-semibold text-foreground"
                  >
                    Report a concern
                  </h2>
                </div>

                <p className="text-base poppins-light text-muted-foreground">
                  If a child has shared anything that worries you, or if you&apos;ve noticed unsafe behavior from anyone on our platform, tell us. We respond within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                  <a
                    href={`mailto:${REPORT_EMAIL}`}
                    className="inline-flex items-center gap-x-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground poppins-medium hover:opacity-90"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {REPORT_EMAIL}
                  </a>

                  <Link
                    to="/contactUs"
                    className="inline-flex items-center gap-x-2 rounded-full border border-border bg-background px-5 py-2.5 text-foreground poppins-medium hover:bg-muted"
                  >
                    <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                    Or reach us via Contact Us
                  </Link>
                </div>
              </section>

              <ol className="flex flex-col text-xl poppins-light gap-y-2" data-aos="fade-up">
                <li><strong>1. Commitment:</strong> We are committed to ensuring the safety and well-being of all children participating in our courses. Our policies are designed to protect children from harm and ensure their positive development.</li>

                <li><strong>2. Background Checks:</strong> All instructors undergo thorough background checks to ensure they are suitable to work with children. Periodic re-evaluations are conducted to maintain high standards of safety.</li>

                <li><strong>3. Code of Conduct:</strong> Instructors must adhere to a strict code of conduct that prioritizes the safety and dignity of children. Any inappropriate behavior by instructors will result in immediate disciplinary action.</li>

                <li><strong>4. Reporting Procedures:</strong> Any suspected abuse or misconduct must be reported immediately to the designated child protection officer. Parents, children, and staff are encouraged to report any concerns without fear of retaliation.</li>

                <li><strong>5. Parental Involvement:</strong> Parents are encouraged to be involved in their children's learning and to communicate any concerns they may have. Regular parent meetings and feedback sessions are conducted to ensure transparency.</li>

                <li><strong>6. Training:</strong> Instructors receive training on child protection policies and procedures. Ongoing professional development is provided to keep instructors updated on best practices.</li>

                <li><strong>7. Confidentiality:</strong> All reports and concerns are handled confidentially, with information shared on a need-to-know basis only. Records of reported incidents are securely maintained and monitored.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildBody;
