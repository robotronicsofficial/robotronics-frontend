/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./component/Layout";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { fetchCurrentUser } from "./lib/auth";
import { verifyChildSession } from "./lib/childSession";
import { queryClient } from "./lib/queryClient.js";
import { queryKeys } from "./lib/queryKeys";
import { loadSubscriptionCheckout } from "./lib/subscriptionCheckout";
import {
  CART_PATH,
  CONTACT_PATH,
  DASHBOARD_CHILD_PROFILE_PATH,
  SCREEN_PATH,
} from "./router/paths";
import { useSelectedPlanStore } from "./stores/selectedPlanStore";
import { clearActiveChildSession, getActiveChildSession } from "./utils/childSessionRequest";
import { getHeaderOffsetClass } from "./components/layout/headerOffset";

const ToastContainer = lazy(() => import("react-toastify").then((module) => ({
  default: module.ToastContainer,
})));

const Home = lazy(() => import("./pages/home"));
const AboutUs = lazy(() => import("./pages/about"));
const Shipping = lazy(() => import("./pages/shop/shipping"));
const Shop = lazy(() => import("./pages/shop"));
const Cart = lazy(() => import("./pages/shop/cart"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CustomerInfo = lazy(() => import("./pages/shop/customerInfo"));
const Course = lazy(() => import("./pages/courses"));
const ProductDetailPage = lazy(() => import("./pages/shop/ProductDetailPage"));
const CoursesProductDetail = lazy(() => import("./pages/courses/coursesProductDetail"));
const GiftCourse = lazy(() => import("./pages/gifts/GiftCourse"));
const ShippingService = lazy(() => import("./pages/shop/shippingService"));
const CareerJob = lazy(() => import("./pages/career/careerJob"));
const CareerDetailPage = lazy(() => import("./pages/career/careerDetailPage"));
const SubscriptionHome = lazy(() => import("./pages/subscriptions/SubscriptionHome"));
const SubscriptionRegister = lazy(() => import("./pages/subscriptions/register/SubscriptionRegister"));
const Blog = lazy(() => import("./pages/Blog/blog"));
const BlogDetail = lazy(() => import("./pages/Blog/blogDetail"));
const ContactUs = lazy(() => import("./pages/contactUs/contactUs"));
const UserInfo = lazy(() => import("./pages/Dashboard/userInfo"));
const MyCoursesPage = lazy(() => import("./pages/Dashboard/myCoursesPage"));
const WishList = lazy(() => import("./pages/Dashboard/wishList"));
const Payment = lazy(() => import("./pages/Dashboard/Payment"));
const Error = lazy(() => import("./pages/404/error"));
const CourseDetail = lazy(() => import("./pages/Dashboard/CourseDetail"));
const VideoGallery = lazy(() => import("./pages/International/videoGallery"));
const IServices = lazy(() => import("./pages/International/services"));
const IHome = lazy(() => import("./pages/International/home"));
const Screen = lazy(() => import("./pages/SplashScreen/screen"));
const Search = lazy(() => import("./component/search"));
const MyRobort = lazy(() => import("./pages/Dashboard/myRobot"));
const JobApplicationForm = lazy(() => import("./component/careers/CareerDetailPage/jobApplicationForm"));
const SubscriptionPaymentHome = lazy(() => import("./pages/subscriptions/payment/SubscriptionPaymentHome"));
const SubscriptionReviewOrderHome = lazy(() => import("./pages/subscriptions/review/SubscriptionReviewOrderHome"));
const ChildHome = lazy(() => import("./pages/ChildProtection/ChildHome"));
const TermsHome = lazy(() => import("./pages/policies/TermsHome"));
const PrivacyHome = lazy(() => import("./pages/PrivacyPolicy/PrivacyHome"));
const FAQs = lazy(() => import("./pages/policies/FAQs"));
const RefundPolicy = lazy(() => import("./pages/policies/RefundPolicy"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail/ServiceDetail"));
const ChildProfile = lazy(() => import("./pages/Dashboard/ChildProfile"));
const ProgressCertificate = lazy(() => import("./pages/Dashboard/ProgressCertificate"));
const SubscriptionProgressPage = lazy(() => import("./component/dashboard/SubscriptionProgressPage"));
const MyAllCourses = lazy(() => import("./component/dashboard/myAllCourses"));

const RouteFallback = () => (
  <div className={getHeaderOffsetClass("dashboardWide", "bg-background px-4 pb-16 text-center text-foreground")}>
    Loading page...
  </div>
);

const RouterError = ({ error }) => (
  <div className={getHeaderOffsetClass("dashboardWide", "bg-background px-6 pb-16 text-center text-foreground")}>
    <div className="mx-auto max-w-lg rounded-lg border border-border bg-card p-6">
      <h1 className="text-2xl font-semibold">Page failed to load</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {error?.message || "Refresh the page or try again from the previous screen."}
      </p>
    </div>
  </div>
);

const buildRedirectSearch = (location) => {
  const href = location?.href || `${location?.pathname || ""}${location?.searchStr || ""}${location?.hash || ""}`;
  return href && href !== "/Login" ? { redirect: href } : {};
};

const requireCurrentUser = async ({ context, location }) => {
  const user = await context.queryClient.fetchQuery({
    queryKey: queryKeys.auth.user,
    queryFn: fetchCurrentUser,
    retry: false,
  }).catch(() => null);

  if (!user) {
    throw redirect({
      to: "/Login",
      search: buildRedirectSearch(location),
      replace: true,
    });
  }

  return { currentUser: user };
};

const requireChildSession = async ({ context }) => {
  const childSession = getActiveChildSession();

  if (!childSession) {
    throw redirect({ to: DASHBOARD_CHILD_PROFILE_PATH, replace: true });
  }

  const isValid = await context.queryClient.fetchQuery({
    queryKey: queryKeys.childSession.verify(childSession.childId, childSession.sessionId),
    queryFn: () => verifyChildSession({
      childId: childSession.childId,
      sessionId: childSession.sessionId,
    }),
    retry: false,
    staleTime: 15_000,
  }).catch(() => false);

  if (!isValid) {
    clearActiveChildSession();
    throw redirect({ to: DASHBOARD_CHILD_PROFILE_PATH, replace: true });
  }

  return { childSession };
};

const hasSelectedSubscriptionPlan = () => {
  const selectedPlan = useSelectedPlanStore.getState();
  return Boolean(selectedPlan.planId && selectedPlan.billingCycle);
};

const hasSubscriptionCheckout = () => {
  const checkout = loadSubscriptionCheckout();
  return Boolean(checkout?.children?.length && checkout?.plan?.name);
};

const requireSelectedSubscriptionPlan = () => {
  if (!hasSelectedSubscriptionPlan()) {
    throw redirect({ to: "/subscriptions", replace: true });
  }
};

const requireSubscriptionCheckout = () => {
  if (!hasSubscriptionCheckout()) {
    throw redirect({ to: "/subscriptions/register", replace: true });
  }
};

const RootLayout = () => (
  <AuthProvider>
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
      <Suspense fallback={null}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    </Layout>
  </AuthProvider>
);

const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: RouterError,
  notFoundComponent: () => <Error />,
});

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  beforeLoad: requireCurrentUser,
});

const childSessionRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  id: "childSession",
  beforeLoad: requireChildSession,
});

const selectedSubscriptionPlanRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  id: "selectedSubscriptionPlan",
  beforeLoad: requireSelectedSubscriptionPlan,
});

const subscriptionCheckoutRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  id: "subscriptionCheckout",
  beforeLoad: requireSubscriptionCheckout,
});

const makeRoute = ({ parent = rootRoute, path, component: Component, beforeLoad }) => createRoute({
  getParentRoute: () => parent,
  path,
  beforeLoad,
  errorComponent: RouterError,
  component: () => <Component />,
});

const makeRedirectRoute = (path, to, parent = rootRoute) => createRoute({
  getParentRoute: () => parent,
  path,
  beforeLoad: () => {
    throw redirect({ to, replace: true });
  },
});

const publicRoute = (path, component) => makeRoute({ path, component });
const authRoute = (path, component) => makeRoute({ parent: authenticatedRoute, path, component });
const childRoute = (path, component) => makeRoute({ parent: childSessionRoute, path, component });

const routeTree = rootRoute.addChildren([
  publicRoute("/", Home),
  publicRoute("/Search", Search),
  publicRoute(SCREEN_PATH, Screen),
  publicRoute("/aboutUs", AboutUs),
  publicRoute(CART_PATH, Cart),
  publicRoute("/shop", Shop),
  publicRoute("/ProductDetailPage/$id", ProductDetailPage),
  publicRoute("/Shipping", Shipping),
  publicRoute("/ShippingService", ShippingService),
  publicRoute("/Course", Course),
  publicRoute("/CustomerInfo", CustomerInfo),
  publicRoute("/Login", Login),
  makeRedirectRoute("/login", "/Login"),
  publicRoute("/verifyEmail", VerifyEmail),
  publicRoute("/reset-password", ResetPassword),
  publicRoute("/Signup", Signup),
  makeRedirectRoute("/CoursesProduct", "/Course"),
  publicRoute("/CoursesProduct/$id", CoursesProductDetail),
  publicRoute("/gift-courses", GiftCourse),
  publicRoute("/CareerJob", CareerJob),
  makeRedirectRoute("/CareerDetailPage", "/CareerJob"),
  publicRoute("/CareerDetailPage/$id", CareerDetailPage),
  publicRoute("/JobApplicationForm", JobApplicationForm),
  publicRoute("/Blog", Blog),
  makeRedirectRoute("/BlogDetail", "/Blog"),
  publicRoute("/BlogDetail/$id", BlogDetail),
  publicRoute(CONTACT_PATH, ContactUs),
  publicRoute("/404", Error),
  publicRoute("/International/myRobot", MyRobort),
  publicRoute("/subscriptions", SubscriptionHome),
  publicRoute("/International/videoGallery", VideoGallery),
  publicRoute("/International/Iservices", IServices),
  publicRoute("/International/home", IHome),
  publicRoute("/ChildProtection", ChildHome),
  publicRoute("/TermsConditions", TermsHome),
  publicRoute("/PrivacyPolicy", PrivacyHome),
  publicRoute("/faqs", FAQs),
  publicRoute("/RefundPolicy", RefundPolicy),
  makeRedirectRoute("/ServiceDetail", "/International/Iservices"),
  publicRoute("/ServiceDetail/$id", ServiceDetail),
  authenticatedRoute.addChildren([
    authRoute("/Dashboard/userInfo", UserInfo),
    authRoute("/Dashboard/WishList", WishList),
    authRoute("/Dashboard/PaymentHistory", Payment),
    makeRedirectRoute("/Dashboard/PaymentDetails", "/Dashboard/PaymentHistory", authenticatedRoute),
    authRoute("/Dashboard/ChildProfile", ChildProfile),
    makeRedirectRoute("/Dashboard/userInfoForm", "/Dashboard/userInfo", authenticatedRoute),
    authRoute("/Dashboard/ProgressCertificate", ProgressCertificate),
    childSessionRoute.addChildren([
      childRoute("/Dashboard/MyCoursesPage", MyCoursesPage),
      childRoute("/Dashboard/myAllCourses", MyAllCourses),
      childRoute("/Dashboard/courseDetail/$id", CourseDetail),
      childRoute("/Dashboard/ProgressCertificate/ProgressPage", SubscriptionProgressPage),
    ]),
    selectedSubscriptionPlanRoute.addChildren([
      makeRoute({
        parent: selectedSubscriptionPlanRoute,
        path: "/subscriptions/register",
        component: SubscriptionRegister,
      }),
    ]),
    subscriptionCheckoutRoute.addChildren([
      makeRoute({
        parent: subscriptionCheckoutRoute,
        path: "/subscriptions/payment",
        component: SubscriptionPaymentHome,
      }),
      makeRoute({
        parent: subscriptionCheckoutRoute,
        path: "/subscriptions/review",
        component: SubscriptionReviewOrderHome,
      }),
    ]),
  ]),
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultPendingMs: 0,
  defaultPendingMinMs: 250,
  defaultPendingComponent: RouteFallback,
  defaultErrorComponent: RouterError,
  defaultNotFoundComponent: () => <Error />,
});

export default router;
