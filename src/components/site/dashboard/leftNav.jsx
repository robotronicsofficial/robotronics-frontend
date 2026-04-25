import { Bot, Box, ChevronDown, CreditCard, Headphones, LogOut, User } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/contexts/useAuth";
import { CONTACT_PATH } from "@/router/paths";
import { Button } from "@/components/ui/button";

const FOCUS_RING_CLASSES =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const LeftNav = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState({});

  const toggleSubMenu = (index) => {
    setShowSubMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const menuItems = useMemo(
    () => [
      { name: "My info", href: "/Dashboard/userInfo", icon: <User className="text-foreground" /> },
      {
        name: "My orders",
        icon: <Box className="text-foreground" />,
        dropdownIcon: <ChevronDown className="text-3xl text-foreground" />,
        subMenu: [
          { name: "• My Products", href: "/International/myRobot" },
          // { name: "• My Courses", href: "/Dashboard/MyCoursesPage" },
        ],
      },
      {
        name: "Subscriptions",
        icon: <Bot className="text-foreground" />,
        dropdownIcon: <ChevronDown className="text-3xl text-foreground" />,
        subMenu: [
          { name: "• Child Profile", href: "/Dashboard/ChildProfile" },
          { name: "• Progress & Certificate", href: "/Dashboard/ProgressCertificate" },
        ],
      },
      {
        name: "Payment",
        icon: <CreditCard className="text-foreground" />,
        dropdownIcon: <ChevronDown className="text-3xl text-foreground" />,
        subMenu: [
          { name: "• Payment History", href: "/Dashboard/PaymentHistory" },
        ],
      },
      { name: "Support", href: CONTACT_PATH, icon: <Headphones className="text-foreground" /> },
    ],
    []
  );

  const isPathActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isItemActive = (item) => {
    if (item.href) return isPathActive(item.href);
    if (item.subMenu) return item.subMenu.some((sub) => isPathActive(sub.href));
    return false;
  };

  return (
    <div className="flex flex-col w-full lg:w-80 px-6 py-4  md:mt-2">
      <div className="flex flex-col mb-4 gap-y-2">
        <h1 className="text-xl lg:text-xl poppins-bold">Hello {currentUser?.firstName || "there"}</h1>
        <p className="text-foreground poppins-light">Welcome to your Account</p>
      </div>

      <nav>
        <ul className="flex flex-col gap-y-4">
          {menuItems.map((item, index) => {
            const active = isItemActive(item);
            return (
              <li key={index}>
                {item.subMenu ? (
                  <Button
                    type="button"
                    variant="ghost"
                    aria-current={active ? "page" : undefined}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2 ${FOCUS_RING_CLASSES} ${
                      active
                        ? "bg-primary text-primary-foreground hover:bg-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => toggleSubMenu(index)}
                  >
                    <div className="flex items-center gap-x-3">
                      {item.icon}
                      <span className={`text-base font-medium lg:text-xl ${active ? "text-primary-foreground" : "text-foreground"}`}>
                        {item.name}
                      </span>
                    </div>
                    {item.dropdownIcon}
                  </Button>
                ) : (
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-4 py-2 ${FOCUS_RING_CLASSES} ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-x-3">
                      {item.icon}
                      <span className={`text-base font-medium lg:text-xl ${active ? "text-primary-foreground" : "text-foreground"}`}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )}
                {item.subMenu && showSubMenu[index] && (
                  <ul className="flex flex-col pl-6 pt-2 gap-y-1">
                    {item.subMenu.map((subItem, subIndex) => {
                      const subActive = isPathActive(subItem.href);
                      return (
                        <li
                          key={subIndex}
                          className={`rounded-md px-2 py-1 ${
                            subActive
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <Link
                            to={subItem.href}
                            aria-current={subActive ? "page" : undefined}
                            className={`block ${FOCUS_RING_CLASSES} rounded-sm`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
          <li>
            <Button
              type="button"
              variant="ghost"
              className={`flex w-full justify-start gap-x-3 rounded-lg px-4 py-2 text-left text-foreground hover:bg-muted ${FOCUS_RING_CLASSES}`}
              onClick={logout}
            >
              <LogOut className="text-foreground" />
              <span className="text-base font-medium text-foreground lg:text-xl">Sign out</span>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftNav;
