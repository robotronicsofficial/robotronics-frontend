import { useState } from "react";
import { FaStar, FaArrowDown } from "react-icons/fa";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import JS from "../../assets/images/JS-MyCouses.svg";

const courses = [
  {
    id: 1,
    category: "Development",
    reviews: 4.8,
    title: "Learning JavaScript With Imagination",
    author: "John Doe",
    buttonText: "Activate Course",
    image: JS, // Replace with actual image path
  },
  {
    id: 2,
    category: "Design",
    reviews: 4.5,
    title: "The Complete Graphic Design for Beginners",
    author: "Jane Smith",
    buttonText: "Activate Course",
    image: JS, // Replace with actual image path
  },
  {
    id: 3,
    category: "Marketing",
    reviews: 4.3,
    title: "Learning Digital Marketing on Facebook",
    author: "Mike Johnson",
    buttonText: "Activate Course",
    image: JS, // Replace with actual image path
  },
  {
    id: 4,
    category: "Business",
    reviews: 4.6,
    title: "Mastering Business Strategies",
    author: "Alice Brown",
    buttonText: "Activate Course",
    image: JS, // Replace with actual image path
  },
  {
    id: 5,
    category: "Technology",
    reviews: 4.7,
    title: "AI & Machine Learning Basics",
    author: "Bob White",
    buttonText: "Activate Course",
    image: JS, // Replace with actual image path
  },
];

const Robogeniusmaincourses = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCourses = 3; // Number of courses shown at a time

  const prevCourse = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - visibleCourses : prevIndex - 1
    );
  };

  const nextCourse = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleCourses >= courses.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative bg-[#ebe5e2] py-4 px-40 ">
      <div className="mx-4 ">
        <h1 className="text-4xl poppins-medium text-brown text-center w-full  py-8">
          Courses Included in RoboGenius Program
        </h1>
      </div>
      {/* Left Button */}
      <button
        onClick={prevCourse}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300 transition mx-24"
      >
        <FaCircleArrowLeft />
      </button>

      {/* Courses Container */}
      <div className="flex justify-center gap-6 overflow-hidden">
        {courses
          .slice(startIndex, startIndex + visibleCourses)
          .map((course) => (
            <div
              key={course.id}
              className="w-full  sm:w-1/2 lg:w-1/3 px-4 mb-2 p-6"
            >
              <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col bg-[#ffffff] ">
                <img className="w-full" src={course.image} alt="Course" />
                <div className="lg:px-6 py-2 flex-grow">
                  <div className="lg:flex flex-row mb-2 flex-wrap justify-between my-3">
                    <p className="text-gray-700 text-wrap text-center px-4 py-1 rounded-full bg-[#efeff2] text-base">
                      {course.category}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow" />
                      <p className="text-gray-700 poppins-light text-base ml-2">
                        ({course.reviews} Reviews)
                      </p>
                    </div>
                  </div>

                  <div className="font-bold text-xl p-2 poppins-bold text-left text-wrap ">
                    {course.title}
                  </div>
                </div>
                <div className="px-8 mb-4 flex gap-2 py-4">
                  <button className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2">
                    <span>View Detail</span>
                    <FaArrowDown className="text-xs -rotate-90" />
                  </button>

                  <button className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2">
                    <span>Activate Course</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Right Button */}
      <button
        onClick={nextCourse}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300 transition mr-24"
      >
        <FaCircleArrowRight />
      </button>
    </div>
  );
};

export default Robogeniusmaincourses;
