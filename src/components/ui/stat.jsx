import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Trust-band stat: bold black number with a short mustard underline,
   then a muted label beneath. */
export const Stat = ({ value, label, className }) => (
  <div className={cn("flex flex-col items-start gap-3", className)}>
    <div className="flex flex-col gap-2">
      <span className="text-display-md text-foreground">{value}</span>
      <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-primary" />
    </div>
    <span className="text-body-sm text-muted-foreground">{label}</span>
  </div>
);

Stat.propTypes = {
  value: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
};
