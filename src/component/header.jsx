import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/robotronicsCharacter.svg";
import basket from "../assets/logo/basket.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../contexts/AuthContext";
import Aos from "aos";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu"; // Import a proper menu icon
import { CART_PATH, CONTACT_PATH } from "../router/paths";

export default function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    loginWithRedirect,
    isAuthenticated: isAuth0Authenticated,
    logout: auth0Logout,
  } = useAuth0();
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items) || 0;
  const totalItems = Object.values(cartItems).reduce(
    (acc, item) => acc + item.count,
    0
  );

  useEffect(() => {
    Aos.init(); // Initialize AOS library
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    if (isAuth0Authenticated) {
      auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  // Close mobile menu when navigating
  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-transparent relative top-20 sm:top-20 z-50 w-full">
      <div className="w-full h-full flex items-center justify-center absolute">
        <div className="bg-white flex flex-wrap items-center justify-between p-3 sm:p-5 shadow w-[95vw] mt-6 mb-6 rounded-2xl">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img src={logo} alt="logo" className="w-12 h-12 sm:w-20 sm:h-20" />
            <h1 className="text-[10px] sm:text-xs poppins-bold">
              ROBOTRONICS
              <br />
              <p className="poppins-bold text-gold">P A K I S T A N</p>
            </h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav
            className="hidden md:flex md:items-center md:justify-center flex-grow"
            data-aos="fade-down"
            data-aos-duration="2000"
          >
            <div className="flex lg:space-x-6 space-x-2 flex-row flex-wrap justify-center">
              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer poppins-light hover:text-shadow-md hover:text-black hover:border-b hover:border-black text-black text-sm lg:text-lg transition duration-300"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to="/aboutUs"
              >
                Who We Are
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to="/International/Iservices"
              >
                Services
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to="/International/videoGallery"
              >
                Events
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to="/shop"
              >
                Shop
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to="/International/home"
              >
                International
              </NavLink>

              <NavLink
                className="mr-1 sm:mr-2 cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-sm lg:text-lg"
                to={CONTACT_PATH}
              >
                Contact
              </NavLink>

              <NavLink
                className="cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-sm lg:text-lg font-bold bg-yellow rounded-lg px-2 lg:px-4 flex items-center"
                to="/Robogeniushome"
              >
                <StarIcon fontSize="small" />
                <span className="ml-1">RoboGenius</span>
              </NavLink>
            </div>
          </nav>

          {/* User Actions - Desktop */}
          <div
            className="hidden md:flex md:items-center"
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <div className="flex gap-x-2 items-center ">
              {currentUser ? (
                <>
                  <span
                    className="text-black poppins-light capitalize cursor-pointer w-[10vw] hidden lg:block text-right"
                    onClick={() => {
                      navigate("/Dashboard/userInfo");
                    }}
                  >
                    {currentUser.firstName
                      ? currentUser.firstName
                      : currentUser.email.split("@")[0]}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="py-1 px-2 rounded bg-signin text-white hover:bg-opacity-90 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex border rounded-lg">
                  <NavLink
                    to="/Signup"
                    className="py-1 px-2 rounded m-2 cursor-pointer shadow-4xl focus:outline-none transition duration-300 hover:bg-signin hover:text-white"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/Login"
                    className="py-1 px-2 rounded m-2 cursor-pointer shadow-4xl focus:outline-none transition duration-300 hover:bg-signin hover:text-white"
                  >
                    Login
                  </NavLink>
                </div>
              )}
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  navigate(CART_PATH);
                }}
              >
                <img
                  src={basket}
                  alt="basket"
                  className="w-6 h-6 sm:w-auto sm:h-auto"
                />
                {totalQuantity > 0 && (
                  <span className="absolute top-[-8px] right-[-10px] bg-signin text-white rounded-full text-xs font-bold px-2">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center md:hidden gap-2">
            {/* Mobile Cart */}
            <div
              className="relative cursor-pointer mr-2"
              onClick={() => {
                navigate(CART_PATH);
              }}
            >
              <img src={basket} alt="basket" className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-signin text-white rounded-full text-xs font-bold px-2">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block md:hidden rounded-md p-1"
              data-aos="fade-left"
              data-aos-duration="2000"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <MenuIcon fontSize="medium" />
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`${
              menuOpen ? "fixed" : "hidden"
            } inset-0 bg-black bg-opacity-50 z-50 md:hidden`}
            onClick={toggleMenu}
          ></div>

          {/* Mobile Menu */}
          <nav
            className={`${
              menuOpen ? "fixed" : "hidden"
            } md:hidden top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-4 overflow-y-auto transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col">
              {/* Mobile navigation links */}
              <NavLink
                to="/"
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/aboutUs"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/International/Iservices"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/Course"
                onClick={() => setMenuOpen(false)}
              >
                Courses
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/shop"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/International/videoGallery"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/Blog"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/International/home"
                onClick={() => setMenuOpen(false)}
              >
                International
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to="/CareerJob"
                onClick={() => setMenuOpen(false)}
              >
                Careers
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                to={CONTACT_PATH}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                className="py-3 border-b cursor-pointer hover:bg-gray-100 px-2 font-bold flex items-center"
                to="/Robogeniushome"
                onClick={() => setMenuOpen(false)}
              >
                <StarIcon fontSize="small" />
                <span className="ml-1">RoboGenius</span>
              </NavLink>

              {/* Divider */}
              <div className="my-4 border-t"></div>

              {/* Mobile User Actions */}
              {currentUser ? (
                <>
                  <span
                    className="py-3 border-b text-black poppins-light capitalize cursor-pointer px-2 text-center"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/Dashboard/userInfo");
                    }}
                  >
                    {currentUser.displayName || currentUser.email.split("@")[0]}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="mt-4 py-2 px-4 rounded bg-signin text-white hover:bg-opacity-90 transition duration-300 w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <NavLink
                    to="/Signup"
                    className="py-2 px-4 rounded cursor-pointer bg-signin text-white text-center transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/Login"
                    className="py-2 px-4 rounded cursor-pointer border border-signin text-signin text-center transition duration-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
