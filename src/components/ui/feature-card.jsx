import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Feature grid card: outline icon (turns mustard on hover), title, description.
   Hover lifts a subtle shadow per the brand brief. */
export const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div
    className={cn(
      "group/feature flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md",
      className,
    )}
  >
    <span
      aria-hidden="true"
      className="grid size-11 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors group-hover/feature:border-primary group-hover/feature:text-primary"
    >
      <Icon className="size-5" />
    </span>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-h5 text-foreground">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  className: PropTypes.string,
};
