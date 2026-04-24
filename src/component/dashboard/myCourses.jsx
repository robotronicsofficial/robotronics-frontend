import LeftNav from "./leftNav";
import { FaStar, FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  buildChildSessionRequest,
  getActiveChildSession,
} from "../../utils/childSessionRequest";
import { resolveBackendUrl } from "../../lib/api";
import { ensureArray } from "../../lib/robogenius";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxCourses, setMaxCourses] = useState(2); // Default to Basic plan limit
  const coursesPerPage = 9;
  const navigate = useNavigate();
  const { id: routeChildId } = useParams();
  const activeChildSession = getActiveChildSession(routeChildId);
  const childId = activeChildSession?.childId || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!childId) {
          throw new Error("Child ID not found in URL");
        }

        const childSessionRequest = buildChildSessionRequest({
          method: "GET",
          childId,
        });

        if (!childSessionRequest) {
          throw new Error("Child session not found. Please re-enter the PIN.");
        }

        // First fetch child data to get the plan
        const childResponse = await fetch(
          resolveBackendUrl(`/api/getChildPlan/${childId}`),
          childSessionRequest
        );
        if (!childResponse.ok) {
          throw new Error(`HTTP error! status: ${childResponse.status}`);
        }
        const childData = await childResponse.json();

        // Set max courses based on plan
        const planName = childData?.plan?.name || "Basic";
        const courseLimit = planName.toLowerCase() === "pro" ? 4 : 2;
        setMaxCourses(courseLimit);

        // Then fetch courses
        const coursesResponse = await fetch(resolveBackendUrl("/get-courses"));
        if (!coursesResponse.ok) {
          throw new Error(`HTTP error! status: ${coursesResponse.status}`);
        }
        const coursesData = await coursesResponse.json();
        setCourses(ensureArray(coursesData?.courses));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [childId]);

  const toggleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      if (selectedCourses.length < maxCourses) {
        setSelectedCourses([...selectedCourses, courseId]);
      } else {
        setShowModal(true);
      }
    }
  };

  const saveSelectedCourses = async () => {
    try {
      setSaveLoading(true);

      if (!childId) {
        throw new Error("Child ID not found");
      }

      const childSessionRequest = buildChildSessionRequest({
        method: "PUT",
        childId,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          courses: selectedCourses.map((courseId, index) => ({
            courseId,
            status: index === 0 ? "active" : "pending"
          }))
        },
      });

      if (!childSessionRequest) {
        throw new Error("Child session not found. Please re-enter the PIN.");
      }

      const response = await fetch(
        resolveBackendUrl(`/api/${childId}/courses`),
        childSessionRequest
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save courses");
      }

      setTimeout(() => {
        navigate(`/Dashboard/myAllCourses/${childId}`);
      }, 1500);
    } catch (err) {
      console.error("Error saving courses:", err);
      alert(`Error saving courses: ${err.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-background lg:flex flex-row px-4 md:px-20 pt-44 md:pt-2 relative">
      {/* Left Navigation */}
      <div className="lg:w-[30%] w-2/3" data-aos="fade-up">
        <LeftNav />
      </div>

      {/* Course Listing */}
      <div className="w-full text-center py-5" data-aos="fade-up">
        <h1 className="text-lightblack lg:text-2xl text-base poppins-bold mb-6">
          Select any {maxCourses} Courses
        </h1>

        {/* Save Button and Status */}
        {/* Save Button and Status */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="text-lg font-semibold mb-2">
            {maxCourses === 4 ? (
              <span className="text-green-600">You have a Pro plan (can select up to 4 courses)</span>
            ) : (
              <span className="text-blue-600">You have a Basic plan (must select exactly 2 courses)</span>
            )}
          </div>

          <button
            onClick={saveSelectedCourses}
            className={`py-2 px-6 rounded-full shadow-xl ${selectedCourses.length !== maxCourses
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ffc224] hover:bg-[#ffb700]"
              } transition-colors`}
            disabled={selectedCourses.length !== maxCourses || saveLoading}
          >
            {saveLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              `Save ${maxCourses} Courses`
            )}
          </button>

          {/* ... rest of the button section ... */}
        </div>

        {/* Courses */}
        <div className="flex flex-wrap justify-between gap-y-6">
          {currentCourses.map((course) => (
            <div
              key={course._id}
              className="relative w-full sm:w-1/2 lg:w-1/3 px-4 mb-6 bg-[#fffff] p-6"
            >
              <div className={`rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all ${selectedCourses.includes(course._id)
                ? "border-4 border-yellow-400 transform scale-[1.02]"
                : "border hover:shadow-md"
                }`}>
                <img
                  className="w-full h-48 object-cover"
                  src={course.thumbnail ? resolveBackendUrl(course.thumbnail) : "https://via.placeholder.com/300x200"}
                  alt={course.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
                <div className="px-6 md:px-2 py-2 flex-grow flex flex-col gap-2">
                  <div className="lg:flex flex-row mb-2 flex-wrap justify-between">
                    <p className="text-gray-700 text-wrap text-center px-4 py-1 rounded-full bg-[#efeff2] text-base mb-4 md:mb-0">
                      {course.category}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500" />
                      <p className="text-gray-700 poppins-light text-base ml-2">
                        ({course.reviews || 0} Rating)
                      </p>
                    </div>
                  </div>

                  <div className="font-bold text-xl p-2 poppins-bold text-left text-wrap mb-2">
                    {course.title}
                  </div>
                </div>

                {/* Toggle Button */}
                <div className="py-3 px-4 flex justify-center">
                  <button
                    onClick={() => toggleCourseSelection(course._id)}
                    className={`py-2 px-6 rounded-full transition-colors ${selectedCourses.includes(course._id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                  >
                    {selectedCourses.includes(course._id)
                      ? "Deselect"
                      : "Select"}
                  </button>
                </div>

                <div className="pb-3 px-4">
                  <button
                    onClick={() => navigate(`/Dashboard/courseDetail/${course._id}`)}
                    className="mt-2 bg-[#ffc224] w-full text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#ffb700] transition-colors"
                  >
                    <span>View Detail</span>
                    <FaArrowDown className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-full ${currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`py-2 px-4 rounded-full ${currentPage === number
                  ? "bg-[#ffc224] text-black font-bold"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded-full ${currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mb-20"></div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
              <h2 className="text-2xl font-bold mb-4 text-red-500">Plan Limit</h2>
              <p className="text-gray-700 mb-4">
                {maxCourses === 4
                  ? "You must select exactly 4 courses with your Pro plan."
                  : "You must select exactly 2 courses with your Basic plan."}
              </p>
              <p className="text-gray-600 mb-6">
                Currently selected: {selectedCourses.length} courses
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#ffc224] text-black py-2 px-6 rounded-full hover:bg-[#ffb700] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
