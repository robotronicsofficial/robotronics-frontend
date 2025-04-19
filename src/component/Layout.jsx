import { useLocation } from 'react-router'
import Header from "../component/header";
import Footer from './footer';

const Layout = ({ children }) => {
  const hideNavbarPaths = ["/Search", "/screen", "/CareerDetailPage", "/JobApplicationForm"];
  const location = useLocation(); // from react-router-dom

    const showNavbar = !hideNavbarPaths.includes(location.pathname);

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
