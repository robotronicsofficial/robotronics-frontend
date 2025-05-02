import  { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const faqs = [
  {
    question: "Who can register in RoboGenius Program?",
    answer:
      "Students of age 7 and onwards belonging to any background can benefit from this program across the Globe.",
  },
  {
    question: "Do we provide E-Certificates?",
    answer:
      "Yes we do provide E-Certificates to PRO plan users which are certified from STEMSOL.org. It is a US based credentialling service provider with acceptance across the world.",
  },
  {
    question: "How will we pay every month? Do we need to visit your office?",
    answer:
      "All our Robogenius payments will be ducted online through your Bank Cards automatically as per your plan.",
  },
  {
    question: "Which devices are required?",
    answer:
      "RoboGenius Edtech Platform is completely responsive for all screen types. Hence the courses can be taken on a Laptop/PC/Tablet/Ipad/Mobile etc. Systems with basic configuration can also be used.",
  },
  {
    question: "How many students can use this Program under one subscription?",
    answer:
      "One Child subscription is for one child only. If an account is found violating the policy, the subscription will be cancelled immediately. Although the Parent can add another child in their account at any time and pay separately.",
  },
  {
    question: "Can we pay in Installments?",
    answer:
      "Parents or Schools willing to pay in Installments can opt for Monthly Plan as per their convenience.",
  },
  {
    question: "Can we cancel the RoboGenius Subscription?",
    answer:
      "RoboGenius Subscription once paid is non-refundable. Yes, the Parent or School can opt out from RoboGenius before the next payment is deducted. To cancel your subscription, drop us an e-mail at support@robotronicsofficial.com",
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
    question: "Students or Schools from which country can benefit from RoboGenius Program?",
    answer:
      "This SaaS based EdTech platform is accessible to everyone across the globe. For example, any school/student in any part of the world can benefit from this Program.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "For Individual Parent, our plans will cost as low as PKR 800/month (USD 2.84/month) when paid Annually.",
  },
];

const RobogeniusFAQSection = () => {
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

export default RobogeniusFAQSection;
