import LeftNav from "./leftNav";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RoboGeniusProgreeDetailPage = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const [downloading, setDownloading] = useState(false);
  const [downloadErrors, setDownloadErrors] = useState({}); // Track errors per course

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!childId) {
        setError('Child ID not found in URL');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/${childId}/progress`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProgressData(data);
      } catch (err) {
        setError('Failed to load progress data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [childId]);

  const handleDownloadCertificate = async (courseId, courseName) => {
    if (!childId || !courseId || downloading) return;

    setDownloading(true);
    // Clear any previous error for this course
    setDownloadErrors(prev => ({ ...prev, [courseId]: null }));
    
    try {
      // Single API call to generate and get download URL
      const response = await fetch(`http://localhost:8080/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          childId,
          courseId,
          childName: progressData.childName,
          courseName
        })
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();

      // Download the generated certificate
      const downloadResponse = await fetch(
        `http://localhost:8080/api/download/${result.certificateId}`
      );

      if (!downloadResponse.ok) {
        throw new Error('Failed to download certificate file');
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${progressData.childName}_${courseName}_Certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Refresh progress data
      try {
        const updatedProgress = await fetch(`http://localhost:8080/api/${childId}/progress`);
        if (updatedProgress.ok) {
          const updatedData = await updatedProgress.json();
          setProgressData(updatedData);
        }
      } catch (refreshError) {
        console.error("Failed to refresh progress data:", refreshError);
        // We don't throw this error as the download was successful
      }

    } catch (err) {
      console.error("Download error:", err);
      // Set error specific to this course without affecting the whole page
      setDownloadErrors(prev => ({ 
        ...prev, 
        [courseId]: err.message || 'Failed to download certificate. Please try again.' 
      }));
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading progress data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!progressData) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">No progress data found for this student.</p>
      </div>
    </div>
  );

  const filteredCourses = progressData.courses.filter(course => {
    if (filter === 'all') return true;
    return course.status.toLowerCase() === filter;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 ">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 ">
        <LeftNav />
      </div>

      {/* Main Section */}
      <div className="w-full md:w-3/4 p-4">
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
                const isDownloading = downloading === course.id;
                const courseError = downloadErrors[course.id];
                
                return (
                  <tr key={index} className="text-gray-900 border-t">
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.completed}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          {course.certificateAvailable ? (
                            <>
                              <button 
                                className={`hover:text-yellow-600 ${isDownloading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer text-blue-600'}`}
                                onClick={() => !isDownloading && handleDownloadCertificate(course.id, course.name)}
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
                        {/* {courseError && (
                          <div className="text-red-500 text-xs mt-1 max-w-xs">
                            {courseError}
                            <button 
                              onClick={() => setDownloadErrors(prev => ({ ...prev, [course.id]: null }))}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              Dismiss
                            </button>
                          </div>
                        )} */}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.status.toLowerCase() === 'completed' 
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
      </div>
    </div>
  );
};

export default RoboGeniusProgreeDetailPage;