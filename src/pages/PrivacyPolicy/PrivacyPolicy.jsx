import React from "react";

const TOC_SECTIONS = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "use-of-information", label: "Use of information" },
  { id: "data-sharing", label: "Data sharing" },
  { id: "third-party-links", label: "Third-party links" },
  { id: "data-security", label: "Data security" },
  { id: "data-retention", label: "How long we keep your information" },
  { id: "user-rights", label: "User rights" },
  { id: "cookies", label: "Cookies" },
  { id: "policy-changes", label: "Policy changes" },
];

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col lg:p-20 p-8 bg-background gap-y-12">
      <div className="lg:w-full px-6">
        <h1 className="text-4xl poppins-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="text-sm poppins-light text-muted-foreground mb-6">
          Last updated: April 25, 2026
        </p>

        {/* Table of contents */}
        <nav
          aria-label="Privacy Policy sections"
          className="mb-8 rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="text-lg poppins-semibold text-foreground mb-3">
            On this page
          </h2>
          <ol className="flex flex-col gap-y-2 text-base poppins-light">
            {TOC_SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-primary hover:underline"
                >
                  {index + 1}. {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col text-lg poppins-light gap-y-4">
          <h2 id="information-we-collect" className="text-2xl poppins-semibold">Information we collect</h2>
          <p>
            We collect personal information (name, email, payment details) to provide and improve our Services.
            Additional details (age, educational background, preferences) may be collected to personalize learning.
          </p>

          <h2 id="use-of-information" className="text-2xl poppins-semibold mt-4">Use of Information</h2>
          <p>
            Collected data is used to deliver courses, process payments, communicate with users, and perform internal analytics.
          </p>

          <h2 id="data-sharing" className="text-2xl poppins-semibold mt-4">Data Sharing</h2>
          <p>
            We do not share personal information with third parties except to provide services (payment processors, delivery partners)
            or to comply with legal obligations. In partnerships, user consent will be obtained where required.
          </p>

          <h2 id="third-party-links" className="text-2xl poppins-semibold mt-4">Third-Party Links</h2>
          <p>
            Our site may link to third-party services. We are not responsible for their privacy practices—please review their policies.
          </p>

          <h2 id="data-security" className="text-2xl poppins-semibold mt-4">Data Security</h2>
          <p>
            We maintain standard security measures to protect user data and perform periodic audits to ensure compliance.
          </p>

          <h2 id="data-retention" className="text-2xl poppins-semibold mt-4">How long we keep your information</h2>
          <p>
            We keep parent account data for as long as the account is active. We delete child account data within 90 days of account closure, and within 30 days if a parent requests deletion via{" "}
            <a href="mailto:safety@robotronics.com" className="underline">safety@robotronics.com</a>.
            Learning progress and certificates are kept for the lifetime of the account so children can revisit their work.
          </p>
          <p>
            Payment records are retained for 7 years as required by local tax law. We never use child data for marketing or advertising.
          </p>

          <h2 id="user-rights" className="text-2xl poppins-semibold mt-4">User Rights</h2>
          <p>
            Users may request access, correction, or deletion of their personal data by contacting{" "}
            <a href="mailto:support@robotronicsofficial.com" className="underline">support@robotronicsofficial.com</a>.
          </p>

          <h2 id="cookies" className="text-2xl poppins-semibold mt-4">Cookies</h2>
          <p>
            We use cookies to improve the user experience. Users can manage cookie preferences through their browser settings.
          </p>

          <h2 id="policy-changes" className="text-2xl poppins-semibold mt-4">Policy Changes</h2>
          <p>
            We may update this policy occasionally; significant changes will be communicated on the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
