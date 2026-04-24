import PropTypes from "prop-types";
import AppImage from "../../AppImage";
import robo from "../../../assets/images/shopRobot.webp";
import python from "../../../assets/images/python.webp";
import star from "../../../assets/images/shopStar.svg";
import { createCourseCommerceItem } from "../../../lib/commerceItems";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AvatarStack from "@/components/ui/avatar-stack";

import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";
import { useCartStore } from "../../../stores/cartStore";

const INSTRUCTOR_AVATARS = [robo, robo, robo, robo];

const CourseIntro = ({ id, title, image, price, category }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const resolvedImage = resolveBackendAssetUrl(image, python);

  const handleViewPlans = () => navigate("/subscriptions");
  const handleGiftCourse = () => {
    const courseItem = createCourseCommerceItem({
      _id: id,
      title,
      thumbnail: image,
      price,
      category,
    });

    if (courseItem) {
      addToCart(courseItem);
    }

    navigate("/gift-courses");
  };

  return (
    <div className="bg-muted"data-aos="fade-right">
      {/* parent */}
      <div className=" p-10 lg:flex flex-row ">
        {/* left */}
        <div className="lg:flex flex-row justify-center ">
          {/* img */}
          <div className="rounded-full bg-background max-w-full max-h-full flex items-center justify-center">
            <AppImage
              src={resolvedImage}
              className="rounded-full object-cover md:w-full md:h-full"
              alt={title || "Course"}
              loading="eager"
            />
          </div>

          {/* Instructor avatars */}
          <AvatarStack images={INSTRUCTOR_AVATARS} className="py-10" alt="Instructor" />
        </div>

        {/* right */}
        <div className="flex flex-col p-5 lg:px-24 lg:gap-y-5 gap-y-3">
          {/* title */}
          <div>
            <p className="poppins-bold text-foreground lg:text-6xl ">{title}</p>
          </div>
          {/* sale */}
          <div className="flex flex-col gap-y-8">
            {/* stars */}
            <div className="flex flex-row lg:gap-x-14 gap-x-8">
              {/* img */}
              <div>
                <img src={star} alt="" />
              </div>
              {/* button */}
              <Badge className="rounded-none bg-destructive px-2 py-1 font-bold text-background">ON SALE</Badge>
            </div>
            {/* text */}
            <div className="flex flex-row gap-x-2">
              <p className="text-sm text-muted-foreground poppins-thin">
                261 products sold .
              </p>
              <p className="text-sm text-muted-foreground poppins-thin">
                3,1k products watched
              </p>
            </div>
          </div>
          <div className="text-primary text-2xl poppins-bold">
            {price != null ? `Pkr ${price}` : "Included"}
          </div>
          {/* buy now */}
          <div className="lg:flex flex-row lg:gap-x-10">
            <div className="flex flex-row gap-x-5">
              <div>
                <Button
                  type="button"
                  onClick={handleViewPlans}
                  className="h-auto rounded-lg bg-foreground p-2 text-background lg:px-6"
                >
                  VIEW SUBSCRIPTION PLANS
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGiftCourse}
                  className="mt-3 h-auto rounded-lg border-foreground bg-card p-2 text-foreground lg:mt-0 lg:px-6"
                >
                  GIFT THIS COURSE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseIntro.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
};

export default CourseIntro;
