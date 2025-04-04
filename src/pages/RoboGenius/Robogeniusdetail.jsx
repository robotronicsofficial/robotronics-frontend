// import { AiOutlineRight } from "react-icons/ai";
// import { FiDownload } from "react-icons/fi";
// import { FaStar, FaArrowDown } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
// import { useState } from "react";
// import JS from "../../assets/images/JS-MyCouses.svg";
// import Robogeniusreview from "./Robogeniusreview";

const Robogeniusdetail = () => {
  // const [showAllCourses, setShowAllCourses] = useState(false); // Track toggle state
  // const [visibleCourses, setVisibleCourses] = useState(3); // State to track how many courses are visible

  // const handleViewMore = () => {
  //   setVisibleCourses((prev) => prev + 3); // Show 3 more courses when button is clicked
  // };

  // const handleShowLess = () => {
  //   setVisibleCourses(3); // Reset to showing only the default 3 courses
  // };

  // const courses = [
  //   {
  //     id: 1,
  //     title: "Learning JavaScript With Imagination",
  //     author: "David Millar",
  //     rating: 4.8,
  //     reviews: 4.8,
  //     category: "Development",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  //   {
  //     id: 2,
  //     title: "The Complete Graphic Design for Beginners",
  //     author: "Jenny Wilson",
  //     rating: 4.5,
  //     reviews: 4.5,
  //     category: "Design",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  //   {
  //     id: 3,
  //     title: "Learning Digital Marketing on Facebook",
  //     author: "Wade Warren",
  //     rating: 4.3,
  //     reviews: 4.3,
  //     category: "Marketing",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  //   {
  //     id: 4,
  //     title: "Financial Analyst Training & Investing Course",
  //     author: "Robert Fox",
  //     rating: 4.8,
  //     reviews: 4.8,
  //     category: "Business",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  //   {
  //     id: 5,
  //     title: "Data Analysis & Visualization Masterclass",
  //     author: "Guy Hawkins",
  //     rating: 4.5,
  //     reviews: 4.5,
  //     category: "Data Science",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  //   {
  //     id: 6,
  //     title: "Master the Fundamentals of Math",
  //     author: "Sawpawlo Mark",
  //     rating: 4.7,
  //     reviews: 4.7,
  //     category: "Mathematics",
  //     image: JS, // Replace with actual image path
  //     buttonText: "View Detail",
  //     status: "Purchased",
  //   },
  // ];

  return (
    <div className="bg-background lg:px-24 py-5">
      <div
        className="bg-white p-8 py-10 rounded-xl"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <div className="py-5">
          <h1 className="font-bold text-xl mb-4">Who this course is for?</h1>
          <p className="text-wrap text-lightblack">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            semper turpis, ac viverra velit tristique vitae. Sed vel felis ac
            neque euismod rutrum. Donec vulputate, lectus at tristique suscipit,
            ligula velit cursus purus, in condimentum metus dolor in urna. Donec
            at turpis vel nunc aliquet iaculis. Sed congue semper turpis, ac
            viverra velit tristique vitae. Sed vel felis ac neque euismod
            rutrum.
          </p>
        </div>

        <div>
          <ul className="space-y-4">
            <div className="mb-6">
              <li className="flex items-center space-x-6">
                <span className="font-medium text-2xl">Requirments</span>
              </li>
            </div>
            <p className="text-wrap text-lightblack">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            semper turpis, ac viverra velit tristique vitae. Sed vel felis ac
            neque euismod rutrum. Donec vulputate, lectus at tristique suscipit,
            ligula velit cursus purus, in condimentum metus dolor in urna. Donec
            at turpis vel nunc aliquet iaculis. Sed congue semper turpis, ac
            viverra velit tristique vitae. Sed vel felis ac neque euismod
            rutrum.
          </p>
            <div className="space-y-4">
              <li className="flex items-center space-x-9">
                <span className="text-yellow">
                  <GoDotFill />
                </span>
                <span>Video Section</span>
              </li>
              <li className="flex items-center space-x-9">
                <span className="text-yellow">
                  <GoDotFill />
                </span>
                <span>Section Book</span>
              </li>
              <li className="flex items-center space-x-9">
                <span className="text-yellow">
                  <GoDotFill />
                </span>
                <span>PDF</span>
              </li>
              <li className="flex items-center space-x-9">
                <span className="text-yellow">
                  <GoDotFill />
                </span>
                <span>Audio</span>
              </li>
            </div>
          </ul>
        </div>

        {/* Course Sections */}
        <div className="mt-10">
          {/* Courses Grid */}
          {/* <div className="flex flex-wrap justify-between gap-y-6">
            {courses.slice(0, visibleCourses).map((course) => (
              <div
                key={course.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-2 bg-[#ffffff] p-6"
              >
                <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col bg-[#ffffff]">
                  <img className="w-full" src={course.image} alt="Course" />
                  <div className="lg:px-6 py-4 flex-grow">
                    <div className="lg:flex flex-row mb-2 flex-wrap justify-between">
                      <p className="text-gray-700 text-wrap text-center px-4 py-1 rounded-full bg-[#efeff2] text-base">
                        {course.category}
                      </p>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500" />
                        <p className="text-gray-700 poppins-light text-base ml-2">
                          ({course.reviews} Reviews)
                        </p>
                      </div>
                    </div>

                    <div className="font-bold text-xl p-2 poppins-bold text-left text-wrap mb-2">
                      {course.title}
                    </div>

                    <p className="text-gray-700 space-x-2 text-left text-base">
                      <span className="text-line px-2">by</span>
                      {course.author}
                    </p>
                  </div>
                  <div className="p-4 px-8">
                    <a href="/Dashboard/courseDetail">
                      <button className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2">
                        <span>{course.buttonText}</span>
                        <FaArrowDown className="text-xs -rotate-90" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* View More Button */}
          {/* {visibleCourses < courses.length && ( // Show the button only if there are more courses to display
            <div className="w-full flex justify-end pr-4">
              <button
                onClick={handleViewMore}
                className="bg-[#ffc224] text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2"
              >
                <span>View More</span>
                <FaArrowDown className="text-xs transform -rotate-120" />
              </button>
            </div>
          )} */}
        </div>

        {/* Reviews */}
      </div>
    </div>
  );
};

export default Robogeniusdetail;
