import { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CenteredState from "../../components/layout/CenteredState";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Spinner } from "../../components/ui/spinner";
import { getActiveChildSession } from "../../utils/childSessionRequest";
import { useChildCourses } from "../../hooks/useChildCourses";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const MyAllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const navigate = useNavigate();
  const { id: routeChildId } = useParams();
  const activeChildSession = getActiveChildSession(routeChildId);
  const childId = activeChildSession?.childId || null;
  const {
    data: activeCourses = [],
    isLoading: loading,
    error,
  } = useChildCourses(childId);

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
      <CenteredState className="h-screen">
        <Spinner className="size-12 text-primary" />
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState className="h-screen">
        <div className="text-destructive">Error: {error.message}</div>
      </CenteredState>
    );
  }

  return (
    <DashboardLayout
      className="bg-background block lg:flex flex-row relative"
      contentClassName="w-full text-center py-5 mt-40 p-0"
      navClassName="lg:w-[30%] w-2/3 mt-40"
    >
      {/* Course Listing */}
      <div>
        <h1 className="text-foreground lg:text-2xl text-base poppins-bold mb-6">
          Your Active Courses
        </h1>

        {/* Courses */}
        <div className="flex flex-wrap justify-between gap-y-6">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                key={course._id}
                className="relative w-full sm:w-1/2 lg:w-1/3 px-4 mb-6 bg-card p-6"
              >
                <div className="rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")
                    }
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200";
                    }}
                  />
                  <div className="px-6 md:px-2 py-2 flex-grow flex flex-col gap-2">
                    <div className="lg:flex flex-row mb-2 flex-wrap justify-between">
                      <p className="text-muted-foreground text-wrap text-center px-4 py-1 rounded-full bg-muted text-base mb-4 md:mb-0">
                        {course.category}
                      </p>
                      <div className="flex items-center">
                        <Star className="text-primary" />
                        <p className="text-muted-foreground poppins-light text-base ml-2">
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
                      className="mt-2 bg-primary w-full text-foreground shadow-xl py-2 px-4 rounded-full flex items-center justify-center gap-x-2 hover:bg-accent transition-colors"
                    >
                      <span>View Course</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-10">
              <p className="text-muted-foreground text-lg">
                You don't have any active courses yet.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {displayedCourses.length > coursesPerPage && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <div className="flex items-center gap-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-full ${
                  currentPage === 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted hover:bg-muted text-foreground"
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
                      ? "bg-primary text-foreground font-bold"
                      : "bg-muted hover:bg-muted text-foreground"
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
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted hover:bg-muted text-foreground"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyAllCourses;
