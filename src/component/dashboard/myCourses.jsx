// import LeftNav from "./leftNav";
// import { FaStar } from "react-icons/fa";
// import JS from "../../assets/images/JS-MyCouses.svg";
// const MyCourses = () => {
//   const courses = [
//     {
//       id: 1,
//       title: "Learning JavaScript With Imagination",
//       author: "David Millar",
//       rating: 4.8,
//       reviews: 4.8,
//       category: "Development",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//     {
//       id: 2,
//       title: "The Complete Graphic Design for Beginners",
//       author: "Jenny Wilson",
//       rating: 4.5,
//       reviews: 4.5,
//       category: "Design",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//     {
//       id: 3,
//       title: "Learning Digital Marketing on Facebook",
//       author: "Wade Warren",
//       rating: 4.3,
//       reviews: 4.3,
//       category: "Marketing",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//     {
//       id: 4,
//       title: "Financial Analyst Training & Investing Course",
//       author: "Robert Fox",
//       rating: 4.8,
//       reviews: 4.8,
//       category: "Business",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//     {
//       id: 5,
//       title: "Data Analysis & Visualization Masterclass",
//       author: "Guy Hawkins",
//       rating: 4.5,
//       reviews: 4.5,
//       category: "Data Science",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//     {
//       id: 6,
//       title: "Master the Fundamentals of Math",
//       author: "Sawpawlo Mark",
//       rating: 4.7,
//       reviews: 4.7,
//       category: "Mathematics",
//       image: JS, // Replace with your image path
//       buttonText: "View Detail",
//       status: "Purchased",
//     },
//   ];

//   return (

//     <div className="bg-background p-10 lg:flex flex-row">
//       {/* NavBr */}
//       <div className="lg:w-1/3  w-2/3">
//         <LeftNav />
//       </div>
//       {/* products */}
//       <div className="w-full text=center py-5 ">
//         <h1 className="text-lightblack lg:text-2xl text-base font-bold  ">
//           My Courses
//         </h1>
//         {/* Shop Items */}
//         <div className="py-10 flex flex-wrap gap-6">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="w-full sm:w-1/2 lg:w-1/3 rounded overflow-hidden shadow-lg bg-white" // Remove padding
//             >
//               <img className="w-full" src={course.image} alt="Course" />
//               <div className="lg:px-6 py-4">
//                 <div className="lg:flex flex-row justify-between">
//                   <p className="text-gray-700 rounded-lg px-1 bg-lin text-base">
//                     {course.category}
//                   </p>
//                   {/* Stars */}
//                   <div className="flex items-center">
//                     <FaStar className="text-yellow-500" />
//                     <p className="text-gray-700 text-base ml-2">
//                       {course.rating} ({course.reviews} Reviews)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="font-bold text-xl text-wrap mb-2">
//                   {course.title}
//                 </div>

//                 <p className="flex flex-row text-gray-700 text-base">
//                   <span className="text-line space-x-2">by</span>
//                   {course.author}
//                 </p>
//               </div>
//               <div className="px-6 pt-4 pb-2">
//                 <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
//                   {course.buttonText}
//                 </button>
//                 <span className="text-gray-700 text-base ml-4 font-bold">
//                   {course.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>

//   );
// };

// export default MyCourses;

import LeftNav from "./leftNav";
import { FaStar } from "react-icons/fa";
import JS from "../../assets/images/JS-MyCouses.svg";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";

const MyCourses = () => {
  const [showAllCourses, setShowAllCourses] = useState(false); // Track toggle state

  const courses = [
    {
      id: 1,
      title: "Learning JavaScript With Imagination",
      author: "David Millar",
      rating: 4.8,
      reviews: 4.8,
      category: "Development",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
    {
      id: 2,
      title: "The Complete Graphic Design for Beginners",
      author: "Jenny Wilson",
      rating: 4.5,
      reviews: 4.5,
      category: "Design",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
    {
      id: 3,
      title: "Learning Digital Marketing on Facebook",
      author: "Wade Warren",
      rating: 4.3,
      reviews: 4.3,
      category: "Marketing",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
    {
      id: 4,
      title: "Financial Analyst Training & Investing Course",
      author: "Robert Fox",
      rating: 4.8,
      reviews: 4.8,
      category: "Business",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
    {
      id: 5,
      title: "Data Analysis & Visualization Masterclass",
      author: "Guy Hawkins",
      rating: 4.5,
      reviews: 4.5,
      category: "Data Science",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
    {
      id: 6,
      title: "Master the Fundamentals of Math",
      author: "Sawpawlo Mark",
      rating: 4.7,
      reviews: 4.7,
      category: "Mathematics",
      image: JS,
      buttonText: "View Detail",
      status: "Purchased",
    },
  ];

  // Toggle button handler
  const toggleCourses = () => {
    setShowAllCourses((prev) => !prev);
  };

  return (
    <div className="bg-background lg:flex flex-row">
      {/* Left Navigation */}
      <div
        className="lg:w-[30%] w-2/3"
        data-aos="fade-right"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <LeftNav />
      </div>

      {/* Course Listing */}
      <div
        className="w-full text-center py-5"
        data-aos="fade-left"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <h1 className="text-lightblack lg:text-2xl text-base poppins-bold">
          {showAllCourses ? "All Courses" : "Active Courses"}
        </h1>

        {/* Toggle Switch */}
        <div className="my-4 flex items-center justify-center">
          <span className="mr-2 text-sm">Active</span>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              onChange={toggleCourses}
              className="opacity-0 w-0 h-0 peer"
            />
            <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-yellow transition-all duration-300"></span>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></span>
          </label>
          <span className="ml-2 text-sm">All</span>
        </div>

        {/* Shop Items */}
        <div className="flex flex-wrap justify-between gap-y-6">
          {courses
            .filter((course) => (showAllCourses ? true : course.status === "Purchased"))
            .map((course) => (
              <div
                key={course.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6 bg-[#fffff] p-6"
              >
                <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col bg-[#ffffff]">
                  <img className="w-full" src={course.image} alt="Course" />
                  <div className="lg:px-6 py-4 flex-grow">
                    <div className="lg:flex flex-row mb-2 flex-wrap justify-between">
                      <p className="text-gray-700 text-wrap text-center px-4 py-1 rounded-full bg-[#efeff2] text-base">
                        {course.category}
                      </p>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 text-yellow" />
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
                        <FaArrowDown className="text-xs" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
