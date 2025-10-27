import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="lg:p-20 p-8 bg-background space-y-12">
      <div className="lg:w-full px-6">
        <h1 className="text-4xl poppins-bold text-brown mb-3">Privacy Policy</h1>

        <div className="text-lg poppins-light space-y-4">
          <p>
            We collect personal information (name, email, payment details) to provide and improve our Services.
            Additional details (age, educational background, preferences) may be collected to personalize learning.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Use of Information</h2>
          <p>
            Collected data is used to deliver courses, process payments, communicate with users, and perform internal analytics.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Data Sharing</h2>
          <p>
            We do not share personal information with third parties except to provide services (payment processors, delivery partners)
            or to comply with legal obligations. In partnerships, user consent will be obtained where required.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Third-Party Links</h2>
          <p>
            Our site may link to third-party services. We are not responsible for their privacy practices—please review their policies.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Data Security</h2>
          <p>
            We maintain standard security measures to protect user data and perform periodic audits to ensure compliance.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">User Rights</h2>
          <p>
            Users may request access, correction, or deletion of their personal data by contacting{" "}
            <a href="mailto:support@robotronicsofficial.com" className="underline">support@robotronicsofficial.com</a>.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Cookies</h2>
          <p>
            We use cookies to improve the user experience. Users can manage cookie preferences through their browser settings.
          </p>

          <h2 className="text-2xl poppins-semibold mt-4">Policy Changes</h2>
          <p>
            We may update this policy occasionally; significant changes will be communicated on the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
