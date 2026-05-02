import { CART_PATH, CONTACT_PATH, COURSE_PATH } from "@/router/paths";

/**
 * Single source of truth for the marketing site navigation.
 * Used by HeaderNav (desktop) and HeaderMobileMenu (sheet).
 */

export const PRIMARY_NAV = [
  { to: COURSE_PATH, label: "Courses" },
  { to: "/International/Iservices", label: "Services" },
  { to: "/shop", label: "Shop" },
  { to: "/subscriptions", label: "Plans" },
];

export const RESOURCES_NAV = {
  label: "Resources",
  items: [
    {
      to: "/International/videoGallery",
      label: "Events",
      description: "Workshops, competitions, and demos.",
    },
    {
      to: "/Blog",
      label: "Blog",
      description: "Articles, tutorials, and stories.",
    },
  ],
};

export const COMPANY_NAV = {
  label: "Company",
  items: [
    { to: "/aboutUs", label: "About" },
    { to: "/International/home", label: "International" },
    { to: "/CareerJob", label: "Careers" },
    { to: CONTACT_PATH, label: "Contact" },
  ],
};

export const ACCOUNT_NAV = [
  { to: "/Dashboard/userInfo", label: "My account" },
  { to: "/Dashboard/MyCoursesPage", label: "My courses" },
  { to: "/Dashboard/WishList", label: "Wishlist" },
  { to: "/Dashboard/PaymentHistory", label: "Payments" },
];

export { CART_PATH };
