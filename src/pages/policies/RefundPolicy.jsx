import React from "react";

const RefundPolicy = () => {
  return (
    <div className="lg:p-20 p-8 bg-background space-y-12">
      <div className="lg:w-full px-6">
                <br></br><br></br>
                <br></br>

        <h1 className="text-4xl poppins-bold text-brown mb-3">Refund &amp; Return Policy</h1>

        <section className="text-lg poppins-light space-y-4">
          <h2 className="text-2xl poppins-semibold">1. Courses &amp; Subscriptions</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>All course and subscription payments (Monthly or Annual) are non-refundable once processed.</li>
            <li>
              Users may cancel upcoming subscription renewals at any time before the next billing cycle by emailing{" "}
              <a href="mailto:support@robotronicsofficial.com" className="underline">support@robotronicsofficial.com</a>.
            </li>
            <li>
              In case of verified technical issues or duplicate charges, we will investigate and, if validated, process
              refunds within 7–10 business days.
            </li>
          </ul>

          <h2 className="text-2xl poppins-semibold mt-4">2. Robotics Kits (Physical Products)</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>If a kit is defective or damaged on delivery, notify us within 3 days to initiate a return.</li>
            <li>Returns accepted only if the product is unused and in original packaging with proof of purchase.</li>
            <li>After inspection, replacements or refunds will be processed within 10–15 working days.</li>
            <li>Return shipping is paid by the buyer unless the item was faulty or shipped incorrectly.</li>
          </ul>

          <h2 className="text-2xl poppins-semibold mt-4">3. Digital Goods &amp; Course Access</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access to digital content begins immediately after payment; due to this, refunds are generally not available once accessed.</li>
            <li>In exceptional circumstances (e.g., wrong course purchased), course switches may be requested within 48 hours subject to approval.</li>
          </ul>

          <h2 className="text-2xl poppins-semibold mt-4">4. Cancellation by Robotronics</h2>
          <p>
            We reserve the right to cancel subscriptions/orders in cases of fraud, policy violation or misuse. We may issue
            full or partial refunds at our discretion in such instances.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">5. How to Request a Refund</h2>
          <p>
            Email <a href="mailto:support@robotronicsofficial.com" className="underline">support@robotronicsofficial.com</a> with:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Order ID</li>
            <li>Date of Purchase</li>
            <li>Reason for Refund/Return</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
