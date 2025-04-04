import {
  FaUser,
  FaBox,
  // FaHeart,
  FaHeadphones,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const LeftNav = () => {
  const user = { userName: "Arslan" };
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
        { name: "\u2022 My Products", href: "/International/myRobot" },
        { name: "\u2022 My Courses", href: "/Dashboard/MyCoursesPage" },
      ],
    },
    {
      name: "RoboGenius",
      icon: <FaUser className="text-brown" />,
      dropdownIcon: <RiArrowDropDownLine className="text-3xl text-brown" />,
      subMenu: [
        { name: "\u2022 Child Profile", href: "/Dashboard/ChildProfile" },
        { name: "\u2022 Progress & Certificate", href: "/Dashboard/ProgressCertificate" },
      ],
    },
    {
      name: "Payment",
      icon: <MdOutlinePayment className="text-brown" />,
      dropdownIcon: <RiArrowDropDownLine className="text-3xl text-brown" />,
      subMenu: [
        { name: "\u2022 Payment History", href: "/Dashboard/PaymentHistory" },
        { name: "\u2022 Payment Details", href: "/Dashboard/PaymentDetails" },
      ],
    },
    { name: "Support", href: "/404", icon: <FaHeadphones className="text-brown" /> },
    { name: "Sign out", href: "", icon: <FaSignOutAlt className="text-brown" /> },
  ];

  return (
    <div className="flex flex-col pl-20 w-[24vw]">
      <div className="lg:mb-4 lg:py-5 py-2 space-y-5">
        <div className="flex flex-row space-x-2">
          <div className="border-l-4 border-gold rounded-2xl"></div>
          <h1 className="lg:text-3xl text-xl poppins-bold">Hello {user.userName}</h1>
        </div>
        <p className="text-lightblack poppins-light">Welcome to your Account</p>
      </div>

      <nav>
        <ul className="space-y-5">
          {menuItems.map((item, index) => (
            <li key={index} className="relative items-center">
              <div
                className={`lg:px-14 px-5 flex items-center rounded-e-xl lg:space-x-5 text-brown hover:text-black hover:bg-gold hover:border-l-4 border-black ${activeIndex === index ? "bg-gold text-brown" : ""}`}
                onClick={() => (item.subMenu ? toggleSubMenu(index) : setActiveIndex(index))}
              >
                <div className="text-xl hover:text-black">{item.icon}</div>
                <a href={item.href} className="lg:text-2xl text-xl font-medium text-lightblack">
                  {item.name}
                </a>
                {item.subMenu && <span>{item.dropdownIcon}</span>}
              </div>
              {item.subMenu && showSubMenu[index] && (
                <ul className="lg:pl-20 pt-2 space-y-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="rounded-e-xl text-brown hover:text-black hover:bg-gold hover:border-l-4 border-black">
                      <a href={subItem.href}>{subItem.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LeftNav;
