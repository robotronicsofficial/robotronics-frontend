import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Bot,
  Box,
  ChevronDown,
  CreditCard,
  Headphones,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { useChildAccounts } from "@/hooks/useAccount";
import { CONTACT_PATH, DASHBOARD_MY_PRODUCTS_PATH } from "@/router/paths";
import {
  getActiveChildSession,
  matchesChildSessionIdentifier,
} from "@/utils/childSessionRequest";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "My info",
    href: "/Dashboard/userInfo",
    icon: User,
  },
  {
    name: "My orders",
    icon: Box,
    subMenu: [{ name: "My products", href: DASHBOARD_MY_PRODUCTS_PATH }],
  },
  {
    name: "Subscriptions",
    icon: Bot,
    subMenu: [
      { name: "Child profile", href: "/Dashboard/ChildProfile" },
      { name: "Progress & certificate", href: "/Dashboard/ProgressCertificate" },
    ],
  },
  {
    name: "Payment",
    icon: CreditCard,
    subMenu: [{ name: "Payment history", href: "/Dashboard/PaymentHistory" }],
  },
  { name: "Support", href: CONTACT_PATH, icon: Headphones },
];

const linkBase =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const linkActive = "bg-primary text-primary-foreground";
const linkInactive = "text-foreground hover:bg-muted";

const subLinkBase =
  "block rounded-md px-3 py-1.5 text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const LeftNav = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const { data: childAccountsData } = useChildAccounts(currentUser?._id);
  const [activeSession, setActiveSession] = useState(() => getActiveChildSession());

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getActiveChildSession();
      setActiveSession((prev) =>
        prev?.sessionId === next?.sessionId ? prev : next,
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeChild = activeSession
    ? (childAccountsData?.children || []).find((child) =>
        matchesChildSessionIdentifier(child, activeSession.childId),
      )
    : null;
  const activeChildName = activeChild
    ? [activeChild.firstName, activeChild.lastName].filter(Boolean).join(" ")
    : null;

  const isPathActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const itemsWithState = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        active: item.href
          ? isPathActive(item.href)
          : item.subMenu?.some((sub) => isPathActive(sub.href)) || false,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname],
  );

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="flex w-full flex-col gap-6 px-4 py-6 lg:w-72 lg:px-6">
      <div className="flex flex-col gap-1">
        {activeChildName ? (
          <>
            <Eyebrow tone="brand">Now learning as</Eyebrow>
            <Heading level={3} className="text-h4 truncate">
              {activeChildName}
            </Heading>
            <Text size="sm" tone="muted">
              Parent: {currentUser?.firstName || "you"}
            </Text>
          </>
        ) : (
          <>
            <Heading level={3} className="text-h4">
              Hello {currentUser?.firstName || "there"}
            </Heading>
            <Text size="sm" tone="muted">
              Welcome to your account.
            </Text>
          </>
        )}
      </div>

      <nav>
        <ul className="flex flex-col gap-1">
          {itemsWithState.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenus[item.name] ?? item.active;

            if (item.subMenu) {
              return (
                <li key={item.name} className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    aria-expanded={isOpen}
                    aria-current={item.active ? "page" : undefined}
                    onClick={() => toggleMenu(item.name)}
                    className={cn(linkBase, "justify-between", item.active ? linkActive : linkInactive)}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" />
                      {item.name}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </Button>
                  {isOpen && (
                    <ul className="flex flex-col gap-0.5 pl-9">
                      {item.subMenu.map((sub) => {
                        const subActive = isPathActive(sub.href);
                        return (
                          <li key={sub.href}>
                            <Link
                              to={sub.href}
                              aria-current={subActive ? "page" : undefined}
                              className={cn(
                                subLinkBase,
                                subActive ? linkActive : linkInactive,
                              )}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cn(linkBase, item.active ? linkActive : linkInactive)}
                >
                  <Icon className="size-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}

          <li className="mt-2 border-t border-border pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={logout}
              className={cn(linkBase, "justify-start text-muted-foreground hover:text-destructive")}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftNav;
