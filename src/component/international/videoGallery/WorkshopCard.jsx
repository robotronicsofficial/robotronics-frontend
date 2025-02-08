import { BiPlayCircle } from "react-icons/bi";
import img from "../../../assets/images/videoG.svg";
import { RxClock } from "react-icons/rx";
import PropTypes from "prop-types";

const WorkshopCard = ({ workshop }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2">
    <div className="relative">
      <img
        src={workshop.thumbnail}
        alt={workshop.workshopName}
        className="w-full lg:h-48 object-cover"
      />
      <span className="absolute right-2 bg-black text-white text-sm rounded px-2">
        {workshop.timeFrom} am To {workshop.timeTo} am
      </span>
    </div>
    <div className="p-3 bg-[#362d2c] relative">
      <div className="flex gap-6 text-white ">
        <p className="text-gray-700 text-white poppins-medium">{workshop.activity}</p>
        <div className="w-20 h-20 rounded-full absolute right-2 -top-10 border-2 border-white overflow-hidden">
          <img
            src={workshop.schoolLogo}
            alt={workshop.schoolName}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
      <h3 className="text-lg text-white poppins-bold">{workshop.workshopName}</h3>
      <p className="text-gray-600 text-white text-wrap poppins-light md:text-xs my-1">
        {workshop.description}
      </p>
      <div className="flex items-center text-white poppins-light space-x-1 text-gray-600 mt-4">
        <RxClock />
        <p>{workshop.timeFrom} am To {workshop.timeTo} am</p>
      </div>
    </div>
  </div>
);

WorkshopCard.propTypes = {
  workshop: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    instructorpic: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default WorkshopCard;
