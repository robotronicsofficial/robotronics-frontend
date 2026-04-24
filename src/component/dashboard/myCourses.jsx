import { MoveDown, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CenteredState from "../../components/layout/CenteredState";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import DialogShell from "../../components/ui/dialog-shell";
import { Spinner } from "../../components/ui/spinner";
import { getActiveChildSession } from "../../utils/childSessionRequest";
import {
  useSaveChildCoursesMutation,
  useSelectableChildCourses,
} from "../../hooks/useChildCourses";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const MyCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const navigate = useNavigate();
  const { id: routeChildId } = useParams();
  const activeChildSession = getActiveChildSession(routeChildId);
  const childId = activeChildSession?.childId || null;
  const {
    data: selectableCourses = {},
    isLoading: loading,
    error,
  } = useSelectableChildCourses(childId);
  const saveChildCoursesMutation = useSaveChildCoursesMutation();
  const courses = selectableCourses.courses || [];
  const maxCourses = selectableCourses.maxCourses ?? Infinity;

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
      if (!childId) {
        throw new Error("Child ID not found");
      }

      await saveChildCoursesMutation.mutateAsync({ childId, courseIds: selectedCourses });

      setTimeout(() => {
        navigate(`/Dashboard/myAllCourses/${childId}`);
      }, 1500);
    } catch (err) {
      console.error("Error saving courses:", err);
      alert(`Error saving courses: ${err.message}`);
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
  const hasFixedCourseLimit = Number.isFinite(maxCourses);
  const canSaveCourses = selectedCourses.length > 0
    && (!hasFixedCourseLimit || selectedCourses.length === maxCourses);

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
      contentClassName="w-full text-center py-5 p-0"
      navClassName="lg:w-[30%] w-2/3"
      navProps={{ "data-aos": "fade-up" }}
    >
      {/* Course Listing */}
      <div data-aos="fade-up">
        <h1 className="text-foreground lg:text-2xl text-base poppins-bold mb-6">
          {hasFixedCourseLimit ? `Select ${maxCourses} Courses` : "Select Courses"}
        </h1>

        {/* Save Button and Status */}
        {/* Save Button and Status */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="text-lg font-semibold mb-2">
            {hasFixedCourseLimit ? (
              <span className="text-info">Your subscription includes {maxCourses} course selections</span>
            ) : (
              <span className="text-success">Your subscription includes the full available course catalog</span>
            )}
          </div>

          <button
            onClick={saveSelectedCourses}
            className={`py-2 px-6 rounded-full shadow-xl ${!canSaveCourses
                ? "bg-muted cursor-not-allowed"
                : "bg-primary hover:bg-accent"
              } transition-colors`}
            disabled={!canSaveCourses || saveChildCoursesMutation.isPending}
          >
            {saveChildCoursesMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              hasFixedCourseLimit ? `Save ${maxCourses} Courses` : "Save Courses"
            )}
          </button>

          {/* ... rest of the button section ... */}
        </div>

        {/* Courses */}
        <div className="flex flex-wrap justify-between gap-y-6">
          {currentCourses.map((course) => (
            <div
              key={course._id}
              className="relative w-full sm:w-1/2 lg:w-1/3 px-4 mb-6 bg-card p-6"
            >
              <div className={`rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all ${selectedCourses.includes(course._id)
                ? "border-4 border-primary transform scale-[1.02]"
                : "border hover:shadow-md"
                }`}>
                <img
                  className="w-full h-48 object-cover"
                  src={resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")}
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

                {/* Toggle Button */}
                <div className="py-3 px-4 flex justify-center">
                  <button
                    onClick={() => toggleCourseSelection(course._id)}
                    className={`py-2 px-6 rounded-full transition-colors ${selectedCourses.includes(course._id)
                      ? "bg-destructive hover:bg-destructive text-background"
                      : "bg-success hover:bg-success text-background"
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
                    className="mt-2 bg-primary w-full text-foreground shadow-xl py-2 px-4 rounded-full flex items-center justify-center gap-x-2 hover:bg-accent transition-colors"
                  >
                    <span>View Detail</span>
                    <MoveDown className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <div className="flex items-center gap-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-full ${currentPage === 1
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
                className={`py-2 px-4 rounded-full ${currentPage === number
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
              className={`py-2 px-4 rounded-full ${currentPage === totalPages
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-muted hover:bg-muted text-foreground"
                }`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mb-20"></div>

        <DialogShell
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Plan Limit"
          titleClassName="text-destructive"
        >
          <div className="flex flex-col gap-4 text-center">
            <p className="text-foreground">
              Your subscription includes {maxCourses} course selections.
            </p>
            <p className="text-muted-foreground">
              Currently selected: {selectedCourses.length} courses
            </p>
            <Button
              type="button"
              className="mx-auto min-w-32 rounded-full bg-primary text-foreground hover:bg-accent hover:text-background"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogShell>
      </div>
    </DashboardLayout>
  );
};

export default MyCourses;
