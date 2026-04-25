import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-background p-8 lg:p-20">
      <article className="mx-auto flex max-w-3xl flex-col gap-8 pt-16 lg:pt-24">
        <header className="flex flex-col gap-2">
          <h1 className="poppins-bold text-4xl text-foreground">
            Refund &amp; Return Policy
          </h1>
          <p className="lato-regular text-sm text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="poppins-semibold text-2xl text-foreground">
            1. Courses &amp; Subscriptions
          </h2>
          <ul className="flex flex-col list-disc gap-2 pl-6 text-base lato-regular text-muted-foreground">
            <li>
              All course and subscription payments (Monthly or Annual) are non-refundable
              once processed.
            </li>
            <li>
              Users may cancel upcoming subscription renewals at any time before the next
              billing cycle by emailing{" "}
              <a
                href="mailto:support@robotronicsofficial.com"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                support@robotronicsofficial.com
              </a>
              .
            </li>
            <li>
              In case of verified technical issues or duplicate charges, we will investigate
              and, if validated, process refunds within 7-10 business days.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="poppins-semibold text-2xl text-foreground">
            2. Robotics Kits (Physical Products)
          </h2>
          <ul className="flex flex-col list-disc gap-2 pl-6 text-base lato-regular text-muted-foreground">
            <li>
              If a kit is defective or damaged on delivery, notify us within 3 days to
              initiate a return.
            </li>
            <li>
              Returns accepted only if the product is unused and in original packaging with
              proof of purchase.
            </li>
            <li>
              After inspection, replacements or refunds will be processed within 10-15
              working days.
            </li>
            <li>
              Return shipping is paid by the buyer unless the item was faulty or shipped
              incorrectly.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="poppins-semibold text-2xl text-foreground">
            3. Digital Goods &amp; Course Access
          </h2>
          <ul className="flex flex-col list-disc gap-2 pl-6 text-base lato-regular text-muted-foreground">
            <li>
              Access to digital content begins immediately after payment; due to this,
              refunds are generally not available once accessed.
            </li>
            <li>
              In exceptional circumstances (e.g., wrong course purchased), course switches
              may be requested within 48 hours subject to approval.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="poppins-semibold text-2xl text-foreground">
            4. Cancellation by Robotronics
          </h2>
          <p className="lato-regular text-base text-muted-foreground">
            We reserve the right to cancel subscriptions/orders in cases of fraud, policy
            violation or misuse. We may issue full or partial refunds at our discretion in
            such instances.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="poppins-semibold text-2xl text-foreground">
            5. How to Request a Refund
          </h2>
          <p className="lato-regular text-base text-muted-foreground">
            Email{" "}
            <a
              href="mailto:support@robotronicsofficial.com"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              support@robotronicsofficial.com
            </a>{" "}
            with:
          </p>
          <ul className="flex flex-col list-disc gap-2 pl-6 text-base lato-regular text-muted-foreground">
            <li>Order ID</li>
            <li>Date of Purchase</li>
            <li>Reason for Refund/Return</li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default RefundPolicy;
