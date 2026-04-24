import { Clock, MapPin } from "lucide-react";
import PropTypes from "prop-types";
import { openExternalUrl } from "../../../utils/openExternalUrl";
import { Button } from "@/components/ui/button";

const WorkshopCard = ({ workshop }) => {
  const hasExternalUrl = Boolean(workshop?.url);

  const handleOpenWorkshop = () => {
    if (!hasExternalUrl) {
      return;
    }

    openExternalUrl(workshop.url);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-full flex-col items-stretch overflow-hidden rounded-lg bg-card p-0 text-left shadow-lg disabled:cursor-default"
      onClick={handleOpenWorkshop}
      disabled={!hasExternalUrl}
      aria-label={
        hasExternalUrl
          ? `Open ${workshop.workshopName || "workshop"} in a new tab`
          : `${workshop.workshopName || "Workshop"} has no external link`
      }
    >
      <div className="relative aspect-video cursor-pointer">
        <img
          src={workshop.thumbnail}
          alt={workshop.workshopName}
          className="w-full h-full object-fill"
        />
      </div>
      <div className="px-3 py-4 bg-foreground relative flex min-h-64 flex-col">
        <div className="min-h-8 text-background">
          <p className="poppins-medium my-3">
            {workshop.activity}
          </p>
          <div className="absolute right-2 -top-10 size-20 overflow-hidden rounded-full border-2 border-card bg-primary">
            <img
              src={workshop.schoolLogo}
              alt={workshop.schoolName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-2 flex flex-1 flex-col">
          <h3 className="text-lg text-background poppins-bold text-wrap leading-none my-4">
            {workshop.workshopName}
          </h3>
          <p className="text-background text-wrap poppins-light md:text-xs">
            {workshop.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-1 px-2 text-background poppins-light">
          <p className="flex items-center gap-2 text-sm">
            <Clock />
            {workshop.timeFrom} To {workshop.timeTo}{" "}
          </p>
          <div className="flex items-center gap-1">
            <MapPin />
            {workshop.city}
          </div>
        </div>
      </div>
    </Button>
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
