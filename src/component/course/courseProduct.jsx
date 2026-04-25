import PropTypes from "prop-types";
import AppImage from "../AppImage";
import python from "../../assets/images/python.webp";
import shopStar from "../../assets/logo/shopStars.svg";
import time from "../../assets/logo/time-svgrepo-com 1.svg";
import download from "../../assets/logo/download.svg";
import sale from "../../assets/logo/sales.svg";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import {
  useSavedItems,
  useToggleSavedItemMutation,
} from "../../hooks/useSavedItems";

const CourseProduct = ({ title, id, image, price, duration }) => {
  const resolvedImage = resolveBackendAssetUrl(image, python);
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
    <Card className="rounded-2xl p-0" data-aos="fade-up">
      <CardContent className="flex flex-col gap-4 p-2">
        <AppImage src={resolvedImage} alt={title || "Course"} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row flex-wrap justify-between">
            <p className="lg:text-xl p-1 text-center text-wrap font-bold">
              {title}
            </p>
            <img src={shopStar} alt="" />
          </div>
          <Button
            type="button"
            variant="ghost"
            className="h-auto w-full justify-between p-0 hover:bg-transparent"
            onClick={toggleWishList}
            aria-pressed={isSaved}
          >
            <Star className="w-6 h-6 self-center" fill={isSaved ? "currentColor" : "none"} />
            <span className="lg:text-xl text-primary font-bold">
              {price != null ? `PKR ${price}` : "Included"}
            </span>
          </Button>
        </div>
        <Separator className="border border-dotted border-foreground" />
        <div className="flex flex-wrap justify-center items-center gap-x-2">
          <div className="flex">
            <img className="text-xs" src={time} />
            {duration}
          </div>
          <div className="flex">
            <img className="text-xs" src={download} />
            34 Course
          </div>
          <div className="flex">
            <img className="text-xs" src={sale} />
            250 Sales
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center bg-primary p-2">
        <Button asChild className="h-auto bg-primary p-3 text-xl font-bold">
          <Link to={`/CoursesProduct/${id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

CourseProduct.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseProduct;
