import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, BookOpen, Star, LifeBuoy } from "lucide-react";

import { Display, Eyebrow, Text } from "@/components/ui/typography";
import robotIllustration from "../../assets/images/robot.svg";

const HELPFUL_LINKS = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: ShoppingBag },
  { label: "Courses", to: "/Course", icon: BookOpen },
  { label: "Subscriptions", to: "/subscriptions", icon: Star },
  { label: "Contact support", to: "/contact-us", icon: LifeBuoy },
];

const Error = () => (
  <div className="bg-background">
    <div
      className="mx-auto flex min-h-svh w-full max-w-xl flex-col items-center justify-center gap-8 px-6 py-16 text-center"
      data-aos="fade-up"
    >
      <img
        src={robotIllustration}
        alt=""
        aria-hidden="true"
        className="h-40 w-auto md:h-48"
      />

      <div className="flex flex-col gap-3">
        <Eyebrow tone="brand">404 · Page not found</Eyebrow>
        <Display size="md">Looks like that robot wandered off.</Display>
        <Text tone="muted">
          We couldn&apos;t find the page you were looking for. Try one of these:
        </Text>
      </div>

      <ul className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {HELPFUL_LINKS.map(({ label, to, icon: Icon }) => (
          <li key={to} className="flex">
            <Link
              to={to}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-body-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Error;
