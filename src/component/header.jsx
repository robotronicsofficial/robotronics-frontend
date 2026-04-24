import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/robotronicsCharacter.svg";
import basket from "../assets/logo/basket.svg";
import { useAuth } from "../contexts/useAuth";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoStarSharp, IoClose, IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CART_PATH, CONTACT_PATH } from "../router/paths";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/aboutUs", label: "About Us" },
  { to: "/International/Iservices", label: "Services" },
  { to: "/Course", label: "Courses" },
  { to: "/International/videoGallery", label: "Events" },
  { to: "/shop", label: "Shop" },
  { to: "/Blog", label: "Blog" },
  { to: "/International/home", label: "International" },
  { to: "/CareerJob", label: "Careers" },
  { to: CONTACT_PATH, label: "Contact" },
];

const FEATURED_ITEM = { to: "/subscriptions", label: "Subscriptions" };

const navLinkClass = ({ isActive }) =>
  [
    "cursor-pointer poppins-light text-sm lg:text-base transition duration-200",
    "border-b-2",
    isActive
      ? "text-black border-signin"
      : "text-black border-transparent hover:border-black",
  ].join(" ");

const readCurrentUserLabel = (currentUser) => {
  if (!currentUser) return "";
  const displayName = currentUser.name || currentUser.username || currentUser.firstName;
  if (displayName) return displayName;
  return currentUser.email?.split("@")[0] || "";
};

function UserMenu({ label, onProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1 hover:bg-gray-50 transition duration-200"
      >
        <FaUserCircle className="text-xl text-brown" />
        <span className="poppins-light text-sm capitalize max-w-[10rem] truncate">
          {label}
        </span>
        <IoChevronDown
          className={`text-sm text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[12rem] rounded-lg bg-white shadow-lg ring-1 ring-black/10 z-[100] py-1"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onProfile();
            }}
            className="block w-full text-left px-4 py-2 text-sm poppins-light text-black hover:bg-gray-50 transition duration-150"
          >
            Dashboard
          </button>
          <div className="border-t border-gray-100 my-1" aria-hidden="true" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full text-left px-4 py-2 text-sm poppins-light text-signin hover:bg-gray-50 transition duration-150"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function CartButton({ totalQuantity, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ""}`}
      className={`relative cursor-pointer ${className}`}
    >
      <img src={basket} alt="" className="w-6 h-6" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-signin text-white rounded-full text-xs font-bold px-1.5 py-0.5 min-w-[1.25rem] text-center">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const currentUserLabel = readCurrentUserLabel(currentUser);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const goToDashboard = () => navigate("/Dashboard/userInfo");
  const goToCart = () => navigate(CART_PATH);

  return (
    <header className="bg-transparent relative top-20 z-50 w-full">
      <div className="w-full h-full flex items-center justify-center absolute">
        <div className="bg-white flex items-center justify-between gap-4 p-3 sm:p-5 shadow w-[95vw] mt-6 mb-6 rounded-2xl">
          {/* Logo */}
          <NavLink
            to="/"
            end
            className="flex items-center gap-2 shrink-0"
            data-aos="fade-right"
          >
            <img src={logo} alt="Robotronics Pakistan" className="w-12 h-12 sm:w-20 sm:h-20" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] sm:text-xs poppins-bold">ROBOTRONICS</span>
              <span className="text-[10px] sm:text-xs poppins-bold text-gold tracking-widest">
                PAKISTAN
              </span>
            </div>
          </NavLink>

          {/* Navigation - Desktop */}
          <nav
            className="hidden lg:flex lg:items-center lg:justify-center flex-grow min-w-0"
            data-aos="fade-down"
          >
            <ul className="flex items-center gap-x-5 xl:gap-x-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to={FEATURED_ITEM.to}
                  className={({ isActive }) =>
                    [
                      "poppins-bold text-sm lg:text-base rounded-lg px-3 py-1 flex items-center gap-1 transition duration-200",
                      "bg-yellow text-black hover:bg-darkgold hover:text-white",
                      isActive ? "ring-2 ring-signin ring-offset-2" : "",
                    ].join(" ")
                  }
                >
                  <IoStarSharp className="text-sm" />
                  <span>{FEATURED_ITEM.label}</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* User Actions - Desktop */}
          <div
            className="hidden lg:flex lg:items-center gap-3 shrink-0"
            data-aos="fade-left"
          >
            {currentUser ? (
              <UserMenu
                label={currentUserLabel}
                onProfile={goToDashboard}
                onLogout={logout}
              />
            ) : (
              <div className="flex border rounded-lg">
                <NavLink
                  to="/Signup"
                  className="py-1 px-3 rounded m-1 cursor-pointer focus:outline-none transition duration-200 hover:bg-signin hover:text-white"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/Login"
                  className="py-1 px-3 rounded m-1 cursor-pointer focus:outline-none transition duration-200 hover:bg-signin hover:text-white"
                >
                  Login
                </NavLink>
              </div>
            )}
            <CartButton totalQuantity={totalQuantity} onClick={goToCart} />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center lg:hidden gap-3 shrink-0">
            <CartButton totalQuantity={totalQuantity} onClick={goToCart} />
            <button
              type="button"
              className="rounded-md p-1"
              data-aos="fade-left"
              onClick={toggleMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`${menuOpen ? "fixed" : "hidden"} inset-0 bg-black/50 z-50 lg:hidden`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <nav
            className={`${
              menuOpen ? "fixed" : "hidden"
            } lg:hidden top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 p-4 overflow-y-auto transition-all duration-300 ease-in-out`}
            aria-label="Mobile navigation"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-gray-500 hover:text-black p-1"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-3 border-b cursor-pointer px-2 poppins-light transition duration-150 ${
                        isActive ? "bg-gray-100 text-signin" : "hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to={FEATURED_ITEM.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-3 border-b cursor-pointer px-2 poppins-bold transition duration-150 ${
                      isActive ? "bg-yellow" : "hover:bg-gray-50"
                    }`
                  }
                >
                  <IoStarSharp className="text-sm" />
                  <span>{FEATURED_ITEM.label}</span>
                </NavLink>
              </li>
            </ul>

            <div className="my-4 border-t" />

            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 py-3 px-2 text-left capitalize poppins-light hover:bg-gray-50 transition duration-150 rounded"
                  onClick={() => {
                    closeMenu();
                    goToDashboard();
                  }}
                >
                  <FaUserCircle className="text-xl text-brown" />
                  <span className="truncate">{currentUserLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="py-2 px-4 rounded border border-signin text-signin hover:bg-signin hover:text-white transition duration-200 w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/Signup"
                  className="py-2 px-4 rounded cursor-pointer bg-signin text-white text-center transition duration-200"
                  onClick={closeMenu}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/Login"
                  className="py-2 px-4 rounded cursor-pointer border border-signin text-signin text-center transition duration-200"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
