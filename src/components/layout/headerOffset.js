import { cn } from "../../lib/utils";

const HEADER_OFFSET_CLASS = {
  page: "pt-header-page",
  auth: "pt-header-auth md:pt-header-auth-md",
  compact: "pt-header-compact",
  dashboard: "pt-header-page md:pt-header-dashboard-md",
  dashboardWide: "pt-header-dashboard-wide md:pt-header-dashboard-wide-md",
  aboutHero: "pt-header-about md:pt-header-about-md",
  blogHero: "pt-header-blog lg:pt-header-blog-lg",
  eventHero: "pt-header-event md:pt-header-event-md lg:pt-header-event-lg",
};

export const getHeaderOffsetClass = (variant = "page", className) =>
  cn(HEADER_OFFSET_CLASS[variant] || HEADER_OFFSET_CLASS.page, className);
