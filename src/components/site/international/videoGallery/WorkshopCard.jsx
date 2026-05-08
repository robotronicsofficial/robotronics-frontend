import { Clock, MapPin } from "lucide-react";
import PropTypes from "prop-types";

import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { openExternalUrl } from "@/utils/openExternalUrl";

const WorkshopCard = ({ workshop }) => {
  const hasExternalUrl = Boolean(workshop?.url);

  const handleOpenWorkshop = () => {
    if (hasExternalUrl) openExternalUrl(workshop.url);
  };

  return (
    <Card
      role={hasExternalUrl ? "button" : undefined}
      tabIndex={hasExternalUrl ? 0 : undefined}
      onClick={handleOpenWorkshop}
      onKeyDown={(event) => {
        if (!hasExternalUrl) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenWorkshop();
        }
      }}
      className={`flex h-full flex-col overflow-hidden p-0 ${
        hasExternalUrl ? "cursor-pointer transition-shadow hover:shadow-lg" : ""
      }`}
      aria-label={
        hasExternalUrl
          ? `Open ${workshop.workshopName || "workshop"} in a new tab`
          : `${workshop.workshopName || "Workshop"} has no external link`
      }
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={workshop.thumbnail}
          alt={workshop.workshopName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-5">
        {workshop.schoolLogo && (
          <div className="absolute -top-7 right-5 size-14 overflow-hidden rounded-full border-2 border-card bg-card shadow-sm">
            <img
              src={workshop.schoolLogo}
              alt={workshop.schoolName || ""}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {workshop.activity && (
          <Text size="xs" tone="muted" className="uppercase tracking-wide">
            {workshop.activity}
          </Text>
        )}

        <Heading level={4} className="text-h5">
          {workshop.workshopName}
        </Heading>

        {workshop.description && (
          <Text size="sm" tone="muted" className="line-clamp-3">
            {workshop.description}
          </Text>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-caption text-muted-foreground">
          {(workshop.timeFrom || workshop.timeTo) && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {workshop.timeFrom} {workshop.timeTo ? `– ${workshop.timeTo}` : ""}
            </span>
          )}
          {workshop.city && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {workshop.city}
            </span>
          )}
        </div>
      </div>
    </Card>
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
