import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Header from "../component/header";
import Footer from "./footer";
import { SCREEN_PATH } from "../router/paths";
import useAos from "../hooks/useAos";

const Layout = ({ children }) => {
  const hideNavbarPaths = ["/Search", SCREEN_PATH, "/JobApplicationForm"];
  const location = useLocation();
  useAos();

  const showNavbar =
    !hideNavbarPaths.includes(location.pathname) &&
    !location.pathname.startsWith("/CareerDetailPage");

  return (
    <>
      {showNavbar && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
