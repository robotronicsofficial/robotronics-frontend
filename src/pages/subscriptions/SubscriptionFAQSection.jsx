import  { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

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
      "Subscription payments are handled online through the selected billing method.",
  },
  {
    question: "Which devices are required?",
    answer:
      "The learning platform is responsive across laptop, tablet, and mobile screens. Basic system configuration is sufficient.",
  },
  {
    question: "How many students can use one subscription?",
    answer:
      "Each child needs an active subscription. Parents can add more children from their account and pay separately.",
  },
  {
    question: "Can we pay in Installments?",
    answer:
      "Parents can use monthly billing when they prefer smaller recurring payments.",
  },
  {
    question: "Can we cancel the subscription?",
    answer:
      "Subscriptions are non-refundable once paid. Parents or schools can opt out before the next payment by emailing support@robotronicsofficial.com.",
  },
  {
    question: "How can we add Multiple Child Accounts under one Parent Account?",
    answer:
      "Simple, just like Netflix, Parents can log in to their dashboard and add multiple children. Each Child will create their own dedicated 4-digit PIN Code for logging into the Portal.",
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
      "The membership supports monthly and annual billing. The current price is shown before registration.",
  },
];

const SubscriptionFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-10 bg-[#ebe5e2] sm:px-24">
  <div className="bg-gray-100 p-6 sm:p-10 rounded-xl bg-[#F3F5F6] py-12">
    <h2 className="text-2xl font-bold mb-6 text-center sm:text-left poppins-bold">
      Frequently Asked Questions
    </h2>
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-5 shadow-sm cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold poppins-bold">{faq.question}</h3>
            {openIndex === index ? (
              <FaChevronDown className="text-gray-500" />
            ) : (
              <FaChevronRight className="text-gray-500" />
            )}
          </div>
          {openIndex === index && (
            <p className="mt-3 text-gray-600 poppins-light">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default SubscriptionFAQSection;
