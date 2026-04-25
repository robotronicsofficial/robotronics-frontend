import PropTypes from "prop-types";
import AppImage from "./AppImage";
import star from "@/assets/logo/Stars.svg";

const TestimonialCard = ({ testimonial }) => {
  const { image, name, role, review } = testimonial;

  return (
    <div className="flex flex-col border border-border rounded-2xl overflow-hidden">
      <AppImage className="w-full" src={image} alt={`${name} portrait`} />
      <div className="flex flex-col gap-2 p-4 lg:p-5">
        <p className="text-foreground lg:text-base text-sm poppins-regular text-wrap">
          {review}
        </p>
        <p className="text-foreground lg:text-base text-sm poppins-bold font-bold">
          {name}
        </p>
        <p className="text-foreground lg:text-base text-sm poppins-regular">
          {role}
        </p>
        <AppImage className="h-5 w-auto" src={star} alt="Five star rating" />
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestimonialCard;
