import { MoveDown, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogShell from "@/components/ui/dialog-shell";
import { Spinner } from "@/components/ui/spinner";
import { getActiveChildSession } from "@/utils/childSessionRequest";
import {
  useSaveChildCoursesMutation,
  useSelectableChildCourses,
} from "@/hooks/useChildCourses";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

const MyCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const navigate = useNavigate();
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const {
    data: selectableCourses = {},
    isLoading: loading,
    error,
    refetch,
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
        navigate({ to: "/Dashboard/myAllCourses" });
      }, 1500);
    } catch (err) {
      console.error("Error saving courses:", err);
      toast.error(`Error saving courses: ${err.message}`);
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
  const remaining = hasFixedCourseLimit
    ? Math.max(maxCourses - selectedCourses.length, 0)
    : 0;
  const buttonEnabled = selectedCourses.length > 0 && !saveChildCoursesMutation.isPending;
  const saveButtonLabel = hasFixedCourseLimit
    ? (selectedCourses.length === maxCourses
      ? `Save ${maxCourses} Courses`
      : `Save ${selectedCourses.length} of ${maxCourses} selected`)
    : (selectedCourses.length > 0
      ? `Save ${selectedCourses.length} Courses`
      : "Save Courses");

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
          title="Couldn't load available courses"
          message={error.message}
          onRetry={() => refetch()}
        />
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
        <h1 className="text-foreground lg:text-2xl text-base mb-6">
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

          <Button
            type="button"
            onClick={saveSelectedCourses}
            className={`h-auto rounded-full px-6 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              buttonEnabled
                ? "bg-primary hover:bg-primary-hover"
                : "bg-muted cursor-not-allowed"
            }`}
            disabled={!buttonEnabled || !canSaveCourses}
            aria-disabled={!canSaveCourses}
          >
            {saveChildCoursesMutation.isPending ? (
              <span className="flex items-center justify-center gap-x-2">
                <Spinner className="size-4 text-foreground" />
                Saving...
              </span>
            ) : (
              saveButtonLabel
            )}
          </Button>

          {hasFixedCourseLimit && selectedCourses.length !== maxCourses && (
            <p className="text-sm text-muted-foreground">
              {remaining > 0
                ? `Select exactly ${maxCourses} courses to save — ${remaining} more to go.`
                : `You've selected ${selectedCourses.length}. Deselect until you have exactly ${maxCourses}.`}
            </p>
          )}
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentCourses.map((course) => {
            const isSelected = selectedCourses.includes(course._id);
            return (
              <Card
                key={course._id}
                className={`h-full transition-colors ${isSelected ? "border-2 border-primary" : ""}`}
              >
                <img
                  className="h-48 w-full object-cover"
                  src={resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")}
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
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    type="button"
                    onClick={() => toggleCourseSelection(course._id)}
                    className={`h-auto w-full rounded-full px-6 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected
                      ? "bg-destructive hover:bg-destructive text-background"
                      : "bg-success hover:bg-success text-background"
                      }`}
                  >
                    {isSelected ? "Deselect" : "Select"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => navigate({ to: `/Dashboard/courseDetail/${course._id}` })}
                    className="h-auto w-full rounded-full bg-primary px-4 py-2 text-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span>View Detail</span>
                    <MoveDown className="text-xs" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <div className="flex items-center gap-x-4">
            <Button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`h-auto rounded-full px-4 py-2 ${currentPage === 1
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
                className={`h-auto rounded-full px-4 py-2 ${currentPage === number
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
              className={`h-auto rounded-full px-4 py-2 ${currentPage === totalPages
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-muted hover:bg-muted text-foreground"
                }`}
            >
              Next
            </Button>
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
              className="mx-auto min-w-32 rounded-full bg-primary text-foreground hover:bg-primary-hover"
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
