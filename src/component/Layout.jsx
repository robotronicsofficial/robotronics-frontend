import React from "react";
import { useLocation } from 'react-router'
import Header from "../component/header";

const Layout = ({ children }) => {
  const hideNavbarPaths = ["/login", "/404", "/aboutUs", "/International/Iservices", "/International/videoGallery"];
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
