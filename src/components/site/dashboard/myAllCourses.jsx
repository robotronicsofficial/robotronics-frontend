import { useState } from "react";
import { GraduationCap, Star } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Spinner } from "@/components/ui/spinner";
import { getActiveChildSession } from "@/utils/childSessionRequest";
import { useChildCourses } from "@/hooks/useChildCourses";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const MyAllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const navigate = useNavigate();
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const {
    data: activeCourses = [],
    isLoading: loading,
    error,
    refetch,
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

    navigate({ to: `/Dashboard/courseDetail/${courseId}` });
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
      <CenteredState className="min-h-screen bg-muted px-6">
        <QueryErrorState
          className="max-w-md"
          title="Couldn't load active courses"
          message={error.message}
          onRetry={() => refetch()}
        />
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
        <h1 className="text-foreground lg:text-2xl text-base mb-6">
          Your Active Courses
        </h1>

        {/* Courses */}
        {currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map((course) => (
              <Card key={course._id} className="h-full">
                <img
                  className="h-48 w-full object-cover"
                  src={
                    resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")
                  }
                  alt={course.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
                <CardContent className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="rounded-full bg-muted px-4 py-1 text-base text-muted-foreground">
                      {course.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="text-primary" />
                      <p className="text-muted-foreground text-base">
                        ({course.reviews || 0} Rating)
                      </p>
                    </div>
                  </div>
                  <div className="text-left text-xl font-bold text-wrap">
                    {course.title}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    onClick={() => handleCourseClick(course)}
                    className="h-auto w-full rounded-full bg-primary px-4 py-2 text-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span>View Course</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4 py-10 text-center">
            <GraduationCap aria-hidden="true" className="size-12 text-muted-foreground" />
            <p className="max-w-md text-muted-foreground text-lg">
              No active courses yet. Pick a course from your plan and we&apos;ll add it here so you can jump right in.
            </p>
            <Button
              type="button"
              onClick={() => navigate({ to: "/Dashboard/MyCoursesPage" })}
              className="h-auto rounded-full bg-primary px-6 py-2 text-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse courses
            </Button>
          </div>
        )}

        {/* Pagination */}
        {displayedCourses.length > coursesPerPage && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <div className="flex items-center gap-x-4">
              <Button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`h-auto rounded-full px-4 py-2 ${
                  currentPage === 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted hover:bg-muted text-foreground"
                }`}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <Button
                  type="button"
                  key={number}
                  onClick={() => paginate(number)}
                  className={`h-auto rounded-full px-4 py-2 ${
                    currentPage === number
                      ? "bg-primary text-foreground font-bold"
                      : "bg-muted hover:bg-muted text-foreground"
                  }`}
                >
                  {number}
                </Button>
              ))}

              <Button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`h-auto rounded-full px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted hover:bg-muted text-foreground"
                }`}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyAllCourses;
