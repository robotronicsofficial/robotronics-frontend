import { useState, useEffect } from "react";
import { FaStar, FaArrowDown } from "react-icons/fa";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Robogeniusmaincourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState(
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-courses`);
        const data = await response.json();
        if (data?.courses) {
          setCourses(data.courses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);


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
    navigate('/Robogeniushome/Register');
  };
  
  return (
    <div className="relative bg-[#ebe5e2] py-4 px-4 md:px-20 lg:px-40">
      <div className="mx-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl poppins-medium text-brown text-center w-full py-4 md:py-8 poppins-bold">
          Courses Included in RoboGenius Program
        </h1>
      </div>

      {/* Left Button - Hidden on mobile */}
      <button
        onClick={prevCourse}
        className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300 transition mx-4 md:mx-12 lg:mx-24"
      >
        <FaCircleArrowLeft />
      </button>

      {/* Courses Container */}
      <div className="flex justify-center gap-4 md:gap-6 overflow-hidden">
        {courses
          .slice(startIndex, startIndex + visibleCourses)
          .map((course) => (
            <div
              key={course._id}
              className="w-full max-w-xs sm:max-w-none sm:w-1/2 lg:w-1/3 px-2 sm:px-4 mb-2 p-2 sm:p-6"
            >

              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                <img
                    className="rounded-xl w-full h-48 sm:h-56 object-cover"
                    src={course.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}/${course.thumbnail.replace(/\\/g, "/")}` : "https://via.placeholder.com/300x200"}
                    alt={course.title || "Course"}
                />
                <div className="px-4 lg:px-6 py-2 flex-grow">
                  <div className="flex flex-row mb-2 flex-wrap justify-between my-3">
                    <p className="text-gray-700 text-wrap text-center px-2 sm:px-4 py-1 rounded-full bg-[#efeff2] text-sm sm:text-base">
                      {course.category}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow" />
                      <p className="text-gray-700 poppins-light text-sm sm:text-base ml-2">
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
                    <button onClick={handleViewDetails}
                    className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <span>View Course</span>
                      <FaArrowDown className="text-xs -rotate-90" />
                    </button>
                  </div>



                  {/* 
                  <button className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <span>Activate Course</span>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Right Button - Hidden on mobile */}
      <button
        onClick={nextCourse}
        className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300 transition mx-4 md:mx-12 lg:mx-24"
      >
        <FaCircleArrowRight />
      </button>

      {/* Mobile navigation buttons */}
      <div className="sm:hidden flex justify-center gap-4 mt-4">
        <button
          onClick={prevCourse}
          className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <FaCircleArrowLeft />
        </button>
        <button
          onClick={nextCourse}
          className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <FaCircleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Robogeniusmaincourses;
