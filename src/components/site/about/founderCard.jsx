import PropTypes from "prop-types";
import AppImage from "../AppImage";

const FounderCard = ({ founder }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4 flex flex-col items-center">
      <div
        className="w-full h-80 sm:h-96 md:h-[28rem] overflow-hidden rounded-tl-md rounded-tr-md border border-border"
        data-aos="fade-down"
      >
        <AppImage
          src={founder.imgSrc}
          alt={founder.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="bg-foreground flex flex-col items-center justify-center py-4 w-full"
        data-aos="fade-up"
      >
        <p className="text-background poppins-regular text-lg sm:text-xl">
          {founder.name}
        </p>
        <p className="text-background poppins-regular text-sm sm:text-base text-center">
          {founder.title}
        </p>
      </div>
    </div>
  );
};

FounderCard.propTypes = {
  founder: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
};

export default FounderCard;
