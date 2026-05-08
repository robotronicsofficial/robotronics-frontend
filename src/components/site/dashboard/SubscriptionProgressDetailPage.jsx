import { useState } from "react";
import { Download, FileText } from "lucide-react";

import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Text } from "@/components/ui/typography";
import {
  useChildProgress,
  useDownloadChildCertificateMutation,
} from "@/hooks/useChildCourses";
import { getActiveChildSession } from "@/utils/childSessionRequest";
import { cn } from "@/lib/utils";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const FilterChip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "inline-flex h-9 items-center rounded-full border px-4 text-body-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground",
    )}
  >
    {children}
  </button>
);

const StatusBadge = ({ status }) => {
  const isCompleted = (status || "active").toLowerCase() === "completed";
  return (
    <Badge variant={isCompleted ? "secondary" : "default"} className="rounded-full">
      {status || "Active"}
    </Badge>
  );
};

const CertificateCell = ({
  course,
  isDownloading,
  errorMessage,
  onDownload,
  onDismissError,
}) => {
  if (!course.certificateAvailable) {
    return (
      <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
        <FileText className="size-4" />
        <span title="Complete the course to download certificate">
          Locked
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        variant="link"
        size="sm"
        onClick={() => !isDownloading && onDownload()}
        disabled={isDownloading}
        className="h-auto p-0 text-body-sm"
      >
        <Download className="size-3.5" />
        {isDownloading ? "Generating…" : "Download"}
      </Button>
      {errorMessage && (
        <div className="flex items-start gap-2 text-caption text-destructive">
          <span className="max-w-xs break-words">{errorMessage}</span>
          <button type="button" onClick={onDismissError} className="underline">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

const SubscriptionProgressDetailPage = () => {
  const [filter, setFilter] = useState("all");
  const [downloadingCourseId, setDownloadingCourseId] = useState(null);
  const [downloadErrors, setDownloadErrors] = useState({});

  const activeChildSession = getActiveChildSession();
  const selectedChildId = activeChildSession?.childId || null;
  const {
    data: progressData,
    isLoading,
    error,
    refetch,
  } = useChildProgress(selectedChildId);
  const downloadCertificateMutation = useDownloadChildCertificateMutation();

  const progressErrorMessage = !selectedChildId
    ? "Child session not found. Please re-enter the PIN from Child Accounts."
    : error
      ? "Failed to load progress data. Check your connection and try again."
      : "";

  const handleDownloadCertificate = async (courseId, courseName) => {
    if (!selectedChildId || !courseId || downloadingCourseId) return;
    setDownloadingCourseId(courseId);
    setDownloadErrors((prev) => ({ ...prev, [courseId]: null }));
    try {
      const { blob } = await downloadCertificateMutation.mutateAsync({
        childId: selectedChildId,
        courseId,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${progressData.childName}_${courseName}_Certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadErrors((prev) => ({
        ...prev,
        [courseId]: err.message || "Failed to download certificate. Please try again.",
      }));
    } finally {
      setDownloadingCourseId(null);
    }
  };

  if (isLoading) {
    return (
      <CenteredState className="bg-background min-h-screen" contentClassName="text-center">
        <Spinner className="mx-auto size-12 text-primary" />
        <Text tone="muted" className="mt-4">
          Loading progress data…
        </Text>
      </CenteredState>
    );
  }

  if (progressErrorMessage) {
    return (
      <CenteredState className="bg-background min-h-screen px-6">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{progressErrorMessage}</AlertDescription>
          </Alert>
          <Button type="button" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </CenteredState>
    );
  }

  if (!progressData) {
    return (
      <CenteredState className="bg-background min-h-screen px-6">
        <Alert className="max-w-md">
          <AlertDescription>No progress data found for this student.</AlertDescription>
        </Alert>
      </CenteredState>
    );
  }

  const filteredCourses = progressData.courses.filter((course) => {
    if (filter === "all") return true;
    return (course.status || "active").toLowerCase() === filter;
  });

  return (
    <DashboardLayout withHeaderOffset={false} contentClassName="px-6">
      <div className="mb-6 flex flex-col gap-1">
        <Heading level={1} className="text-h1">
          {progressData.childName}
        </Heading>
        <Text tone="muted">Course progress and earned certificates.</Text>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <FilterChip
            key={option.value}
            active={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </FilterChip>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-4 text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                    Course
                  </th>
                  <th className="px-5 py-4 text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                    Modules
                  </th>
                  <th className="px-5 py-4 text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                    Certificate
                  </th>
                  <th className="px-5 py-4 text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => {
                  const courseId = course.courseId || course.id || course._id;
                  const courseName = course.name || course.courseName || "Course";
                  const isDownloading = downloadingCourseId === courseId;
                  return (
                    <tr key={courseId || index} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-body-sm text-foreground">
                        {courseName}
                      </td>
                      <td className="px-5 py-4 text-body-sm text-foreground">
                        {course.completed}
                      </td>
                      <td className="px-5 py-4">
                        <CertificateCell
                          course={course}
                          isDownloading={isDownloading}
                          errorMessage={downloadErrors[courseId]}
                          onDownload={() => handleDownloadCertificate(courseId, courseName)}
                          onDismissError={() =>
                            setDownloadErrors((prev) => ({ ...prev, [courseId]: null }))
                          }
                        />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={course.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default SubscriptionProgressDetailPage;
