import { CART_PATH, CONTACT_PATH, COURSE_PATH } from "@/router/paths";

/**
 * Single source of truth for the marketing site navigation.
 * Used by HeaderNav (desktop) and HeaderMobileMenu (sheet).
 */

export const PRIMARY_NAV = [
  { to: COURSE_PATH, label: "Courses" },
  { to: "/subscriptions", label: "Plans" },
  { to: "/shop", label: "Shop" },
];

export const RESOURCES_NAV = {
  label: "Resources",
  items: [
    {
      to: "/International/Iservices",
      label: "Services",
      description: "What we run for schools and homes.",
    },
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
    {
      to: "/aboutUs",
      label: "About",
      description: "Who we are and why we build.",
    },
    {
      to: "/International/home",
      label: "International",
      description: "Programs around the world.",
    },
    {
      to: "/CareerJob",
      label: "Careers",
      description: "Join the team.",
    },
    {
      to: CONTACT_PATH,
      label: "Contact",
      description: "Talk to us.",
    },
  ],
};

export const ACCOUNT_NAV = [
  { to: "/Dashboard/userInfo", label: "My account" },
  { to: "/Dashboard/MyCoursesPage", label: "My courses" },
  { to: "/Dashboard/WishList", label: "Wishlist" },
  { to: "/Dashboard/PaymentHistory", label: "Payments" },
];

export { CART_PATH };
