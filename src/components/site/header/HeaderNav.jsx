import PropTypes from "prop-types";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { PRIMARY_NAV, RESOURCES_NAV } from "./headerNav.config";

const baseLinkClass =
  "inline-flex h-9 items-center rounded-md px-3 text-body-sm font-medium transition-colors";

const inactiveLinkClass = "text-muted-foreground hover:bg-muted hover:text-foreground";
const activeLinkClass = "bg-secondary text-foreground";

const NavLink = ({ to, label, end }) => (
  <Link
    to={to}
    activeOptions={end ? { exact: true } : undefined}
    className={baseLinkClass}
    activeProps={{ className: cn(baseLinkClass, activeLinkClass) }}
    inactiveProps={{ className: cn(baseLinkClass, inactiveLinkClass) }}
  >
    {label}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  end: PropTypes.bool,
};

const NavDropdown = ({ label, items }) => {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isActive = items.some((item) => pathname === item.to);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          baseLinkClass,
          "group gap-1 outline-none",
          isActive ? activeLinkClass : inactiveLinkClass,
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-72 p-2">
        {items.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link to={item.to} className="flex flex-col items-start gap-0.5 px-3 py-2.5">
              <span className="text-body-sm font-medium text-foreground">{item.label}</span>
              {item.description && (
                <Text size="xs" tone="muted" as="span" className="font-normal">
                  {item.description}
                </Text>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
};

const HeaderNav = () => (
  <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
    {PRIMARY_NAV.map((item) => (
      <NavLink key={item.to} {...item} />
    ))}
    <NavDropdown {...RESOURCES_NAV} />
  </nav>
);

export default HeaderNav;
