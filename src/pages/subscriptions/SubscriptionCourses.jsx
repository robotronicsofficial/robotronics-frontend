import { useState, useEffect } from "react";
import { ArrowLeftCircle, ArrowRightCircle, MoveDown, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { useCourses } from "../../hooks/useCourses";
const SubscriptionCourses = () => {
  const navigate = useNavigate();
  const { data: courses = [] } = useCourses();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState(
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
  );

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCourses = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setVisibleCourses(newVisibleCourses);
      setStartIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const prevCourse = () => {
    if (!courses.length) return;
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - visibleCourses : prevIndex - 1
    );
  };

  const nextCourse = () => {
    if (!courses.length) return;
    setStartIndex((prevIndex) =>
      prevIndex + visibleCourses >= courses.length ? 0 : prevIndex + 1
    );
  };

  const handleViewDetails = () => {
    navigate('/subscriptions/register');
  };
  
  return (
    <div className="relative bg-background py-4 px-4 md:px-20 lg:px-40">
      <div className="mx-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl poppins-medium text-foreground text-center w-full py-4 md:py-8 poppins-bold">
          Courses Included in the Subscription
        </h1>
      </div>

      {/* Left Button - Hidden on mobile */}
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        onClick={prevCourse}
        className="absolute left-0 top-1/2 mx-4 hidden -translate-y-1/2 rounded-full border border-border bg-card p-3 text-foreground hover:bg-muted sm:block md:mx-12 lg:mx-24"
      >
        <ArrowLeftCircle />
      </Button>

      {/* Courses Container */}
      <div className="flex justify-center gap-4 md:gap-6 overflow-hidden">
        {courses
          .slice(startIndex, startIndex + visibleCourses)
          .map((course) => (
            <div
              key={course._id}
              className="w-full max-w-xs sm:max-w-none sm:w-1/2 lg:w-1/3 px-2 sm:px-4 mb-2 p-2 sm:p-6"
            >

              <Card className="h-full rounded-xl py-0 transition-colors hover:bg-muted/40">
                <CardContent className="flex h-full flex-col p-4 sm:p-5">
                <img
                    className="rounded-xl w-full h-48 sm:h-56 object-cover"
                    src={resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")}
                    alt={course.title || "Course"}
                    loading="lazy"
                    decoding="async"
                />
                <div className="px-4 lg:px-6 py-2 flex-grow">
                  <div className="flex flex-row mb-2 flex-wrap justify-between my-3">
                    <p className="text-muted-foreground text-wrap text-center px-2 sm:px-4 py-1 rounded-full bg-muted text-sm sm:text-base">
                      {course.category}
                    </p>
                    <div className="flex items-center">
                      <Star className="text-primary" />
                      <p className="text-muted-foreground poppins-light text-sm sm:text-base ml-2">
                        ({course.reviews || 0} Reviews)
                      </p>
                    </div>
                  </div>

                  <div className="font-bold text-lg sm:text-xl p-2 poppins-bold text-left text-wrap">
                    {course.title || "Untitled course"}
                  </div>
                </div>
                <div className="px-4 sm:px-8 mb-4 flex flex-col sm:flex-row gap-2 py-4">
                  <div className="w-full flex justify-center mb-4 py-4">
                    <Button type="button" onClick={handleViewDetails}
                    className="h-auto rounded-full bg-primary px-4 py-2 text-sm text-foreground sm:text-base">
                      <span>View Course</span>
                      <MoveDown className="text-xs -rotate-90" />
                    </Button>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>

      {/* Right Button - Hidden on mobile */}
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        onClick={nextCourse}
        className="absolute right-0 top-1/2 mx-4 hidden -translate-y-1/2 rounded-full border border-border bg-card p-3 text-foreground hover:bg-muted sm:block md:mx-12 lg:mx-24"
      >
        <ArrowRightCircle />
      </Button>

      {/* Mobile navigation buttons */}
      <div className="sm:hidden flex justify-center gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={prevCourse}
          className="rounded-full border border-border bg-card p-2 text-foreground hover:bg-muted"
        >
          <ArrowLeftCircle />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={nextCourse}
          className="rounded-full border border-border bg-card p-2 text-foreground hover:bg-muted"
        >
          <ArrowRightCircle />
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCourses;
