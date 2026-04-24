import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaFilePdf } from "react-icons/fa6";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CenteredState from "../../components/layout/CenteredState";
import { Spinner } from "../../components/ui/spinner";
import { getActiveChildSession } from "../../utils/childSessionRequest";
import {
  useChildProgress,
  useDownloadChildCertificateMutation,
} from "../../hooks/useChildCourses";

const SubscriptionProgressDetailPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const [downloadingCourseId, setDownloadingCourseId] = useState(null);
  const [downloadErrors, setDownloadErrors] = useState({}); // Track errors per course
  const activeChildSession = getActiveChildSession(childId || undefined);
  const selectedChildId = activeChildSession?.childId || null;
  const {
    data: progressData,
    isLoading: loading,
    error,
    refetch,
  } = useChildProgress(selectedChildId);
  const downloadCertificateMutation = useDownloadChildCertificateMutation();
  const progressErrorMessage = !selectedChildId
    ? 'Child session not found. Please re-enter the PIN from Child Accounts.'
    : error
      ? 'Failed to load progress data. Please check your connection and try again.'
      : "";

  const handleDownloadCertificate = async (courseId, courseName) => {
    if (!selectedChildId || !courseId || downloadingCourseId) return;

    setDownloadingCourseId(courseId);
    // Clear any previous error for this course
    setDownloadErrors(prev => ({ ...prev, [courseId]: null }));

    try {
      const { blob } = await downloadCertificateMutation.mutateAsync({
        childId: selectedChildId,
        courseId,
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${progressData.childName}_${courseName}_Certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      setDownloadErrors(prev => ({
        ...prev,
        [courseId]: err.message || 'Failed to download certificate. Please try again.'
      }));
    } finally {
      setDownloadingCourseId(null);
    }
  };

  if (loading) return (
    <CenteredState className="bg-muted min-h-screen" contentClassName="text-center">
      <Spinner className="mx-auto size-12 text-primary" />
      <p className="mt-4 text-muted-foreground">Loading progress data...</p>
    </CenteredState>
  );

  if (progressErrorMessage) return (
    <CenteredState className="bg-muted min-h-screen">
      <div className="bg-card p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold text-destructive mb-4">Error</h2>
        <p className="text-muted-foreground mb-4">{progressErrorMessage}</p>
        <button
          onClick={() => refetch()}
          className="bg-primary hover:bg-primary text-background py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </CenteredState>
  );

  if (!progressData) return (
    <CenteredState className="bg-muted min-h-screen">
      <div className="bg-card p-6 rounded-lg shadow-md">
        <p className="text-muted-foreground">No progress data found for this student.</p>
      </div>
    </CenteredState>
  );

  const filteredCourses = progressData.courses.filter(course => {
    if (filter === 'all') return true;
    return (course.status || 'active').toLowerCase() === filter;
  });

  return (
    <DashboardLayout withHeaderOffset={false}>
        <h1 className="text-3xl font-bold mb-4">{progressData.childName}</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-background' : 'bg-muted'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-primary text-background' : 'bg-muted'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full ${filter === 'completed' ? 'bg-primary text-background' : 'bg-muted'}`}
          >
            Completed
          </button>
        </div>

        {/* Course Progress Table */}
        <div className="bg-card p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Course Progress</h2>
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="text-left text-muted-foreground font-semibold">
                <th className="p-3">Course</th>
                <th className="p-3">Modules Completed</th>
                <th className="p-3">Certificate</th>
                <th className="p-3">Course Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => {
                const courseId = course.courseId || course.id || course._id;
                const isDownloading = downloadingCourseId === courseId;
                const courseError = downloadErrors[courseId];

                return (
                  <tr key={index} className="text-muted-foreground border-t">
                    <td className="p-3">{course.name || course.courseName || "Course"}</td>
                    <td className="p-3">{course.completed}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          {course.certificateAvailable ? (
                            <>
                              <button
                                className={`hover:text-primary ${isDownloading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer text-info'}`}
                                onClick={() => !isDownloading && handleDownloadCertificate(courseId, course.name || course.courseName || "Course")}
                                disabled={isDownloading}
                              >
                                {isDownloading ? 'Generating...' : 'Download'}
                              </button>
                              <FaFilePdf className="text-destructive" />
                            </>
                          ) : (
                            <div
                              className="group relative cursor-not-allowed"
                              title="Complete the course to download certificate"
                            >
                              <span className="text-muted-foreground">Download</span>
                              <FaFilePdf className="text-muted-foreground inline ml-2" />
                              <span className="absolute hidden group-hover:block bg-muted text-background text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap left-1/2 transform -translate-x-1/2">
                                Complete the course to download
                              </span>
                            </div>
                          )}
                        </div>
                        {courseError && (
                          <div className="text-destructive text-xs mt-1 max-w-xs">
                            {courseError}
                            <button
                              onClick={() => setDownloadErrors(prev => ({ ...prev, [courseId]: null }))}
                              className="ml-2 text-muted-foreground hover:text-muted-foreground"
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (course.status || 'active').toLowerCase() === 'completed'
                          ? 'bg-success/10 text-success'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </DashboardLayout>
  );
};

export default SubscriptionProgressDetailPage;
