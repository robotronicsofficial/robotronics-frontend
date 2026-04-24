import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getProgressWidthClass = (value) => {
  if (value >= 100) return "w-full";
  if (value >= 67) return "w-2/3";
  if (value >= 50) return "w-1/2";
  if (value >= 33) return "w-1/3";
  return "w-0";
};

const CheckoutProgress = ({ value }) => (
  <div className="mx-auto h-0.5 w-full max-w-5xl bg-border" aria-hidden="true">
    <div className={cn("h-full bg-foreground transition-[width]", getProgressWidthClass(value))} />
  </div>
);

const CheckoutStepButton = ({ icon, title, description, isActive, onClick }) => (
  <Button
    type="button"
    variant="ghost"
    onClick={onClick}
    disabled={!isActive}
    className={cn(
      "h-auto flex-col items-center gap-2 text-center hover:bg-transparent",
      !isActive && "cursor-not-allowed opacity-50"
    )}
  >
    <span
      className={cn(
        "flex size-16 items-center justify-center rounded-full shadow-md transition-colors",
        isActive ? "bg-foreground" : "bg-muted"
      )}
    >
      <img src={icon} alt="" className={cn("size-7", isActive && "invert")} />
    </span>
    <span className="text-base font-bold text-foreground">{title}</span>
    <span className="mt-2 max-w-56 font-lato text-sm font-medium leading-5 text-muted-foreground">
      {description}
    </span>
  </Button>
);

CheckoutProgress.propTypes = {
  value: PropTypes.number.isRequired,
};

CheckoutStepButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { CheckoutProgress, CheckoutStepButton };
