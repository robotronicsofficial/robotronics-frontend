import { Suspense, lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { CART_PATH, CONTACT_PATH, SCREEN_PATH } from "./router/paths";

const ProtectedChild = lazy(() => import("./component/ProtectedChild"));
const ProtectedRoute = lazy(() => import("./component/ProtectedRoute"));
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
const ChildHome = lazy(() => import("./pages/child protection/ChildHome"));
const TermsHome = lazy(() => import("./pages/policies/TermsHome"));
const PrivacyHome = lazy(() => import("./pages/Privacy Policy/PrivacyHome"));
const FAQs = lazy(() => import("./pages/policies/FAQs"));
const RefundPolicy = lazy(() => import("./pages/policies/RefundPolicy"));
const ServiceDetail = lazy(() => import("./pages/service detail/ServiceDetail"));
const ChildProfile = lazy(() => import("./pages/Dashboard/ChildProfile"));
const ProgressCertificate = lazy(() => import("./pages/Dashboard/ProgressCertificate"));
const SubscriptionProgressPage = lazy(() => import("./component/dashboard/SubscriptionProgressPage"));
const MyAllCourses = lazy(() => import("./component/dashboard/myAllCourses"));

const RouteFallback = () => (
  <div className="bg-background px-4 pb-16 pt-40 text-center text-brown">
    Loading page...
  </div>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/Search" element={<Search />} />
          <Route path={SCREEN_PATH} element={<Screen />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path={CART_PATH} element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
          <Route path="/Shipping" element={<Shipping />} />
          <Route path="/ShippingService" element={<ShippingService />} />
          <Route path="/Course" element={<Course />} />
          <Route path="/CustomerInfo" element={<CustomerInfo />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/Signup" element={<Signup />} />
          <Route path="/CoursesProduct" element={<Navigate to="/Course" replace />} />
          <Route path="/CoursesProduct/:id" element={<CoursesProductDetail />} />
          <Route path="/gift-courses" element={<GiftCourse />} />
          <Route path="/CareerJob" element={<CareerJob />} />
          <Route path="/CareerDetailPage" element={<Navigate to="/CareerJob" replace />} />
          <Route path="/CareerDetailPage/:id" element={<CareerDetailPage />} />
          <Route path="/JobApplicationForm" element={<JobApplicationForm />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/BlogDetail" element={<Navigate to="/Blog" replace />} />
          <Route path="/BlogDetail/:id" element={<BlogDetail />} />
          <Route path={CONTACT_PATH} element={<ContactUs />} />
          <Route path="/Dashboard/userInfo" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />

          <Route path="/Dashboard/MyCoursesPage/:id" element={<ProtectedChild><MyCoursesPage /></ProtectedChild>} />
          <Route path="/Dashboard/MyCoursesPage" element={<ProtectedChild><MyCoursesPage /></ProtectedChild>} />
          <Route path="/Dashboard/myAllCourses/:id" element={<ProtectedChild><MyAllCourses /></ProtectedChild>} />

          <Route path="/Dashboard/WishList" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
          <Route path="/Dashboard/PaymentHistory" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/Dashboard/PaymentDetails" element={<Navigate to="/Dashboard/PaymentHistory" replace />} />
          <Route path="/Dashboard/ChildProfile" element={<ProtectedRoute><ChildProfile /></ProtectedRoute>} />
          <Route path="/Dashboard/userInfoForm" element={<Navigate to="/Dashboard/userInfo" replace />} />
          <Route path="/Dashboard/courseDetail/:id" element={<ProtectedChild><CourseDetail /></ProtectedChild>} />
          <Route path="/Dashboard/ProgressCertificate" element={<ProtectedRoute><ProgressCertificate /></ProtectedRoute>} />
          <Route path="/Dashboard/ProgressCertificate/ProgressPage" element={<ProtectedChild><SubscriptionProgressPage /></ProtectedChild>} />
          <Route path="/404" element={<Error />} />

          <Route path="/International/myRobot" element={<MyRobort />} />
          <Route path="/subscriptions" element={<SubscriptionHome />} />
          <Route path="/subscriptions/register" element={<SubscriptionRegister />} />
          <Route path="/subscriptions/payment" element={<SubscriptionPaymentHome />} />
          <Route path="/subscriptions/review" element={<SubscriptionReviewOrderHome />} />
          <Route path="/International/videoGallery" element={<VideoGallery />} />
          <Route path="/International/Iservices" element={<IServices />} />
          <Route path="/International/home" element={<IHome />} />
          <Route path="/ChildProtection" element={<ChildHome />} />
          
          <Route path="/TermsConditions" element={<TermsHome />} />
          <Route path="/PrivacyPolicy" element={<PrivacyHome />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          <Route path="/ServiceDetail" element={<Navigate to="/International/Iservices" replace />} />
          <Route path="/ServiceDetail/:id" element={<ServiceDetail />} />
          <Route path="*" element={<Error />} />
        </Routes>
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
  );
}

export default App;
