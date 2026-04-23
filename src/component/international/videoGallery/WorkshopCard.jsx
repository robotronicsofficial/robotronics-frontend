import { RxClock } from "react-icons/rx";
import PropTypes from "prop-types";
import { LuMapPin } from "react-icons/lu";
import { openExternalUrl } from "../../../utils/openExternalUrl";

const WorkshopCard = ({ workshop }) => {
  const hasExternalUrl = Boolean(workshop?.url);

  const handleOpenWorkshop = () => {
    if (!hasExternalUrl) {
      return;
    }

    openExternalUrl(workshop.url);
  };

  return (
    <button
      type="button"
      className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-left disabled:cursor-default"
      onClick={handleOpenWorkshop}
      disabled={!hasExternalUrl}
      aria-label={
        hasExternalUrl
          ? `Open ${workshop.workshopName || "workshop"} in a new tab`
          : `${workshop.workshopName || "Workshop"} has no external link`
      }
    >
      <div className="relative h-[16vw] cursor-pointer">
      <img
        src={workshop.thumbnail}
        alt={workshop.workshopName}
        className="w-full h-full object-fill"
      />
    </div>
      <div className="px-3 py-4 bg-[#362d2c] relative h-[18vw] flex flex-col">
      <div className=" text-white  h-[2vw] ">
        <p className="text-gray-700 text-white poppins-medium z-50 my-3">
          {workshop.activity}
        </p>
        <div className="w-20 h-20 rounded-full absolute right-2 -top-10 border-2 border-white overflow-hidden bg-yellow">
          <img
            src={workshop.schoolLogo}
            alt={workshop.schoolName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
     <div className="h-[20vw] mt-2  flex flex-col ">
     <h3 className="text-lg text-white poppins-bold text-wrap leading-none my-4">
        {workshop.workshopName}
      </h3>
      <p className="text-gray-600 text-white text-wrap poppins-light md:text-xs">
        {workshop.description}
      </p>
     </div>
     <div className="flex items-center justify-between text-white poppins-light space-x-1 text-gray-600 mt-4 px-2">
        <p className="flex items-center gap-2 text-sm">
        <RxClock />

          {workshop.timeFrom} To {workshop.timeTo}{" "}
        </p>
        <div className="flex items-center gap-1">
        <LuMapPin />
        {workshop.city}
        </div>
      </div>
    </div>
    </button>
  );
};

WorkshopCard.propTypes = {
  workshop: PropTypes.shape({
    activity: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    schoolLogo: PropTypes.string,
    schoolName: PropTypes.string,
    thumbnail: PropTypes.string,
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
    url: PropTypes.string,
    workshopName: PropTypes.string,
  }).isRequired,
};

export default WorkshopCard;
