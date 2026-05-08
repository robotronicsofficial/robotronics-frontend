import PropTypes from "prop-types";
import { Star, StarHalf } from "lucide-react";
import { cn } from "../../lib/utils";

const STAR_COUNT = 5;

const StarRating = ({
  value = 0,
  className,
  iconClassName,
  emptyClassName = "text-background",
  label,
}) => {
  const rating = Number(value) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const accessibleLabel = label || `${rating.toFixed(1)} out of ${STAR_COUNT}`;

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={accessibleLabel}>
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;
        const Icon = isHalf ? StarHalf : Star;

        return (
          <Icon
            key={index}
            aria-hidden="true"
            className={cn(
              "size-[1em]",
              isFull || isHalf ? "fill-current text-primary" : emptyClassName,
              iconClassName,
            )}
          />
        );
      })}
    </span>
  );
};

StarRating.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  emptyClassName: PropTypes.string,
  label: PropTypes.string,
};

export default StarRating;
