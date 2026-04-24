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
    <CenteredState className="bg-gray-100 min-h-screen" contentClassName="text-center">
      <Spinner className="mx-auto size-12 text-yellow-600" />
      <p className="mt-4 text-gray-700">Loading progress data...</p>
    </CenteredState>
  );
  
  if (progressErrorMessage) return (
    <CenteredState className="bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">{progressErrorMessage}</p>
        <button 
          onClick={() => refetch()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </CenteredState>
  );
  
  if (!progressData) return (
    <CenteredState className="bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">No progress data found for this student.</p>
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
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-[#ffc224] text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-[#ffc224] text-white' : 'bg-gray-200'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full ${filter === 'completed' ? 'bg-[#ffc224] text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>

        {/* Course Progress Table */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Course Progress</h2>
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="text-left text-gray-700 font-semibold">
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
                  <tr key={index} className="text-gray-900 border-t">
                    <td className="p-3">{course.name || course.courseName || "Course"}</td>
                    <td className="p-3">{course.completed}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          {course.certificateAvailable ? (
                            <>
                              <button 
                                className={`hover:text-yellow-600 ${isDownloading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer text-blue-600'}`}
                                onClick={() => !isDownloading && handleDownloadCertificate(courseId, course.name || course.courseName || "Course")}
                                disabled={isDownloading}
                              >
                                {isDownloading ? 'Generating...' : 'Download'}
                              </button>
                              <FaFilePdf className="text-red-600" />
                            </>
                          ) : (
                            <div 
                              className="group relative cursor-not-allowed"
                              title="Complete the course to download certificate"
                            >
                              <span className="text-gray-400">Download</span>
                              <FaFilePdf className="text-gray-400 inline ml-2" />
                              <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap left-1/2 transform -translate-x-1/2">
                                Complete the course to download
                              </span>
                            </div>
                          )}
                        </div>
                        {courseError && (
                          <div className="text-red-500 text-xs mt-1 max-w-xs">
                            {courseError}
                            <button 
                              onClick={() => setDownloadErrors(prev => ({ ...prev, [courseId]: null }))}
                              className="ml-2 text-gray-500 hover:text-gray-700"
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
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
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
