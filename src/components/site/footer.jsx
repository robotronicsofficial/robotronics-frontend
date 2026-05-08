import { Link } from "@tanstack/react-router";

import logoMark from "@/assets/logo/robotronicsCharacter.svg";
import { BrandIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Eyebrow, Text } from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";
import { cn } from "@/lib/utils";
import { CONTACT_PATH } from "@/router/paths";

const QUICK_LINKS = [
  { label: "About", to: "/aboutUs" },
  { label: "Subscriptions", to: "/subscriptions" },
  { label: "Courses", to: "/Course" },
  { label: "Shop", to: "/shop" },
  { label: "Blog", to: "/Blog" },
  { label: "Careers", to: "/CareerJob" },
];

const RESOURCE_LINKS = [
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: CONTACT_PATH },
  { label: "Child protection", to: "/ChildProtection" },
  { label: "Terms & conditions", to: "/TermsConditions" },
  { label: "Privacy policy", to: "/PrivacyPolicy" },
  { label: "Refund policy", to: "/RefundPolicy" },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/robotronicspakistan/",
    brand: "facebook",
    label: "Robotronics on Facebook",
  },
  {
    href: "https://www.instagram.com/robotronicspk/?hl=en",
    brand: "instagram",
    label: "Robotronics on Instagram",
  },
  {
    href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
    brand: "linkedin",
    label: "Robotronics on LinkedIn",
  },
  {
    href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
    brand: "youtube",
    label: "Robotronics on YouTube",
  },
  {
    href: "https://wa.me/message/TKZZPIE2A34UM1",
    brand: "whatsapp",
    label: "Robotronics on WhatsApp",
  },
];

const linkClass = "text-background/70 transition-colors hover:text-primary";
const headingClass = "text-caption font-semibold uppercase tracking-[0.16em] text-background/55";

const FooterColumn = ({ heading, items, className }) => (
  <nav aria-label={heading} className={cn("flex flex-col gap-3", className)}>
    <span className={headingClass}>{heading}</span>
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.to}>
          <Link to={item.to} className={cn(linkClass, "text-body-sm")}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const ContactColumn = () => (
  <div className="flex flex-col gap-3">
    <span className={headingClass}>Get in touch</span>
    <ul className="flex flex-col gap-3 text-body-sm text-background/70">
      <li>
        <span className="block text-caption uppercase tracking-wide text-background/45">
          Email
        </span>
        <a className={linkClass} href="mailto:support@robotronicsofficial.com">
          support@robotronicsofficial.com
        </a>
      </li>
      <li>
        <span className="block text-caption uppercase tracking-wide text-background/45">
          Phone
        </span>
        <a className={linkClass} href="tel:+923207626842">
          +92 320 7626 842
        </a>
      </li>
      <li>
        <span className="block text-caption uppercase tracking-wide text-background/45">
          Office
        </span>
        Phase-4, DHA, Lahore, Pakistan
      </li>
    </ul>
  </div>
);

const Brand = () => (
  <Link
    to="/"
    aria-label="Robotronics — home"
    className="inline-flex items-center gap-2.5 text-background transition-opacity hover:opacity-80"
  >
    <img src={logoMark} alt="" aria-hidden="true" className="size-8 shrink-0" />
    <span className="text-h4 font-semibold tracking-tight">Robotronics</span>
  </Link>
);

const Footer = () => (
  <SectionInverse as="footer" className="mt-0">
    <Container size="wide" className="py-16 md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
        <div className="flex flex-col gap-5">
          <Brand />
          <Text size="sm" className="max-w-sm text-background/70">
            AI, Coding, Robotics &amp; 30+ skills under one parent account.
            Every active child has a separate paid seat.
          </Text>
          <div className="mt-2 flex flex-col gap-2">
            <Eyebrow className="text-background/55">Follow along</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map(({ href, brand, label }) => (
                <li key={brand}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-full border border-background/15 text-background/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <BrandIcon brand={brand} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <FooterColumn heading="Explore" items={QUICK_LINKS} />
          <FooterColumn heading="Resources" items={RESOURCE_LINKS} />
          <ContactColumn />
        </div>
      </div>
    </Container>

    <div className="border-t border-background/10">
      <Container size="wide" className="flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
        <Text size="sm" className="text-background/55">
          © {new Date().getFullYear()} Robotronics.ai. All rights reserved.
        </Text>
        <Text size="sm" className="text-background/55">
          Made for the future-ready generation.
        </Text>
      </Container>
    </div>
  </SectionInverse>
);

export default Footer;
