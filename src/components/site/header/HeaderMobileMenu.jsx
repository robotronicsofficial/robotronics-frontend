import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/useAuth";
import { cn } from "@/lib/utils";

import {
  ACCOUNT_NAV,
  PRIMARY_NAV,
  RESOURCES_NAV,
} from "./headerNav.config";

const navItemClass =
  "block rounded-md px-3 py-2.5 text-body font-medium text-foreground transition-colors hover:bg-muted";
const navItemActiveClass = cn(navItemClass, "bg-secondary");

const HeaderMobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setOpen(false);
    await logout();
    navigate({ to: "/", replace: true });
  };

  const groups = [
    PRIMARY_NAV,
    RESOURCES_NAV.items,
    currentUser ? ACCOUNT_NAV : null,
  ].filter(Boolean);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-foreground lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          id="mobile-menu-panel"
          aria-describedby={undefined}
          className="w-[min(22rem,calc(100vw-2rem))] bg-background p-0 lg:hidden"
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto p-2">
            {groups.map((items, index) => (
              <Fragment key={index}>
                {index > 0 && <hr className="mx-3 my-2 border-border" />}
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={navItemClass}
                    activeOptions={{ exact: false }}
                    activeProps={{ className: navItemActiveClass }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Fragment>
            ))}
          </nav>

          <SheetFooter>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-body-sm font-semibold">
                  {(currentUser.name || currentUser.email || "U").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 truncate text-body-sm font-medium">
                  {currentUser.name || currentUser.email}
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex shrink-0 items-center gap-1.5 rounded-md bg-muted px-3 py-2 text-body-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <LogOut aria-hidden="true" className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link to="/Login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/Signup">Get started</Link>
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HeaderMobileMenu;
