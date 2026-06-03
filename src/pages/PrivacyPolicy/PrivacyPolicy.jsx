import { PolicyPage } from "@/components/marketing/PolicyPage";
import { CONTACT_EMAIL, SAFETY_EMAIL } from "@/lib/brandContact";

const SECTIONS = [
  {
    title: "Information we collect",
    body: "We collect personal information (name, email, payment details) to provide and improve our services. Additional details — age, educational background, preferences — may be collected to personalize learning.",
  },
  {
    title: "Use of information",
    body: "Collected data is used to deliver courses, process payments, communicate with users, and perform internal analytics.",
  },
  {
    title: "Data sharing",
    body: "We do not share personal information with third parties except to provide services (payment processors, delivery partners) or to comply with legal obligations. Where partnerships require it, user consent is obtained first.",
  },
  {
    title: "Third-party links",
    body: "Our site may link to third-party services. We are not responsible for their privacy practices — please review their policies.",
  },
  {
    title: "Data security",
    body: "We maintain standard security measures to protect user data and perform periodic audits to ensure compliance.",
  },
  {
    title: "How long we keep your information",
    body: [
      `Parent account data is kept for as long as the account is active. Child account data is deleted within 90 days of account closure, and within 30 days if a parent requests deletion via ${SAFETY_EMAIL}. Learning progress and certificates are retained for the lifetime of the account so children can revisit their work.`,
      "Payment records are retained for 7 years as required by local tax law. We never use child data for marketing or advertising.",
    ],
  },
  {
    title: "User rights",
    body: `Users may request access, correction, or deletion of their personal data by contacting ${CONTACT_EMAIL}.`,
  },
  {
    title: "Cookies",
    body: "We use cookies to improve the user experience. Cookie preferences can be managed through your browser settings.",
  },
  {
    title: "Policy changes",
    body: "We may update this policy occasionally. Significant changes will be communicated on the site.",
  },
];

const PrivacyPolicy = () => (
  <PolicyPage
    eyebrow="Legal"
    title="Privacy Policy"
    lastUpdated="April 25, 2026"
    intro="How we collect, use, and protect personal information across Robotronics.ai."
    sections={SECTIONS}
  />
);

export default PrivacyPolicy;
