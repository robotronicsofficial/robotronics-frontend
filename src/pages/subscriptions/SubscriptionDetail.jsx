// import { AiOutlineRight } from "react-icons/ai";
// import { FiDownload } from "react-icons/fi";
// import { FaStar, FaArrowDown } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
// import { useState } from "react";
// import JS from "../../assets/images/JS-MyCouses.svg";

const SubscriptionDetail = () => {
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
        className="bg-card p-8 py-6 rounded-xl"
        data-aos="fade-up"


      >
        <div className="py-5">
          <h1 className="font-bold text-xl mb-4 poppins-bold">Who this course is for?</h1>
          <p className="text-wrap text-foreground poppins-light">
          The subscription is for parents who want to prepare their kids for the future by exposing them to modern skills.
          <br />
           This is for students of age 6 and onwards belonging to any socio-economic background can benefit from this program across the Globe. All the courses are recorded in simple English language with generally acceptable accent.
          </p>
        </div>

        <div>
          <ul className="flex flex-col gap-y-4">
            <div className="mb-6">
              <li className="flex items-center gap-x-6">
                <span className="font-medium text-2xl poppins-bold">Requirements</span>
              </li>
            </div>
            <p className="text-wrap text-foreground poppins-light">
            Students only need a normal internet connection. The learning platform is responsive across laptop, tablet, and mobile screens.
          </p>

          <div>
          <span className="font-medium text-2xl poppins-bold">Resources Provided by Robotronics</span>
          </div>


            <div className="flex flex-col gap-y-3 poppins-light">
              <li className="flex items-center gap-x-9">
                <span className="text-primary">
                  <GoDotFill />
                </span>
                <span>Recorded Video Lectures</span>
              </li>
              <li className="flex items-center gap-x-9">
                <span className="text-primary">
                  <GoDotFill />
                </span>
                <span>Code Files for each Lecture(Where ever applicable)</span>
              </li>
              <li className="flex items-center gap-x-9">
                <span className="text-primary">
                  <GoDotFill />
                </span>
                <span>Practice Assignments</span>
              </li>
              <li className="flex items-center gap-x-9">
                <span className="text-primary">
                  <GoDotFill />
                </span>
                <span>Module based Assessments</span>
              </li>
              <li className="flex items-center gap-x-9">
                <span className="text-primary">
                  <GoDotFill />
                </span>
                <span>E-Certificates for Active Learners</span>
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
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-2 bg-card p-6"
              >
                <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col bg-card">
                  <img className="w-full" src={course.image} alt="Course" />
                  <div className="lg:px-6 py-4 flex-grow">
                    <div className="lg:flex flex-row mb-2 flex-wrap justify-between">
                      <p className="text-muted-foreground text-wrap text-center px-4 py-1 rounded-full bg-muted text-base">
                        {course.category}
                      </p>
                      <div className="flex items-center">
                        <FaStar className="text-primary" />
                        <p className="text-muted-foreground poppins-light text-base ml-2">
                          ({course.reviews} Reviews)
                        </p>
                      </div>
                    </div>

                    <div className="font-bold text-xl p-2 poppins-bold text-left text-wrap mb-2">
                      {course.title}
                    </div>

                    <p className="flex flex-col text-muted-foreground gap-x-2 text-left text-base">
                      <span className="text-muted-foreground px-2">by</span>
                      {course.author}
                    </p>
                  </div>
                  <div className="p-4 px-8">
                    <a href="/Dashboard/courseDetail">
                      <button className="bg-primary text-foreground shadow-xl py-2 px-4 rounded-full flex items-center justify-center gap-x-2">
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
                className="bg-primary text-foreground shadow-xl py-2 px-4 rounded-full flex items-center justify-center gap-x-2"
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

export default SubscriptionDetail;
