import PropTypes from "prop-types";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(props) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuGroup(props) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuPortal(props) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup };

export const DropdownMenuContent = ({
  className,
  align = "end",
  sideOffset = 8,
  ...props
}) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-dropdown min-w-52 origin-[var(--radix-dropdown-menu-content-transform-origin)]",
        "rounded-md border border-border bg-popover p-1.5 text-popover-foreground shadow-md",
        "transition-[opacity,transform] duration-150 ease-out-quint",
        "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
        className,
      )}
      {...props}
    />
  </DropdownMenuPortal>
);

DropdownMenuContent.propTypes = {
  align: PropTypes.oneOf(["start", "center", "end"]),
  sideOffset: PropTypes.number,
  className: PropTypes.string,
};

export const DropdownMenuItem = ({ className, inset, asChild, ...props }) => (
  <DropdownMenuPrimitive.Item
    data-slot="dropdown-menu-item"
    data-inset={inset || undefined}
    asChild={asChild}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-2 text-body-sm font-medium outline-none",
      "text-foreground transition-colors",
      "focus:bg-muted focus:text-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[inset]:pl-8",
      className,
    )}
    {...props}
  />
);

DropdownMenuItem.propTypes = {
  inset: PropTypes.bool,
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

export const DropdownMenuLabel = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Label
    data-slot="dropdown-menu-label"
    className={cn(
      "px-2.5 pt-2 pb-1 text-eyebrow uppercase text-subtle-foreground",
      className,
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Separator
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1 my-1.5 h-px bg-border", className)}
    {...props}
  />
);
