import React from "react";

const TermsBody = () => {
  return (
    <div>
      <div className="lg:p-20 p-8 bg-background space-y-20">
        <div className="">
          {/* Text */}
          <div className="lg:w-full px-10">
            <div className="space-y-12">
              <h1
                className="text-5xl poppins-bold text-brown"
                data-aos="fade-up"


              >
                Terms and Conditions
              </h1>
              <ol
                className="text-xl poppins-light space-y-2"
                data-aos="fade-up"


              >
                <li>
                  <strong>1. Acceptance of Terms:</strong> By accessing and
                  using our services, you accept and agree to be bound by these
                  Terms of Use. If you do not agree to these terms, please do
                  not use our services.
                </li>

                <li>
                  <strong>2. Services Provided:</strong> We offer educational
                  courses both online and onsite, in areas such as AI, Python,
                  ML, Android app development, and more. The courses are
                  designed for children and young learners, and require parental
                  consent for those under 18 years of age.
                </li>

                <li>
                  <strong>3. Accounts:</strong> Creating an account is required
                  for accessing certain parts of our services. Users are
                  responsible for maintaining the confidentiality of their
                  account credentials.
                </li>

                <li>
                  <strong>4. User Conduct:</strong> Users must behave
                  responsibly and respectfully towards instructors and other
                  participants. Any forms of harassment, abuse, or misconduct
                  will result in immediate termination of access.
                </li>

                <li>
                  <strong>5. Content and Intellectual Property:</strong> All
                  course materials, content, and trademarks are the intellectual
                  property of Robotronics Pakistan. Unauthorized reproduction,
                  distribution, or use of these materials is prohibited.
                </li>

                <li>
                  <strong>6. Fees and Payments:</strong> Course fees must be
                  paid in advance and are subject to our refund policy. We
                  accept various payment methods as outlined on our website.
                </li>

                <li>
                  <strong>7. Cancellations and Refunds:</strong> Users can
                  cancel their enrollment as per the terms outlined in our
                  refund policy. Refunds, if applicable, will be processed
                  within a specified timeframe.
                </li>

                <li>
                  <strong>8. Limitation of Liability:</strong> We are not liable
                  for any indirect, incidental, or consequential damages arising
                  from the use of our services. Our liability is limited to the
                  amount paid by the user for the specific service.
                </li>

                <li>
                  <strong>9. Governing Law:</strong> These terms are governed by
                  the laws of Punjab, Pakistan. Any disputes arising from these
                  terms will be resolved through arbitration in Punjab.
                </li>

                <li>
                  <strong>10. Changes to Terms:</strong> We reserve the right to
                  modify these terms at any time. Users will be notified of any
                  significant changes.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsBody;
