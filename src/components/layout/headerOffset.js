import { cn } from "../../lib/utils";

const HEADER_OFFSET_CLASS = {
  page: "pt-44",
  auth: "pt-32 md:pt-36",
  compact: "pt-36",
  dashboard: "pt-44 md:pt-2",
  dashboardWide: "pt-40 md:pt-4",
  aboutHero: "pt-40 md:pt-48",
  blogHero: "pt-24 lg:pt-32",
  eventHero: "pt-20 md:pt-32 lg:pt-64",
};

export const getHeaderOffsetClass = (variant = "page", className) =>
  cn(HEADER_OFFSET_CLASS[variant] || HEADER_OFFSET_CLASS.page, className);
