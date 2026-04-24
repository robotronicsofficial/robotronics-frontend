import { FaHeadphones, FaSignOutAlt, FaUser, FaBox } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { RiArrowDropDownLine, RiRobot3Fill } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { CONTACT_PATH } from "../../router/paths";

const LeftNav = () => {
  const { currentUser, logout } = useAuth();
  // console.log("Current User:", currentUser);
  // const user = { userName: "Arslan" };
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState({});

  const toggleSubMenu = (index) => {
    setShowSubMenu((prev) => ({ ...prev, [index]: !prev[index] }));
    setActiveIndex(index);
  };

  const menuItems = [
    { name: "My info", href: "/Dashboard/userInfo", icon: <FaUser className="text-brown" /> },
    {
      name: "My orders",
      icon: <FaBox className="text-brown" />,
      dropdownIcon: <RiArrowDropDownLine className="text-3xl text-brown" />,
      subMenu: [
        { name: "• My Products", href: "/International/myRobot" },
        // { name: "• My Courses", href: "/Dashboard/MyCoursesPage" },
      ],
    },
    {
      name: "RoboGenius",
      icon: <RiRobot3Fill className="text-brown" />,
      dropdownIcon: <RiArrowDropDownLine className="text-3xl text-brown" />,
      subMenu: [
        { name: "• Child Profile", href: "/Dashboard/ChildProfile" },
        { name: "• Progress & Certificate", href: "/Dashboard/ProgressCertificate" },
      ],
    },
    {
      name: "Payment",
      icon: <MdOutlinePayment className="text-brown" />,
      dropdownIcon: <RiArrowDropDownLine className="text-3xl text-brown" />,
      subMenu: [
        { name: "• Payment History", href: "/Dashboard/PaymentHistory" },
      ],
    },
    { name: "Support", href: CONTACT_PATH, icon: <FaHeadphones className="text-brown" /> },
  ];

  return (
    <div className="flex flex-col w-full lg:w-[24vw] px-6 py-4  md:mt-2">
      <div className="mb-4 space-y-2">
        <h1 className="text-xl lg:text-xl poppins-bold">Hello {currentUser?.firstName || "there"}</h1>
        <p className="text-lightblack poppins-light">Welcome to your Account</p>
      </div>

      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <button
                  type="button"
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-brown hover:bg-gold ${
                    activeIndex === index ? "bg-gold" : ""
                  }`}
                  onClick={() => toggleSubMenu(index)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-base font-medium text-lightblack lg:text-xl">
                      {item.name}
                    </span>
                  </div>
                  {item.dropdownIcon}
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center justify-between rounded-lg px-4 py-2 text-brown hover:bg-gold ${
                    activeIndex === index ? "bg-gold" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-base font-medium text-lightblack lg:text-xl">
                      {item.name}
                    </span>
                  </div>
                </Link>
              )}
              {item.subMenu && showSubMenu[index] && (
                <ul className="pl-6 pt-2 space-y-1">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-brown hover:text-black hover:bg-gold rounded-md px-2 py-1"
                    >
                      <Link to={subItem.href}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-left text-brown hover:bg-gold"
              onClick={logout}
            >
              <FaSignOutAlt className="text-brown" />
              <span className="text-base font-medium text-lightblack lg:text-xl">Sign out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftNav;
