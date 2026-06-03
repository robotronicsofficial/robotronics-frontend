import PropTypes from "prop-types";
import { BrandIcon } from "@/components/ui/brand-icons";
import { SOCIAL_LINKS } from "@/lib/brandContact";
import { cn } from "@/lib/utils";

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
      {SOCIAL_LINKS.map(({ brand, label, href }) => (
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
