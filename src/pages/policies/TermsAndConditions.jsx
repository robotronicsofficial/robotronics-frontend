import { PolicyPage } from "@/components/marketing/PolicyPage";

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using our website, mobile application, or related services, you agree to comply with and be bound by these terms. If you don't agree, please discontinue use.",
  },
  {
    title: "Services",
    body: "We provide online and onsite educational courses, workshops, and robotics kits covering programming, AI, ML, Arduino, and related STEM fields. Courses are designed for children and young learners. Users under 18 must have parental or guardian consent.",
  },
  {
    title: "Account registration",
    body: "Some content requires a registered account with accurate personal details. You are responsible for maintaining the confidentiality of your credentials and all activity under your account.",
  },
  {
    title: "Subscriptions & payments",
    body: "The learning subscription supports monthly and annual billing. Payments are collected in advance through approved gateways (e.g., Bank Alfalah). Subscriptions renew automatically unless cancelled before renewal.",
  },
  {
    title: "Refunds & cancellations",
    body: "Refunds are handled according to our Refund & Return Policy. Refunds are not available except in cases described there.",
  },
  {
    title: "User conduct",
    body: "Users must behave respectfully towards instructors and peers. Harassment, cheating, or sharing content with unauthorized users may result in suspension or termination.",
  },
  {
    title: "Intellectual property",
    body: "All course materials, quizzes, videos, logos, and text are the exclusive property of Robotronics Pakistan. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    title: "Limitation of liability",
    body: "Robotronics Pakistan is not liable for indirect or consequential damages. Maximum liability is limited to the amount paid for the affected service.",
  },
  {
    title: "AI chatbot support",
    body: "Our AI chatbot helps answer course-related queries. AI responses are informational and not a substitute for professional advice.",
  },
  {
    title: "Robotics kits sales",
    body: "Physical kits are subject to availability. Images are for reference; specs and prices may change.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of Punjab, Pakistan. Disputes are resolved via arbitration in Punjab.",
  },
  {
    title: "Changes to terms",
    body: "We may update these terms periodically. Continued use after changes indicates acceptance.",
  },
];

const TermsAndConditions = () => (
  <PolicyPage
    eyebrow="Legal"
    title="Terms & Conditions"
    lastUpdated="April 25, 2026"
    intro="The rules that govern your use of Robotronics.ai products and services."
    sections={SECTIONS}
  />
);

export default TermsAndConditions;
