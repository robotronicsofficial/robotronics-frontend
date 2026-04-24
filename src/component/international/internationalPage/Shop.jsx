import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import robo from "../../../assets/logo/Robotrinic.svg";
import { FaStar } from "react-icons/fa";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";

import { useCourses } from "../../../hooks/useCourses";
const Shop = () => {
  const navigate = useNavigate();
  const {
    data: courses = [],
    isLoading: loading,
    error,
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
          <div className="self-center rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
            {courses.length} live courses
          </div>
        </div>
      </div>
      {/* Shop Items */}
      <div className="md:px-10 px-5 pb-10">
        {loading ? (
          <div className="rounded-2xl bg-card p-10 text-center text-foreground shadow-sm">
            Loading live courses...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-card p-10 text-center text-red-600 shadow-sm">
            We couldn&apos;t load courses right now.
          </div>
        ) : featuredCourses.length === 0 ? (
          <div className="rounded-2xl bg-card p-10 text-center text-foreground shadow-sm">
            No courses available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 px-0 sm:grid-cols-2 lg:grid-cols-3 lg:px-20">
            {featuredCourses.map((course) => (
              <button
                key={course._id}
                type="button"
                onClick={() => navigate(`/CoursesProduct/${course._id}`)}
                className="overflow-hidden rounded-2xl bg-card p-2 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  className="h-56 w-full object-cover"
                  src={resolveBackendAssetUrl(course?.thumbnail, "https://via.placeholder.com/300x200")}
                  alt={course?.title || "Course"}
                  loading="lazy"
                  decoding="async"
                />
                <div className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-lg bg-muted px-2 py-1 text-base font-bold text-muted-foreground-700">
                      {course?.category || "General"}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-primary" />
                      <p className="ml-2 text-base text-muted-foreground-700">
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
                </div>
                <div className="my-2 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-bold text-background">
                    <p className="poppins-medium text-base px-2">View Course</p>
                    <MdOutlineNotificationsActive className="text-center text-lg" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Shop;
