import PropTypes from "prop-types";
import { BrandIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

// URLs are shared across footer, careers intros, about intro, etc.
// If any of these need to change, update them here in one place.
const SOCIAL = [
  {
    brand: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/robotronicspakistan/",
  },
  {
    brand: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/robotronicspk",
  },
  {
    brand: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
  },
  {
    brand: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/robotronicspk/?hl=en",
  },
  {
    brand: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
  },
  {
    brand: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/message/TKZZPIE2A34UM1",
  },
];

/**
 * Shared social-links row used across the marketing surface.
 * Keeps icon styling and URLs in a single source of truth.
 */
export default function SocialLinks({
  className = "",
  iconClassName = "size-5",
  ariaLabel = "Social media links",
}) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-3", className)}
      aria-label={ariaLabel}
    >
      {SOCIAL.map(({ brand, label, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <BrandIcon brand={brand} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
}

SocialLinks.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  ariaLabel: PropTypes.string,
};
