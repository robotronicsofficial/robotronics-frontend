import React from "react";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using our website, mobile application, or related services (“Services”), you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use.",
  },
  {
    title: "Services",
    body: "We provide online and onsite educational courses, workshops, and robotics kits covering Programming, AI, ML, Arduino and related STEM fields. Our courses are designed for children and young learners. Users under 18 must have parental or guardian consent.",
  },
  {
    title: "Account Registration",
    body: "To access certain content, users must create an account with accurate personal details. You are responsible for maintaining confidentiality of your credentials and all activities under your account.",
  },
  {
    title: "Subscriptions & Payments",
    body: "The learning subscription supports monthly and annual billing. Payments are collected in advance through approved payment gateways (e.g., Bank Alfalah). Subscriptions renew automatically unless cancelled prior to renewal.",
  },
  {
    title: "Refunds & Cancellations",
    body: "Refunds are handled according to our Refund & Return Policy. Refunds are not available except in cases described in that policy.",
  },
  {
    title: "User Conduct",
    body: "Users must behave respectfully towards instructors and peers. Harassment, cheating, or sharing content with unauthorized users may result in suspension or termination.",
  },
  {
    title: "Intellectual Property",
    body: "All course materials, quizzes, videos, logos and text are the exclusive property of Robotronics Pakistan. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    title: "Limitation of Liability",
    body: "Robotronics Pakistan will not be liable for indirect or consequential damages. Our maximum liability is limited to the amount paid by the user for the affected service.",
  },
  {
    title: "AI Chatbot Support",
    body: "Our AI chatbot helps answer course-related queries. AI responses are informational and not a substitute for professional advice.",
  },
  {
    title: "Robotics Kits Sales",
    body: "Physical kits are subject to availability. Images are for reference; specs and prices may change.",
  },
  {
    title: "Governing Law",
    body: "These Terms are governed by the laws of Punjab, Pakistan, and disputes will be resolved via arbitration in Punjab.",
  },
  {
    title: "Changes to Terms",
    body: "We may update these Terms periodically. Continued use after changes indicates acceptance.",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="bg-background p-8 lg:p-20">
      <article className="mx-auto flex max-w-3xl flex-col gap-8 pt-16 lg:pt-24">
        <header className="flex flex-col gap-2">
          <h1 className="poppins-bold text-4xl text-foreground">
            Terms &amp; Conditions
          </h1>
          <p className="lato-regular text-sm text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </header>

        <ol className="flex flex-col gap-6">
          {SECTIONS.map((section, idx) => (
            <li key={section.title} className="flex flex-col gap-2">
              <h2 className="poppins-semibold text-xl text-foreground md:text-2xl">
                {idx + 1}. {section.title}
              </h2>
              <p className="lato-regular text-base text-muted-foreground">
                {section.body}
              </p>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
};

export default TermsAndConditions;
