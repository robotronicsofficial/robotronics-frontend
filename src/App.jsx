import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/home";
import AboutUs from "./pages/about";
import Shipping from "./pages/shop/shipping";
import Shop from "./pages/shop";
import Cart from "./pages/shop/cart";
import Signup from "./pages/signup";
import Login from "./pages/login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import CustomerInfo from "./pages/shop/customerInfo";
import Course from "./pages/courses";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import CoursesProductDetail from "./pages/courses/coursesProductDetail";
import ShippingService from "./pages/shop/shippingService";
import CareerJob from "./pages/career/careerJob";
import Robogeniushome from "./pages/RoboGenius/Robogeniushome";
import Robogeniusregister from "./pages/RoboGenius/RogoGeniusRegister/Robogeniusregister";
import CareerDetailPage from "./pages/career/careerDetailPage";
import Blog from "./pages/Blog/blog";
import BlogDetail from "./pages/Blog/blogDetail";
import ContactUs from "./pages/contactUs/contactUs";
import UserInfo from "./pages/Dashboard/userInfo";
import Order from "./pages/Dashboard/order";
import MyCoursesPage from "./pages/Dashboard/myCoursesPage";
import WishList from "./pages/Dashboard/wishList";
import Payment from "./pages/Dashboard/Payment";
import Error from "./pages/404/error";
import UserInfoForm from "./pages/Dashboard/userInfoForm";
import CourseDetail from "./pages/Dashboard/CourseDetail";
import VideoGallery from "./pages/International/videoGallery";
import IServices from "./pages/International/services";
import IHome from "./pages/International/home";
import Screen from "./pages/SplashScreen/screen";
import Search from "./component/search";
import MyRobort from './pages/Dashboard/myRobot';
import JobApplicationForm from "./component/careers/CareerDetailPage/jobApplicationForm";
import Robogeniuspaymenthome from "./pages/RoboGenius/RoboGeniusPayment/Robogeniuspaymenthome";
import Robogeniusrevieworderhome from "./pages/RoboGenius/RoboGeniusReview/Robogeniusrevieworderhome";
import GiftCourse from "./pages/RoboGenius/RobogeniusGift/GiftCourse";
import ChildHome from "./pages/child protection/ChildHome";
import TermsHome from "./pages/policies/TermsHome";
import PrivacyHome from "./pages/Privacy Policy/PrivacyHome";
import FAQs from "./pages/policies/FAQs";
import RefundPolicy from "./pages/policies/RefundPolicy";





import ServiceDetail from "./pages/service detail/ServiceDetail";
import PaymentDetail from "./pages/Dashboard/PaymentDetail";
import ChildProfile from "./pages/Dashboard/ChildProfile";
import ProgressCertificate from "./pages/Dashboard/ProgressCertificate";
import RoboGeniusProgressPage from "./component/dashboard/RoboGeniusProgressPage";
import MyAllCourses from "./component/dashboard/myAllCourses";

import ProtectedChild from "./component/ProtectedChild";
import ProtectedRoute from './component/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Search" element={<Search />} />
          <Route path="/Screen" element={<Screen />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/Cart" element={<Cart />} />
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
          <Route path="/CoursesProduct/:id?" element={<CoursesProductDetail />} />
          <Route path="/CareerJob" element={<CareerJob />} />
          <Route path="/CareerDetailPage" element={<CareerDetailPage />} />
          <Route path="/JobApplicationForm" element={<JobApplicationForm />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/BlogDetail" element={<BlogDetail />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Dashboard/userInfo" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
          <Route path="/Dashboard/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />


          <Route path="/Dashboard/MyCoursesPage/:id" element={<ProtectedChild><MyCoursesPage /></ProtectedChild>} />
          <Route path="/Dashboard/MyCoursesPage" element={<ProtectedChild><MyCoursesPage /></ProtectedChild>} />
          <Route path="/Dashboard/myAllCourses/:id" element={<ProtectedChild><MyAllCourses /></ProtectedChild>} />


          <Route path="/Dashboard/WishList" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
          <Route path="/Dashboard/PaymentHistory" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/Dashboard/PaymentDetails" element={<ProtectedRoute><PaymentDetail /></ProtectedRoute>} />
          <Route path="/Dashboard/ChildProfile" element={<ProtectedRoute><ChildProfile /></ProtectedRoute>} />
          <Route path="/Dashboard/userInfoForm" element={<ProtectedRoute><UserInfoForm /></ProtectedRoute>} />
          <Route path="/Dashboard/courseDetail/:id" element={<ProtectedChild><CourseDetail /></ProtectedChild>} />
          <Route path="/Dashboard/ProgressCertificate" element={<ProtectedRoute><ProgressCertificate /></ProtectedRoute>} />
          <Route path="/Dashboard/ProgressCertificate/ProgressPage" element={<ProtectedRoute><RoboGeniusProgressPage /></ProtectedRoute>} />
          <Route path="/404" element={<Error />} />

          <Route path="/International/myRobot" element={<MyRobort />} />
          <Route path="/Robogeniushome" element={<Robogeniushome />} />
          <Route path="/Robogeniushome/GiftCourse" element={<GiftCourse />} />
          <Route path="/Robogeniushome/Register" element={<Robogeniusregister />} />
          <Route path="/Robogeniushome/Payment" element={<Robogeniuspaymenthome />} />
          <Route path="/Robogeniushome/Review" element={<Robogeniusrevieworderhome />} />
          <Route path="/International/videoGallery" element={<VideoGallery />} />
          <Route path="/International/Iservices" element={<IServices />} />
          <Route path="/International/home" element={<IHome />} />
          <Route path="/ChildProtection" element={<ChildHome />} />
          
          <Route path="/TermsConditions" element={<TermsHome />} />
          <Route path="/PrivacyPolicy" element={<PrivacyHome />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          <Route path="/ServiceDetail" element={<ServiceDetail />} />
        </Routes>
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
      </Layout>
    </Router>
  );
}

export default App;
