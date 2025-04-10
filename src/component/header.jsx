import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/robotronicsCharacter.svg";
import basket from "../assets/logo/basket.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../contexts/AuthContext";
import Aos from "aos";
import { useSelector } from "react-redux";
import StarIcon from '@mui/icons-material/Star';

export default function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated: isAuth0Authenticated, logout: auth0Logout } = useAuth0();
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items) || 0;
  const totalItems = Object.values(cartItems).reduce(
    (acc, item) => acc + item.count,
    0
  );

  useEffect(() => {
    Aos.init(); // Initialize AOS library
    console.log("Current User:", currentUser);
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

  return (
    <header className="bg-transparent relative top-20 z-50">
      <div className="w-full h-full flex items-center justify-center absolute">
        <div className="bg-white flex flex-wrap items-center justify-between p-5 shadow w-[95vw] mt-6 mb-6 rounded-2xl">
          {/* Logo */}
          <a href="/" className="flex items-center" data-aos="fade-right" data-aos-duration="2000">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <h1 className="text-xs poppins-bold">
              ROBOTRONICS
              <br />
              <p className="poppins-bold text-gold">P A K I S T A N</p>
            </h1>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex md:items-center md:w-auto" data-aos="fade-down" data-aos-duration="2000">
            <div className="md:flex lg:space-x-6 space-x-3 flex-row">
              <NavLink
                className="mr-2 cursor-pointer poppins-light hover:text-shadow-md hover:text-black hover:border-b hover:border-black text-black text-lg transition duration-300"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/aboutUs"
              >
                Who We Are
              </NavLink>

              <NavLink
                className="mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/International/Iservices"
              >
                Services
              </NavLink>

              <NavLink
                className="mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/International/videoGallery"
              >
                Events
              </NavLink>

              <NavLink
                className="mr-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/shop"
              >
                Shop
              </NavLink>

              <NavLink
                className="cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg"
                to="/International/home"
              >
                International
              </NavLink>

              <NavLink
                className="cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg"
                to="/COntactUS"
              >
                Contact
              </NavLink>

              <NavLink
                className="cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg font-bold bg-yellow rounded-lg px-4"
                to="/Robogeniushome"
              >
                <StarIcon />
                RoboGenius
              </NavLink>
            </div>
          </nav>

          {/* User Actions */}
          <nav className="hidden md:flex md:items-center md:w-auto" data-aos="fade-left" data-aos-duration="2000">
            <div className="flex gap-x-2 items-center">
              {currentUser ? (
                <>
                  <span
                    className="text-black poppins-light capitalize cursor-pointer hover:font-medium w-[5vw]"
                    onClick={() => {
                      navigate("/Dashboard/userInfo");
                    }}
                  >
                    {currentUser.firstName
                      ? (currentUser.firstName.length > 7
                        ? `${currentUser.firstName.substring(0, 7)}..`
                        : currentUser.firstName)
                      : currentUser.email.split('@')[0]}
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
                  navigate("/cart");
                }}
              >
                <img src={basket} alt="basket"></img>
                {totalQuantity > 0 && (
                  <span className="absolute top-[-8px] right-[-10px] bg-signin text-white rounded-full text-xs font-bold px-2">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden border border-transparent rounded-md p-2" data-aos="fade-left" data-aos-duration="2000"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <img src={basket} alt="basket"></img>
              {totalQuantity > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-signin text-white rounded-full text-xs font-bold px-2">
                  {totalQuantity}
                </span>
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          <nav
            className={`${menuOpen ? "block" : "hidden"} md:hidden w-full mt-4`}
          >
            <div className="flex flex-col">
              {/* Mobile navigation links */}
              <NavLink
                to="/"
                className="mb-2 cursor-pointer hover:text-black hover:underline text-base"
              >
                Home
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/aboutUs"
              >
                About Us
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/International/Iservices"
              >
                Services
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/Course"
              >
                Courses
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/shop"
              >
                Shop
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/International/videoGallery"
              >
                Events
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer poppins-light hover:text-black hover:border-b hover:border-black text-black text-lg"
                to="/Blog"
              >
                Blog
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg"
                to="/International/home"
              >
                International
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg"
                to="/CareerJob"
              >
                Careers
              </NavLink>
              <NavLink
                className="mb-2 cursor-pointer hover:text-black poppins-light hover:border-b hover:border-black text-black text-lg"
                to="/COntactUS"
              >
                Contact
              </NavLink>

              {/* Mobile User Actions */}
              {currentUser ? (
                <>
                  <span
                    className="mb-2 text-black poppins-light capitalize cursor-pointer"
                    onClick={() => {
                      navigate("/Dashboard/Info");
                    }}
                  >
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="mb-2 py-1 px-4 rounded bg-signin text-white hover:bg-opacity-90 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/Signup"
                    className="mb-2 py-1 px-4 rounded cursor-pointer hover:bg-signin hover:text-white transition duration-300"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/Login"
                    className="mb-2 py-1 px-4 rounded cursor-pointer hover:bg-signin hover:text-white transition duration-300"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}