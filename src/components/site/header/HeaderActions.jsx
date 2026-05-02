import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { cn } from "@/lib/utils";
import { selectCartQuantity, useCartStore } from "@/stores/cartStore";

import { ACCOUNT_NAV, CART_PATH } from "./headerNav.config";

const getDisplayName = (user) =>
  user?.name || user?.username || user?.firstName || user?.email?.split("@")[0] || "Account";

const getInitials = (user) => {
  const name = getDisplayName(user);
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const IconButtonLink = ({ to, label, count, className, children }) => (
  <Button
    asChild
    variant="ghost"
    size="icon"
    className={cn(
      "relative h-9 w-9 text-muted-foreground hover:text-foreground",
      className,
    )}
  >
    <Link to={to} aria-label={label}>
      {children}
      {Number.isFinite(count) && count > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-0.5 -right-0.5 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full",
            "bg-primary px-1 text-[0.625rem] font-semibold leading-none text-primary-foreground",
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  </Button>
);

const SignedOutActions = () => (
  <div className="flex items-center gap-2">
    <Button asChild variant="ghost" className="h-9 rounded-full px-4 text-body-sm">
      <Link to="/Login">Sign in</Link>
    </Button>
    <Button asChild className="h-9 rounded-full px-5 text-body-sm font-semibold">
      <Link to="/Signup">Get started</Link>
    </Button>
  </div>
);

const UserMenu = ({ user, onSignOut }) => {
  const displayName = getDisplayName(user);
  const initials = getInitials(user) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-body-sm font-semibold text-foreground",
          "transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        {initials}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60">
        <div className="px-2.5 pt-2 pb-3">
          <Text size="sm" weight="semibold" className="truncate">
            {displayName}
          </Text>
          {user?.email && (
            <Text size="xs" tone="muted" className="truncate">
              {user.email}
            </Text>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
        {ACCOUNT_NAV.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link to={item.to} className="flex items-center gap-2">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            onSignOut();
          }}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeaderActions = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const cartQuantity = useCartStore(selectCartQuantity);

  const handleSignOut = async () => {
    await logout();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex items-center gap-1">
      <IconButtonLink
        to="/Search"
        label="Search"
        className="hidden lg:inline-flex"
      >
        <Search aria-hidden="true" />
      </IconButtonLink>
      <IconButtonLink to={CART_PATH} label="Cart" count={cartQuantity}>
        <ShoppingCart aria-hidden="true" />
      </IconButtonLink>
      <div className="hidden items-center gap-1 lg:flex lg:pl-2">
        {currentUser ? (
          <UserMenu user={currentUser} onSignOut={handleSignOut} />
        ) : (
          <SignedOutActions />
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
