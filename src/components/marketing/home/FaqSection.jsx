import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const FAQ_ITEMS = [
  {
    question: "Who can join Robotronics.ai?",
    answer:
      "Any child aged 6–16. Parents create one account and add a profile for each kid in the household.",
  },
  {
    question: "What devices do we need?",
    answer:
      "Anything with a modern browser — mobile, tablet, or desktop. No special hardware required to get started.",
  },
  {
    question: "How does the AI trainer work?",
    answer:
      "It walks your child through lessons, answers questions in plain language, and quizzes them after every module so the learning actually sticks.",
  },
  {
    question: "Can I track my child's progress?",
    answer:
      "Yes. The parent dashboard shows time spent, courses completed, certificates earned, and personalized performance insights.",
  },
  {
    question: "Are the certificates recognized?",
    answer:
      "Every completed module ships with an internationally recognized e-certificate kids can add to a portfolio or share with their school.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Subscriptions are month-to-month or annual; cancel from the dashboard whenever you like — no calls, no forms.",
  },
];

export const FaqSection = () => (
  <section className="bg-muted/40 py-20 md:py-28">
    <Container size="wide">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[24rem_1fr] lg:gap-20">
        <div className="flex flex-col gap-4">
          <Eyebrow>Questions</Eyebrow>
          <Heading level={2} className="text-display-md">
            The things parents ask first.
          </Heading>
          <Text tone="muted">
            Not seeing your question? Reach out to support — we answer within a business day.
          </Text>
        </div>
        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </Container>
  </section>
);
