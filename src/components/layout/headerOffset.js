import { cn } from "../../lib/utils";

/* The site header is a single fixed height (`--spacing-header`).
   Pages clear it with `pt-header`; this helper merges that with caller styles. */
export const getHeaderOffsetClass = (className) => cn("pt-header", className);
