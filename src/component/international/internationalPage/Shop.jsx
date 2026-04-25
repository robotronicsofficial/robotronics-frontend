import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BellRing, Star } from "lucide-react";
import robo from "../../../assets/logo/Robotrinic.svg";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";
import QueryErrorState from "../../../components/layout/QueryErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useCourses } from "../../../hooks/useCourses";
const Shop = () => {
  const navigate = useNavigate();
  const {
    data: courses = [],
    isLoading: loading,
    error,
    refetch,
  } = useCourses();

  const featuredCourses = useMemo(() => courses.slice(0, 6), [courses]);

  return (
    <div>
      {/* intro */}
      <div className="p-5 flex flex-wrap w-full">
        <div className="flex justify-between lg:px-8" data-aos="fade-up">
          <div className="flex lg:w-1/2 ">
            <img src={robo} />
            <div className="m-4 content-center text-wrap text-foreground text-2xl md:text-5xl poppins-bold">
              Upcoming{" "}
              <span className=" content-center text-primary text-2xl md:text-5xl poppins-bold">
                Courses-
              </span>{" "}
              Gear up for some Fun
            </div>
          </div>
          <Badge variant="secondary" className="self-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
            {courses.length} live courses
          </Badge>
        </div>
      </div>
      {/* Shop Items */}
      <div className="md:px-10 px-5 pb-10">
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-foreground">
            Loading live courses...
          </div>
        ) : error ? (
          <QueryErrorState
            className="rounded-2xl border border-border bg-card p-6"
            title="Couldn't load courses"
            message={error.message}
            onRetry={() => refetch()}
          />
        ) : featuredCourses.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-foreground">
            No courses available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 px-0 sm:grid-cols-2 lg:grid-cols-3 lg:px-20">
            {featuredCourses.map((course) => (
              <Card
                key={course._id}
                onClick={() => navigate({ to: `/CoursesProduct/${course._id}` })}
                className="overflow-hidden text-left"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate({ to: `/CoursesProduct/${course._id}` });
                  }
                }}
              >
                <img
                  className="h-56 w-full object-cover"
                  src={resolveBackendAssetUrl(course?.thumbnail, "https://via.placeholder.com/300x200")}
                  alt={course?.title || "Course"}
                  loading="lazy"
                  decoding="async"
                />
                <CardContent className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-lg bg-muted px-2 py-1 text-base font-bold text-muted-foreground">
                      {course?.category || "General"}
                    </p>
                    <div className="flex items-center">
                      <Star className="text-primary" />
                      <p className="ml-2 text-base text-muted-foreground">
                        {Number(course?.reviews || 0)} Reviews
                      </p>
                    </div>
                  </div>
                  <div className="my-4 text-xl font-bold text-foreground">
                    {course?.title || "Untitled course"}
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>{course?.month ? `${course.month} months` : "Flexible duration"}</p>
                    <p>{course?.studentsDownloaded ?? 0} enrolled</p>
                  </div>
                </CardContent>
                <CardFooter className="my-2 flex items-center justify-center p-0">
                  <Button type="button" className="rounded-full bg-primary px-4 py-2 font-bold text-background">
                    <span className="poppins-medium px-2 text-base">View Course</span>
                    <BellRing className="text-center text-lg" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Shop;
