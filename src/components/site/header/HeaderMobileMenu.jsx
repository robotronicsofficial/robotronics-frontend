import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/useAuth";
import { cn } from "@/lib/utils";

import {
  ACCOUNT_NAV,
  COMPANY_NAV,
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
    COMPANY_NAV.items,
    currentUser ? ACCOUNT_NAV : null,
  ].filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col gap-0 p-0"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <SheetTitle className="text-h5">Menu</SheetTitle>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-md bg-muted text-foreground transition-colors hover:bg-secondary"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto p-2">
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

        <div className="border-t border-border p-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobileMenu;
