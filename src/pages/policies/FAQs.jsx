import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Display } from "@/components/ui/typography";
import MarketingHero from "@/components/marketing/MarketingHero";

const FAQ_ITEMS = [
  {
    question: "Who can register for a learning subscription?",
    answer:
      "Any child aged 6 and up. Parents create one account and add a profile per child — siblings each need their own active subscription.",
  },
  {
    question: "Do you provide e-certificates?",
    answer:
      "Yes. Active learners earn e-certificates issued through STEMSOL.org, a US-based credentialing service recognized internationally.",
  },
  {
    question: "How do payments work?",
    answer:
      "All payments are processed online — no office visit required. Pick monthly or annual at checkout; annual subscriptions come with a steep discount.",
  },
  {
    question: "Which devices are required?",
    answer:
      "The platform is responsive across laptops, tablets, and phones. Any modern browser works — no special hardware required.",
  },
  {
    question: "How many children can use one subscription?",
    answer:
      "Each subscription covers one child. Parents can add additional children via the dashboard with separate billing.",
  },
  {
    question: "Can we pay in installments?",
    answer:
      "Yes. Choose monthly billing if you prefer smaller recurring payments.",
  },
  {
    question: "Can we cancel the subscription?",
    answer:
      "Yes — cancel from the parent dashboard whenever you like, no calls or forms. Subscriptions once paid are non-refundable for the current period.",
  },
  {
    question: "How do we add multiple child accounts?",
    answer:
      "Add children directly from the parent dashboard. Each child gets a dedicated 4-digit PIN for login.",
  },
  {
    question: "How is progress evaluated?",
    answer:
      "Courses are split into modules. After each module, the child must pass a quiz with at least 60% to unlock the next one.",
  },
  {
    question: "Which countries does Robotronics.ai serve?",
    answer:
      "The platform is SaaS-based and accessible globally to schools and parents in any country.",
  },
  {
    question: "What does it cost?",
    answer:
      "Current subscription pricing is shown during checkout, with both monthly and annual billing available.",
  },
];

const FAQs = () => (
  <>
    <MarketingHero
      size="page"
      align="left"
      containerSize="narrow"
      eyebrow="Help"
      title={<Display size="lg">Frequently asked questions</Display>}
      subtitle="The questions parents and schools ask first. Don't see yours? Reach out to support — we reply within a business day."
    />
    <section className="bg-background pb-20">
      <Container size="narrow" className="px-6">
        <FaqAccordion items={FAQ_ITEMS} />
      </Container>
    </section>
  </>
);

export default FAQs;
