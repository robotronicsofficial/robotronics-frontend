import  { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const faqs = [
  {
    question: "Can I pay in installments?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
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
    <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
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
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            {openIndex === index ? (
              <FaChevronDown className="text-gray-500" />
            ) : (
              <FaChevronRight className="text-gray-500" />
            )}
          </div>
          {openIndex === index && (
            <p className="mt-3 text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default RobogeniusFAQSection;
