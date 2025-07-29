import LeftNav from "./leftNav";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RoboGeniusProgreeDetailPage = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // ✅ Filter state
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [childId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!progressData) return <div>No data found</div>;

  // ✅ Filter logic
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

        {/* ✅ Filter Buttons */}
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
                <th className="p-3">Module Completed</th>
                <th className="p-3">Certificate</th>
                <th className="p-3">Course Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={index} className="text-gray-900 border-t">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.completed}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="hover:text-yellow">download</button>
                      <FaFilePdf className="text-yellow" />
                    </div>
                  </td>
                  <td className="p-3">{course.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoboGeniusProgreeDetailPage;
