import React from "react";

const faqs = [
  {
    question: "Who can register for a learning subscription?",
    answer: "Students aged 7 and above from any background can benefit from this program across the globe."
  },
  {
    question: "Do we provide E-Certificates?",
    answer: "Yes. Active learners can earn E-Certificates issued through STEMSOL.org, a US-based credentialing partner."
  },
  {
    question: "How will we pay every month? Do we need to visit your office?",
    answer: "All payments are processed online through the selected billing method."
  },
  {
    question: "Which devices are required?",
    answer: "The learning platform is responsive and accessible on laptops, tablets, and phones. Basic system configuration is sufficient."
  },
  {
    question: "How many students can use this Program under one subscription?",
    answer: "Each subscription is for one child only. Violations may lead to cancellation. Parents can add additional children by paying separately."
  },
  {
    question: "Can we pay in Installments?",
    answer: "Yes. Parents can use monthly billing when they prefer smaller recurring payments."
  },
  {
    question: "Can we cancel the subscription?",
    answer: "Subscriptions once paid are non-refundable. You may opt out before the next billing cycle by emailing support@robotronicsofficial.com."
  },
  {
    question: "How can we add Multiple Child Accounts?",
    answer: "Parents can add multiple children via the dashboard. Each child gets a dedicated 4-digit PIN for login."
  },
  {
    question: "How will you examine if the Child is learning properly or not?",
    answer: "Courses are split into modules. After each module, the child must pass a quiz with at least 60% to unlock the next module."
  },
  {
    question: "Students or schools from which country can benefit from the subscription?",
    answer: "The platform is SaaS-based and accessible globally to schools and students in any country."
  },
  {
    question: "What is the fee structure?",
    answer: "Plans start from PKR 800/month (approx. USD 2.84/month) when paid annually. Exact pricing is displayed during checkout."
  }
];

const FAQs = () => {
  return (
    <div className="lg:p-20 p-8 bg-background">
      <div className="lg:w-full px-6">
        <br></br><br></br><br></br><br></br>
        <h1 className="text-4xl poppins-bold text-brown mb-6">Frequently Asked Questions (FAQs)</h1>
        <div className="space-y-6">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl poppins-semibold">{f.question}</h3>
              <p className="text-base poppins-light mt-2">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
