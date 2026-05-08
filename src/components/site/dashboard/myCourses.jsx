import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";

import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogShell from "@/components/ui/dialog-shell";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Text } from "@/components/ui/typography";
import { getActiveChildSession } from "@/utils/childSessionRequest";
import {
  useSaveChildCoursesMutation,
  useSelectableChildCourses,
} from "@/hooks/useChildCourses";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { cn } from "@/lib/utils";

const COURSES_PER_PAGE = 9;

const Pagination = ({ page, totalPages, onChange }) => (
  <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Previous page"
      onClick={() => onChange(page - 1)}
      disabled={page === 1}
      className="rounded-full"
    >
      <ChevronLeft className="size-4" />
    </Button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
      <Button
        key={n}
        type="button"
        variant={n === page ? "default" : "ghost"}
        size="icon"
        aria-label={`Page ${n}`}
        aria-current={n === page ? "page" : undefined}
        onClick={() => onChange(n)}
        className={cn("rounded-full", n === page && "font-semibold")}
      >
        {n}
      </Button>
    ))}
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Next page"
      onClick={() => onChange(page + 1)}
      disabled={page === totalPages}
      className="rounded-full"
    >
      <ChevronRight className="size-4" />
    </Button>
  </nav>
);

const SelectableCard = ({ course, isSelected, onToggle, onView }) => (
  <Card
    className={cn(
      "overflow-hidden p-0 transition-colors",
      isSelected && "border-2 border-primary",
    )}
  >
    <img
      className="h-44 w-full object-cover"
      src={resolveBackendAssetUrl(course.thumbnail, "https://via.placeholder.com/300x200")}
      alt={course.title}
      loading="lazy"
    />
    <CardContent className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-3">
        {course.category && (
          <Badge variant="secondary" className="rounded-full">
            {course.category}
          </Badge>
        )}
        <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          {course.reviews || 0} ratings
        </div>
      </div>
      <Heading level={3} className="text-h5 leading-snug">
        {course.title}
      </Heading>
    </CardContent>
    <CardFooter className="flex flex-col gap-2 bg-transparent">
      <Button
        type="button"
        onClick={onToggle}
        variant={isSelected ? "outline" : "default"}
        className="w-full rounded-full"
      >
        {isSelected ? "Deselect" : "Select"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onView}
        className="text-body-sm"
      >
        View details
      </Button>
    </CardFooter>
  </Card>
);

const MyCourses = () => {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const {
    data: selectableCourses = {},
    isLoading,
    error,
    refetch,
  } = useSelectableChildCourses(childId);
  const saveChildCoursesMutation = useSaveChildCoursesMutation();

  const courses = selectableCourses.courses || [];
  const maxCourses = selectableCourses.maxCourses ?? Infinity;
  const hasFixedCourseLimit = Number.isFinite(maxCourses);

  const toggleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
      return;
    }
    if (selectedCourses.length >= maxCourses) {
      setShowLimitModal(true);
      return;
    }
    setSelectedCourses([...selectedCourses, courseId]);
  };

  const saveSelectedCourses = async () => {
    try {
      if (!childId) throw new Error("Child ID not found");
      await saveChildCoursesMutation.mutateAsync({ childId, courseIds: selectedCourses });
      setTimeout(() => navigate({ to: "/Dashboard/myAllCourses" }), 1500);
    } catch (err) {
      toast.error(`Error saving courses: ${err.message}`);
    }
  };

  const totalPages = Math.max(1, Math.ceil(courses.length / COURSES_PER_PAGE));
  const visible = courses.slice((page - 1) * COURSES_PER_PAGE, page * COURSES_PER_PAGE);

  const remaining = hasFixedCourseLimit
    ? Math.max(maxCourses - selectedCourses.length, 0)
    : 0;
  /* Relaxed gate — partial saves are allowed. Plans simply cap selections at
     `maxCourses` total. Kids can pick fewer courses now and add the rest later. */
  const canSave = selectedCourses.length > 0;
  const saveLabel = hasFixedCourseLimit
    ? selectedCourses.length === 0
      ? `Pick at least 1 course`
      : selectedCourses.length === maxCourses
        ? `Save ${maxCourses} courses`
        : `Save ${selectedCourses.length} (add up to ${maxCourses})`
    : selectedCourses.length > 0
      ? `Save ${selectedCourses.length} courses`
      : "Pick at least 1 course";

  if (isLoading) {
    return (
      <CenteredState className="h-screen">
        <Spinner className="size-12 text-primary" />
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState className="min-h-screen bg-background px-6">
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
    <DashboardLayout contentClassName="px-6">
      <div className="mb-8 flex flex-col gap-1">
        <Heading level={1} className="text-h1">
          {hasFixedCourseLimit ? `Select ${maxCourses} courses` : "Select your courses"}
        </Heading>
        <Text tone="muted">
          {hasFixedCourseLimit
            ? `Your subscription includes ${maxCourses} course selections.`
            : "Your subscription includes the full course catalog."}
        </Text>
      </div>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <Text size="sm" tone="muted">
          {hasFixedCourseLimit
            ? remaining > 0
              ? `${selectedCourses.length} selected · room for ${remaining} more${selectedCourses.length === 0 ? " (pick at least 1 to start)" : ""}.`
              : `${selectedCourses.length} of ${maxCourses} selected — your plan is full.`
            : `${selectedCourses.length} selected.`}
        </Text>
        <Button
          type="button"
          size="marketing"
          onClick={saveSelectedCourses}
          disabled={!canSave || saveChildCoursesMutation.isPending}
        >
          {saveChildCoursesMutation.isPending ? (
            <>
              <Spinner className="size-4" />
              Saving…
            </>
          ) : (
            saveLabel
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <SelectableCard
            key={course._id}
            course={course}
            isSelected={selectedCourses.includes(course._id)}
            onToggle={() => toggleCourseSelection(course._id)}
            onView={() =>
              navigate({ to: "/Dashboard/courseDetail/$id", params: { id: course._id } })
            }
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}

      <DialogShell
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        title="Plan limit reached"
        titleClassName="text-destructive"
      >
        <div className="flex flex-col gap-4">
          <Text>
            Your subscription includes {maxCourses} course selections.
          </Text>
          <Text size="sm" tone="muted">
            Currently selected: {selectedCourses.length} courses.
          </Text>
          <Button
            type="button"
            className="mx-auto min-w-32 rounded-full"
            onClick={() => setShowLimitModal(false)}
          >
            Close
          </Button>
        </div>
      </DialogShell>
    </DashboardLayout>
  );
};

export default MyCourses;
