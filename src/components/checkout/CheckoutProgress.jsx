import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const CheckoutProgress = ({ value }) => (
  <div className="mx-auto h-0.5 w-full max-w-5xl bg-border" aria-hidden="true">
    <div
      className="h-full bg-foreground transition-[width]"
      style={{ width: `${value}%` }}
    />
  </div>
);

const CheckoutStepButton = ({ icon, title, description, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!isActive}
    className={cn(
      "flex flex-col items-center gap-2 text-center",
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
  </button>
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
