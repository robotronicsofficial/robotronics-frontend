import PropTypes from "prop-types";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Sheet(props) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

const SheetOverlay = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-overlay bg-overlay backdrop-blur-xs",
      "transition-opacity duration-300 ease-out-quint",
      "data-[state=closed]:opacity-0",
      className,
    )}
    {...props}
  />
);

const sheetVariants = cva(
  cn(
    "fixed z-modal flex flex-col bg-card text-card-foreground shadow-xl",
    "transition-transform duration-300 ease-out-quint",
    "focus:outline-none",
  ),
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-dvh w-screen sm:max-w-sm border-l border-border data-[state=closed]:translate-x-full",
        left:
          "inset-y-0 left-0 h-dvh w-screen sm:max-w-sm border-r border-border data-[state=closed]:-translate-x-full",
        top:
          "inset-x-0 top-0 w-screen border-b border-border data-[state=closed]:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 w-screen border-t border-border data-[state=closed]:translate-y-full",
      },
    },
    defaultVariants: { side: "right" },
  },
);

const SheetContent = ({
  side = "right",
  showCloseButton = true,
  className,
  children,
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      data-slot="sheet-content"
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
);

SheetContent.propTypes = {
  side: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

const SheetHeader = ({ className, ...props }) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1 px-5 pt-4 pb-3", className)}
    {...props}
  />
);

const SheetFooter = ({ className, ...props }) => (
  <div
    data-slot="sheet-footer"
    className={cn("border-t border-border px-5 py-4", className)}
    {...props}
  />
);

const SheetTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title
    data-slot="sheet-title"
    className={cn("text-h5 text-foreground", className)}
    {...props}
  />
);

const SheetDescription = ({ className, ...props }) => (
  <DialogPrimitive.Description
    data-slot="sheet-description"
    className={cn("text-body-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
