import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { Bookmark, Clock } from "lucide-react";

import AppImage from "../AppImage";
import python from "@/assets/images/python.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { formatPKR } from "@/utils/formatPrice";
import { cn } from "@/lib/utils";
import {
  useSavedItems,
  useToggleSavedItemMutation,
} from "@/hooks/useSavedItems";

const CourseProduct = ({ title, id, image, price, duration, category }) => {
  const { data: savedItems = [] } = useSavedItems();
  const toggleSavedItemMutation = useToggleSavedItemMutation();
  const isSaved = savedItems.some(
    (item) => item.itemType === "course" && item.itemId === id,
  );

  const toggleWishList = async () => {
    try {
      await toggleSavedItemMutation.mutateAsync({
        itemType: "course",
        itemId: id,
        isSaved,
      });
    } catch (error) {
      console.error("Failed to update saved items:", error);
    }
  };

  return (
    <Card className="group/course flex flex-col gap-0 overflow-hidden p-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <AppImage
          src={resolveBackendAssetUrl(image, python)}
          alt={title || "Course"}
          className="size-full object-cover transition-transform duration-300 group-hover/course:scale-[1.03]"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleWishList}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from saved" : "Save course"}
          className="absolute right-3 top-3 size-9 rounded-full bg-card/95 text-muted-foreground backdrop-blur hover:bg-card hover:text-primary"
        >
          <Bookmark
            className={cn("size-4", isSaved && "fill-primary text-primary")}
          />
        </Button>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          {category && (
            <Text size="xs" tone="subtle" className="uppercase tracking-wide">
              {category}
            </Text>
          )}
          <Heading level={3} className="text-h5 leading-snug">
            {title || "Untitled course"}
          </Heading>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
            <Clock className="size-4" />
            {duration ?? "Self-paced"}
          </div>
          <Text size="sm" weight="semibold" className="text-foreground">
            {price != null ? formatPKR(price) : "Included"}
          </Text>
        </div>

        <Button asChild className="mt-auto w-full rounded-full">
          <Link to="/CoursesProduct/$id" params={{ id }}>
            View course
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

CourseProduct.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
};

export default CourseProduct;
