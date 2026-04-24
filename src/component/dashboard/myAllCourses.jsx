import { useState, useEffect } from "react";
import LeftNav from "./leftNav";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  buildChildSessionRequest,
  getActiveChildSession,
} from "../../utils/childSessionRequest";
import { resolveBackendUrl } from "../../lib/api";

const extractActiveCourses = (payload) => {
  if (Array.isArray(payload?.data?.activeCourses)) return payload.data.activeCourses;
  if (Array.isArray(payload?.activeCourses)) return payload.activeCourses;
  if (Array.isArray(payload?.courses)) return payload.courses;
  return [];
};

const MyAllCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
  
        setLoading(true);

        const childSessionRequest = buildChildSessionRequest({
          method: "GET",
          childId,
        });

        if (!childSessionRequest) {
          throw new Error("Child session not found. Please re-enter the PIN.");
        }

        const childResponse = await fetch(
          resolveBackendUrl(`/api/child/${childId}/courses`),
          childSessionRequest
        );
        if (!childResponse.ok) {
          throw new Error(`Failed to fetch child data. Status: ${childResponse.status}`);
        }
        const childData = await childResponse.json();
        const childCourses = extractActiveCourses(childData);
        
        setActiveCourses(childCourses);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [childId]);

  const displayedCourses = activeCourses;
  const totalPages = Math.ceil(displayedCourses.length / coursesPerPage);
  
  // Pagination functions
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

  const currentCourses = displayedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const resolveCourseId = (course) => String(course?.courseId || course?._id || "");

  const handleCourseClick = (course) => {
    const courseId = resolveCourseId(course);

    if (!courseId) {
      return;
    }

    navigate(`/Dashboard/courseDetail/${courseId}`);
  };

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
      <div className="lg:w-[30%] w-2/3 mt-40">
        <LeftNav />
      </div>

      {/* Course Listing */}
      <div className="w-full text-center py-5 mt-40">
        <h1 className="text-lightblack lg:text-2xl text-base poppins-bold mb-6">
          Your Active Courses
        </h1>

        {/* Courses */}
        <div className="flex flex-wrap justify-between gap-y-6">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                key={course._id}
                className="relative w-full sm:w-1/2 lg:w-1/3 px-4 mb-6 bg-[#fffff] p-6"
              >
                <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      course.thumbnail
                        ? resolveBackendUrl(course.thumbnail)
                        : "https://via.placeholder.com/300x200"
                    }
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

                  <div className="pb-3 px-4">
                    <button
                      onClick={() => handleCourseClick(course)}
                      className="mt-2 bg-[#ffc224] w-full text-black shadow-xl py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#ffb700] transition-colors"
                    >
                      <span>View Course</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-10">
              <p className="text-gray-600 text-lg">
                You don't have any active courses yet.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {displayedCourses.length > coursesPerPage && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-full ${
                  currentPage === 1
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
                  className={`py-2 px-4 rounded-full ${
                    currentPage === number
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
                className={`py-2 px-4 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400 text-black"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAllCourses;
