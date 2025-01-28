import { useLocation } from 'react-router'
import Header from "../component/header";

const Layout = ({ children }) => {
  const hideNavbarPaths = ["/Search", "/screen", "/CareerDetailPage", "/JobApplicationForm"];
  const location = useLocation(); // from react-router-dom

    const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Header />} {/* Global navigation bar */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
