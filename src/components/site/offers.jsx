import PropTypes from "prop-types";
import logoo1 from "@/assets/imagesContent/logos/logoo1.png";
import logoo2 from "@/assets/imagesContent/logos/logoo2.png";
import logoo3 from "@/assets/imagesContent/logos/logoo3.png";
import AppImage from "./AppImage";

const OfferItem = ({ icon, alt, title, description }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6 flex-1" data-aos="fade-up">
    <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-secondary p-4 lg:p-5 shrink-0">
      <AppImage src={icon} alt={alt} className="w-full h-auto object-contain" />
    </div>
    <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
      <h3 className="text-background text-xl sm:text-2xl">{title}</h3>
      <p className="text-background text-xs xs:text-sm sm:text-base max-w-[280px] xs:max-w-none mx-auto sm:mx-0 text-wrap">
        {description}
      </p>
    </div>
  </div>
);

OfferItem.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const OFFER_ITEMS = [
  {
    icon: logoo1,
    alt: "Innovations icon",
    title: "Innovations",
    description:
      "Innovation in robotics refers to the ability to develop new ideas, techniques or technologies that improve or redefine robotic systems.",
  },
  {
    icon: logoo2,
    alt: "Critical Thinking icon",
    title: "Critical Thinking",
    description:
      "Critical thinking skills in robotics involve analyzing and evaluating problems logically to make informed decisions.",
  },
  {
    icon: logoo3,
    alt: "Problem Solving icon",
    title: "Problem Solving",
    description:
      "Problem-solving ability in robotics focuses on identifying challenges and developing practical solutions through systematic approaches.",
  },
];

const Offers = () => {
  return (
    <div
      className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-8 bg-primary lg:p-10 p-5"
      data-aos="fade-up"
    >
      {OFFER_ITEMS.map((item) => (
        <OfferItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default Offers;
