import { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

const SUPPORT_EMAIL = "support@robotronicsofficial.com";

const faqs = [
  {
    question: "Who can register for a learning subscription?",
    answer:
      "Students of age 7 and onwards belonging to any background can benefit from this program across the Globe.",
  },
  {
    question: "Do we provide E-Certificates?",
    answer:
      "Yes. Active learners can earn E-Certificates issued through STEMSOL.org, a US-based credentialing service provider with acceptance across the world.",
  },
  {
    question: "How will we pay every month? Do we need to visit your office?",
    answer:
      "Subscription payments are handled online through the selected billing method. You do not need to visit any office.",
  },
  {
    question: "Which devices are required?",
    answer:
      "The learning platform is responsive across laptop, tablet, and mobile screens. A basic device with a modern browser and an internet connection is enough.",
  },
  {
    question: "How many students can use one subscription?",
    answer:
      "Each child needs an active subscription. Parents can add more children from their account and pay separately for each child profile.",
  },
  {
    question: "Can we pay in Installments?",
    answer:
      "Parents can choose monthly billing when they prefer smaller recurring payments, or annual billing for a discounted rate.",
  },
  {
    question: "Can we cancel the subscription?",
    answer:
      "Subscriptions are non-refundable once paid. You can opt out before your next billing date and your current period will continue until it ends. To cancel, send us an email from the parent account address and include the child name or order code.",
    cancellation: true,
  },
  {
    question: "How can we add Multiple Child Accounts under one Parent Account?",
    answer:
      "Parents log in to their dashboard and add each child from a single place. Every child creates their own 4-digit PIN to log into the learning portal, and progress stays separate for each profile.",
  },
  {
    question: "How will you examine if the Child is learning properly or not?",
    answer:
      "Each course is divided into 6 Modules. After every module the Child has to pass the Quiz with at least 60% passing marks to unlock the next module.",
  },
  {
    question: "Students or schools from which country can benefit from the subscription?",
    answer:
      "The platform is accessible globally. Schools and students in any supported country can use it.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "The subscription supports monthly and annual billing. The current price is shown before registration, and the annual plan includes a savings discount.",
  },
];

const SubscriptionFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-10 bg-background sm:px-24">
      <div className="bg-muted p-6 sm:p-10 rounded-xl py-12">
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left poppins-bold">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-5 border border-border cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg font-semibold poppins-bold">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronDown className="text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="text-muted-foreground shrink-0" />
                )}
              </div>
              {openIndex === index && (
                <div className="flex flex-col gap-3 mt-3">
                  <p className="text-muted-foreground poppins-light">
                    {faq.answer}
                  </p>
                  {faq.cancellation ? (
                    <div
                      className="flex items-start gap-3 rounded-2xl bg-muted p-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-foreground poppins-bold">
                          How to cancel
                        </p>
                        <p className="text-sm text-muted-foreground poppins-light">
                          Email us at{" "}
                          <a
                            href={`mailto:${SUPPORT_EMAIL}?subject=Subscription%20cancellation`}
                            className="font-semibold text-foreground underline underline-offset-2"
                          >
                            {SUPPORT_EMAIL}
                          </a>{" "}
                          from the parent account address. Include the child
                          name or order code so we can action it before your
                          next billing date.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFAQSection;
