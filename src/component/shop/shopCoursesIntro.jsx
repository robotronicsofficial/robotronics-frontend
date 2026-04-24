import { useState } from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import arow from "../../assets/logo/shopArowIcon.svg";
import icon from "../../assets/logo/searchicon.svg";
import { cn } from "../../lib/utils";
import CourseProduct from "../course/courseProduct";
import ShopPages from "../shop/shopPages";
import { useCourses } from "../../hooks/useCourses";

const COURSE_FILTERS = [
  { label: "All", value: "" },
  { label: "Lego WeDo 2.0", value: "Lego WeDo 2.0" },
  { label: "Lego Mindstorms EV3", value: "Lego Mindstorms EV3" },
  { label: "Arduino based Robots", value: "Arduino based Robots" },
];
const paginationPages = [1, 2, 3, 4];

const ShopCoursesIntro = () => {
  const { data: courses = [] } = useCourses();
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredCourses =
    selectedFilter === ""
      ? courses
      : courses.filter((course) => course.category === selectedFilter);

  return (
    <div className="flex-col bg-lightgray px-2 lg:flex lg:px-20">
      <div className="flex-1">
        <div className="pt-8 lg:pt-16">
          <div className="h-0 w-full border border-lin" data-aos="fade-up"></div>
        </div>

        <div className="items-center justify-between px-2 pt-5 lg:flex lg:px-24 lg:pt-10 md:flex">
          <div className="flex w-full justify-between">
            <div className="flex">
              <IoHomeOutline className="h-5" data-aos="fade-up" />
              <p className="px-3 text-sm poppins-bold lg:text-base" data-aos="fade-up">
                Main Page
              </p>
            </div>
          </div>

          <div className="flex w-2/3 justify-between gap-5" data-aos="fade-up">
            <div className="flex w-full justify-between">
              <a href="#">
                <div className="flex">
                  <FaHeart className="h-6" />
                  <p className="px-3 text-sm poppins-bold lg:text-base">
                    Wish List (0)
                  </p>
                </div>
              </a>
              <FaArrowRight className="text-lin" />
            </div>

            <div className="flex w-full justify-between">
              <div className="flex">
                <BsHandbag className="h-6" />
                <p className="px-3 text-sm poppins-bold lg:text-base">
                  2 Products - $1000
                </p>
              </div>
              <FaArrowRight className="text-lin" />
            </div>
          </div>
        </div>

        <div className="pt-5 lg:pt-10" data-aos="fade-up">
          <div className="h-0 w-full border border-lin"></div>
        </div>

        <div className="py-4 lg:flex lg:py-10" data-aos="fade-down">
          <div className="self-center lg:w-1/5 lg:text-xl poppins-light">
            Category
          </div>
          <div className="lg:w-4/5">
            <p className="text-xl poppins-bold lg:text-2xl">Catalog</p>
            <div className="flex lg:gap-3">
              <div className="flex flex-1">
                <button type="button" className="border border-gray bg-white p-2">
                  <img src={icon} alt="search" />
                </button>
                <input
                  type="text"
                  className="w-full border border-gray"
                  placeholder="Search for courses"
                />
              </div>

              <div className="flex">
                <button type="button" className="border border-gray bg-white">
                  <img src={arow} alt="arrow" />
                </button>
                <input
                  type="text"
                  className="border border-gray lg:h-10 lg:w-64"
                  placeholder="Popular"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1" data-aos="fade-up">
        <div className="flex">
          <div className="lg:w-1/5">
            {COURSE_FILTERS.map((filter) => (
              <button
                key={filter.value || "all"}
                type="button"
                onClick={() => setSelectedFilter(filter.value)}
                className={cn(
                  "block pt-2 text-left text-sm poppins-light hover:text-black lg:pt-5 lg:text-base",
                  selectedFilter === filter.value ? "text-black" : "text-lightblack",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 lg:px-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {courses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseProduct
                  key={course?._id}
                  id={course?._id}
                  title={course?.title}
                  description={course?.description}
                  image={course?.thumbnail}
                  price={course?.price}
                  category={course?.category}
                  duration={course?.month}
                />
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ShopPages />
        <div className="justify-between lg:flex lg:p-5">
          <div className="flex">
            {paginationPages.map((page) => (
              <button
                type="button"
                key={page}
                className="bg-white p-1 px-3 text-sm hover:bg-gold lg:text-base"
                data-aos="fade-up"
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex" data-aos="fade-up">
            <p className="text-sm poppins-regular lg:text-base">
              SHOWED 1 - 9 OF 30 PRODUCTS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCoursesIntro;
