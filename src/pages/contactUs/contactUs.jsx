import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";
import ContactUsForm from "@/components/site/contactUs/contactUsForm";

const ContactHero = () => (
  <section className="bg-background pt-header pb-12">
    <Container size="wide">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>Contact</Eyebrow>
        <Display size="lg">
          Let&apos;s build the <Highlight>future-ready classroom</Highlight> together.
        </Display>
        <Text size="lg" tone="muted" className="max-w-2xl">
          Bringing AI &amp; Robotics to your school — or evaluating Robotronics.ai for your child? Reach out and we&apos;ll get back within a business day.
        </Text>
      </div>
    </Container>
  </section>
);

const ContactUs = () => (
  <>
    <ContactHero />
    <ContactUsForm />
  </>
);

export default ContactUs;
