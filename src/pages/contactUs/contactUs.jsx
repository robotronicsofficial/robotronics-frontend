import { Display, Highlight } from "@/components/ui/typography";
import MarketingHero from "@/components/marketing/MarketingHero";
import ContactUsForm from "@/components/site/contactUs/contactUsForm";

const ContactHero = () => (
  <MarketingHero
    size="page"
    eyebrow="Contact"
    title={
      <Display size="md">
        Let&apos;s build the <Highlight>future-ready classroom</Highlight> together.
      </Display>
    }
    subtitle="Bringing AI & Robotics to your school — or evaluating Robotronics.ai for your child? Reach out and we'll get back within a business day."
  />
);

const ContactUs = () => (
  <>
    <ContactHero />
    <ContactUsForm />
  </>
);

export default ContactUs;
