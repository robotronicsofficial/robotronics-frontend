import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo/robotronicsCharacter.svg";
import basket from "../assets/logo/basket.svg";
import { useAuth } from "../contexts/useAuth";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoStarSharp, IoClose, IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CART_PATH, CONTACT_PATH } from "../router/paths";

const PRIMARY_ITEMS = [
  { to: "/Course", label: "Courses" },
  { to: "/International/Iservices", label: "Services" },
  { to: "/shop", label: "Shop" },
];

const LEARN_GROUP = {
  label: "Resources",
  items: [
    { to: "/International/videoGallery", label: "Events", description: "Workshops and competitions" },
    { to: "/Blog", label: "Blog", description: "Articles and tutorials" },
  ],
};

const COMPANY_GROUP = {
  label: "Company",
  items: [
    { to: "/aboutUs", label: "About Us" },
    { to: "/International/home", label: "International" },
    { to: "/CareerJob", label: "Careers" },
    { to: CONTACT_PATH, label: "Contact" },
  ],
};

const FEATURED_ITEM = { to: "/subscriptions", label: "Subscriptions" };

const MOBILE_SECTIONS = [
  { label: "Home", items: [{ to: "/", label: "Home", end: true }] },
  LEARN_GROUP,
  { label: "Browse", items: PRIMARY_ITEMS },
  COMPANY_GROUP,
];

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

function useDismissableMenu(onDismiss) {
  const ref = useRef(null);

  useEffect(() => {
    const handlePointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onDismiss();
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onDismiss]);

  return ref;
}

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ref = useDismissableMenu(() => setOpen(false));
  const hasActive = items.some((item) => location.pathname.startsWith(item.to));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          "cursor-pointer poppins-light text-sm lg:text-base transition duration-200",
          "border-b-2 inline-flex items-center gap-1",
          hasActive
            ? "text-black border-signin"
            : "text-black border-transparent hover:border-black",
        ].join(" ")}
      >
        <span>{label}</span>
        <IoChevronDown
          className={`text-sm text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[16rem] rounded-xl bg-white shadow-xl ring-1 ring-black/10 z-[100] py-2"
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              className={({ isActive }) =>
                [
                  "flex flex-col px-4 py-2 transition duration-150",
                  isActive ? "bg-gray-50 text-signin" : "text-black hover:bg-gray-50",
                ].join(" ")
              }
            >
              <span className="poppins-light text-sm">{item.label}</span>
              {item.description && (
                <span className="text-xs text-gray-500 mt-0.5">{item.description}</span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function UserMenu({ label, onProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useDismissableMenu(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${label}`}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1 hover:bg-gray-50 transition duration-200"
      >
        <FaUserCircle className="text-xl text-brown" />
        <span className="poppins-light text-sm capitalize hidden xl:inline max-w-[8rem] truncate">
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
          className="absolute right-0 mt-2 min-w-[14rem] rounded-lg bg-white shadow-lg ring-1 ring-black/10 z-[100] py-1"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-xs text-gray-500">Signed in as</div>
            <div className="poppins-light text-sm capitalize truncate">{label}</div>
          </div>
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

function SubscribeCTA({ onClick }) {
  return (
    <NavLink
      to={FEATURED_ITEM.to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "poppins-bold text-sm lg:text-base rounded-lg px-4 py-2 inline-flex items-center gap-1.5 transition duration-200 shrink-0",
          "bg-yellow text-black hover:bg-darkgold hover:text-white",
          isActive ? "ring-2 ring-signin ring-offset-2" : "",
        ].join(" ")
      }
    >
      <IoStarSharp className="text-sm" />
      <span>{FEATURED_ITEM.label}</span>
    </NavLink>
  );
}

function MobileGroup({ group, onNavigate }) {
  const location = useLocation();
  const hasActive = group.items.some((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  );
  const [open, setOpen] = useState(hasActive);

  if (group.items.length === 1) {
    const item = group.items[0];
    return (
      <NavLink
        to={item.to}
        end={item.end}
        onClick={onNavigate}
        className={({ isActive }) =>
          `block py-3 border-b cursor-pointer px-2 poppins-light transition duration-150 ${
            isActive ? "bg-gray-100 text-signin" : "hover:bg-gray-50"
          }`
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="border-b">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-3 px-2 poppins-light text-left hover:bg-gray-50 transition duration-150"
      >
        <span>{group.label}</span>
        <IoChevronDown
          className={`text-sm text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <ul className="pl-4 pb-2 flex flex-col gap-1">
          {group.items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block py-2 px-2 rounded poppins-light text-sm transition duration-150 ${
                    isActive ? "bg-gray-100 text-signin" : "hover:bg-gray-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
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
        <div className="bg-white flex items-center gap-4 lg:gap-6 p-3 sm:p-5 shadow w-[95vw] mt-6 mb-6 rounded-2xl">
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

          <nav
            className="hidden lg:flex lg:items-center flex-grow min-w-0"
            data-aos="fade-down"
          >
            <ul className="flex items-center gap-x-6 xl:gap-x-8 mx-auto">
              <li>
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              {PRIMARY_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavDropdown label={LEARN_GROUP.label} items={LEARN_GROUP.items} />
              </li>
              <li>
                <NavDropdown label={COMPANY_GROUP.label} items={COMPANY_GROUP.items} />
              </li>
            </ul>
          </nav>

          <div
            className="hidden lg:flex lg:items-center gap-3 shrink-0"
            data-aos="fade-left"
          >
            <SubscribeCTA />
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

          <div className="flex items-center lg:hidden gap-3 shrink-0 ml-auto">
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

          <div
            className={`${menuOpen ? "fixed" : "hidden"} inset-0 bg-black/50 z-50 lg:hidden`}
            onClick={closeMenu}
            aria-hidden="true"
          />

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

            <div className="flex flex-col">
              {MOBILE_SECTIONS.map((group) => (
                <MobileGroup key={group.label} group={group} onNavigate={closeMenu} />
              ))}

              <NavLink
                to={FEATURED_ITEM.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 mt-4 rounded-lg cursor-pointer px-4 poppins-bold transition duration-150 ${
                    isActive ? "bg-darkgold text-white" : "bg-yellow text-black hover:bg-darkgold hover:text-white"
                  }`
                }
              >
                <IoStarSharp className="text-sm" />
                <span>{FEATURED_ITEM.label}</span>
              </NavLink>
            </div>

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
