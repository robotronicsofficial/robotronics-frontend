import { useLocation } from 'react-router'
import Header from "../component/header";
import Footer from './footer';

const Layout = ({ children }) => {
  const hideNavbarPaths = ["/Search", "/screen", "/JobApplicationForm"];
  const location = useLocation(); // from react-router-dom

  const showNavbar =
    !hideNavbarPaths.includes(location.pathname) &&
    !location.pathname.startsWith("/CareerDetailPage");

  return (
    <>
      {showNavbar && <Header/>} {/* Global navigation bar */}
      <main>{children}</main>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
