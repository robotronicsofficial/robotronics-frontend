import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Who can register for a learning subscription?",
    answer:
      "Students aged 7 and above from any background can benefit from this program across the globe.",
  },
  {
    question: "Do we provide E-Certificates?",
    answer:
      "Yes. Active learners can earn E-Certificates issued through STEMSOL.org, a US-based credentialing partner.",
  },
  {
    question: "How will we pay every month? Do we need to visit your office?",
    answer: "All payments are processed online through the selected billing method.",
  },
  {
    question: "Which devices are required?",
    answer:
      "The learning platform is responsive and accessible on laptops, tablets, and phones. Basic system configuration is sufficient.",
  },
  {
    question: "How many students can use this Program under one subscription?",
    answer:
      "Each subscription is for one child only. Violations may lead to cancellation. Parents can add additional children by paying separately.",
  },
  {
    question: "Can we pay in Installments?",
    answer: "Yes. Parents can use monthly billing when they prefer smaller recurring payments.",
  },
  {
    question: "Can we cancel the subscription?",
    answer:
      "Subscriptions once paid are non-refundable. You may opt out before the next billing cycle by emailing support@robotronicsofficial.com.",
  },
  {
    question: "How can we add Multiple Child Accounts?",
    answer:
      "Parents can add multiple children via the dashboard. Each child gets a dedicated 4-digit PIN for login.",
  },
  {
    question: "How will you examine if the Child is learning properly or not?",
    answer:
      "Courses are split into modules. After each module, the child must pass a quiz with at least 60% to unlock the next module.",
  },
  {
    question: "Students or schools from which country can benefit from the subscription?",
    answer:
      "The platform is SaaS-based and accessible globally to schools and students in any country.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "The current subscription price is shown during checkout, with monthly and annual billing available.",
  },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\W+/g, "-")
    .replace(/^-+|-+$/g, "");

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const items = useMemo(
    () => faqs.map((faq) => ({ ...faq, slug: slugify(faq.question) })),
    []
  );

  return (
    <div className="bg-background p-8 lg:p-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 pt-16 lg:pt-24">
        <header className="flex flex-col gap-2">
          <h1 className="poppins-bold text-4xl text-foreground">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="lato-regular text-sm text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </header>

        <nav
          aria-label="FAQ table of contents"
          className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <p className="poppins-semibold text-sm uppercase tracking-wide text-muted-foreground">
            On this page
          </p>
          <ul className="flex flex-col gap-2">
            {items.map((item, idx) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  className="lato-regular text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {idx + 1}. {item.question}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <li
                key={item.slug}
                id={item.slug}
                className="flex flex-col rounded-2xl border border-border bg-card scroll-mt-24"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.slug}-panel`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                >
                  <h3 className="poppins-semibold text-base text-foreground md:text-lg">
                    {item.question}
                  </h3>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`${item.slug}-panel`}
                    className="flex flex-col px-5 pb-5"
                  >
                    <p className="lato-regular text-base text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FAQs;
