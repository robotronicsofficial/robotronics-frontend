import PropTypes from "prop-types";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ALIGN_CLASS = {
  start: "left-0",
  end: "right-0",
};

const HeaderPopover = ({
  align = "end",
  children,
  contentClassName,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const triggerProps = {
    type: "button",
    "aria-controls": open ? id : undefined,
    "aria-expanded": open,
    "aria-haspopup": "menu",
    onClick: () => setOpen((current) => !current),
  };

  return (
    <div ref={rootRef} className="relative">
      {trigger({ open, triggerProps })}
      {open && (
        <div
          id={id}
          role="menu"
          className={cn(
            "absolute top-full z-dropdown mt-2 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg",
            ALIGN_CLASS[align],
            contentClassName,
          )}
          onClick={(event) => {
            if (event.target.closest("a")) {
              close();
            }
          }}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
};

HeaderPopover.propTypes = {
  align: PropTypes.oneOf(Object.keys(ALIGN_CLASS)),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  contentClassName: PropTypes.string,
  trigger: PropTypes.func.isRequired,
};

export default HeaderPopover;
