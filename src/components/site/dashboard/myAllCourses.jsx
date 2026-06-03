import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, GraduationCap, PlayCircle, Star } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { useChildCourses } from "@/hooks/useChildCourses";
import { resolveCatalogImageUrl } from "@/lib/catalogImage";
import { getActiveChildSession } from "@/utils/childSessionRequest";
import { cn } from "@/lib/utils";

const COURSES_PER_PAGE = 9;

const resolveCourseId = (course) => String(course?.courseId || course?._id || "");

const CourseCard = ({ course, onClick }) => (
  <Card className="overflow-hidden p-0">
    <img
      className="h-44 w-full object-cover"
      src={resolveCatalogImageUrl(course.thumbnail)}
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
    <CardFooter>
      <Button type="button" onClick={onClick} className="w-full rounded-full">
        View course
      </Button>
    </CardFooter>
  </Card>
);

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

const ResumeHero = ({ course, onResume }) => {
  const progress = Math.max(0, Math.min(100, Number(course?.progress) || 0));
  const moduleLabel = course?.currentModule || course?.nextModule || course?.title;
  return (
    <Card className="overflow-hidden border-primary/30 bg-primary-soft p-0">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="brand">Pick up where you left off</Eyebrow>
          <Heading level={2} className="text-h3">
            Continue: {moduleLabel}
          </Heading>
          <Text size="sm" tone="muted">
            {progress > 0
              ? `${progress}% complete · keep going`
              : "Ready to start your next lesson"}
          </Text>
          <div className="max-w-xs">
            <Progress value={progress} />
          </div>
        </div>
        <Button type="button" size="marketingLg" onClick={onResume}>
          <PlayCircle className="size-4" />
          Resume learning
        </Button>
      </CardContent>
    </Card>
  );
};

const MyAllCourses = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const {
    data: courses = [],
    isLoading,
    error,
    refetch,
  } = useChildCourses(childId);

  const totalPages = Math.max(1, Math.ceil(courses.length / COURSES_PER_PAGE));
  const visible = courses.slice((page - 1) * COURSES_PER_PAGE, page * COURSES_PER_PAGE);

  /* Resume card prefers an in-progress course (1–99%); falls back to the first
     active course if none have progress yet. */
  const resumeCourse = useMemo(() => {
    if (!courses.length) return null;
    const inProgress = [...courses]
      .filter((course) => Number(course?.progress) > 0 && Number(course?.progress) < 100)
      .sort((a, b) => (b.progress || 0) - (a.progress || 0))[0];
    return inProgress || courses[0];
  }, [courses]);

  const handleCourseClick = (course) => {
    const courseId = resolveCourseId(course);
    if (!courseId) return;
    navigate({ to: "/Dashboard/courseDetail/$id", params: { id: courseId } });
  };

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
          title="Couldn't load active courses"
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
          Your active courses
        </Heading>
        <Text tone="muted">
          Pick up where you left off, or browse new courses from your plan.
        </Text>
      </div>

      {courses.length === 0 ? (
        <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-12 text-center">
          <GraduationCap aria-hidden="true" className="size-12 text-muted-foreground" />
          <Text tone="muted" className="max-w-md">
            No active courses yet. Pick a course from your plan and we&apos;ll add it here so you can jump right in.
          </Text>
          <Button
            type="button"
            size="marketing"
            onClick={() => navigate({ to: "/Dashboard/MyCoursesPage" })}
          >
            Browse courses
          </Button>
        </div>
      ) : (
        <>
          {resumeCourse && (
            <div className="mb-8">
              <ResumeHero
                course={resumeCourse}
                onResume={() => handleCourseClick(resumeCourse)}
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onClick={() => handleCourseClick(course)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default MyAllCourses;
