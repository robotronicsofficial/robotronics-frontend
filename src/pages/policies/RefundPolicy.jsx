import { PolicyPage } from "@/components/marketing/PolicyPage";
import { CONTACT_EMAIL } from "@/lib/brandContact";

const SUPPORT_EMAIL = CONTACT_EMAIL;

const SECTIONS = [
  {
    title: "Courses & subscriptions",
    items: [
      "All course and subscription payments (monthly or annual) are non-refundable once processed.",
      <>
        Cancel upcoming subscription renewals at any time before the next billing cycle by emailing{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {SUPPORT_EMAIL}
        </a>
        .
      </>,
      "For verified technical issues or duplicate charges, we'll investigate and, if validated, process refunds within 7–10 business days.",
    ],
  },
  {
    title: "Robotics kits (physical products)",
    items: [
      "If a kit arrives defective or damaged, notify us within 3 days to initiate a return.",
      "Returns accepted only if the product is unused, in its original packaging, and accompanied by proof of purchase.",
      "After inspection, replacements or refunds are processed within 10–15 working days.",
      "Return shipping is paid by the buyer unless the item was faulty or shipped incorrectly.",
    ],
  },
  {
    title: "Digital goods & course access",
    items: [
      "Access to digital content begins immediately after payment, so refunds are generally not available once accessed.",
      "In exceptional cases (e.g., wrong course purchased), course switches may be requested within 48 hours, subject to approval.",
    ],
  },
  {
    title: "Cancellation by Robotronics",
    body: "We reserve the right to cancel subscriptions or orders in cases of fraud, policy violation, or misuse. Full or partial refunds may be issued at our discretion in such instances.",
  },
  {
    title: "How to request a refund",
    body: (
      <>
        Email{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        with your order ID, date of purchase, and reason for the refund or return.
      </>
    ),
  },
];

const RefundPolicy = () => (
  <PolicyPage
    eyebrow="Legal"
    title="Refund & Return Policy"
    lastUpdated="April 25, 2026"
    intro="When refunds and returns are available across courses, subscriptions, and physical kits."
    sections={SECTIONS}
  />
);

export default RefundPolicy;
