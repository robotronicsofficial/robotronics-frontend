import PropTypes from "prop-types";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/* FAQ list. Native `<details>` for accessibility + zero JS state.
   Chevron rotates 45° (Plus → X) and turns mustard when open. */
export const FaqAccordion = ({ items, className }) => (
  <div className={cn("flex flex-col divide-y divide-border", className)}>
    {items.map((item) => (
      <details
        key={item.question}
        className="group/faq py-5 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <span className="text-body font-semibold">{item.question}</span>
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all group-open/faq:rotate-45 group-open/faq:border-primary group-open/faq:bg-primary group-open/faq:text-primary-foreground"
          >
            <Plus className="size-4" />
          </span>
        </summary>
        <div className="pt-3 pr-12 text-body-sm text-muted-foreground">
          {item.answer}
        </div>
      </details>
    ))}
  </div>
);

FaqAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.node.isRequired,
      answer: PropTypes.node.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};
