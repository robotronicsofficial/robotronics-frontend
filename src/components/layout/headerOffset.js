import { cn } from "../../lib/utils";

const HEADER_OFFSET_CLASS = {
  page: "pt-44",
  auth: "pt-32 md:pt-36",
  compact: "pt-36",
  dashboard: "pt-44 md:pt-2",
  dashboardWide: "pt-40 md:pt-4",
};

export const getHeaderOffsetClass = (variant = "page", className) =>
  cn(HEADER_OFFSET_CLASS[variant] || HEADER_OFFSET_CLASS.page, className);
