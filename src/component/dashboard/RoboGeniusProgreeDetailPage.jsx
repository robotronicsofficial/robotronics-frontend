
import LeftNav from "./leftNav";
import { FaFilePdf } from "react-icons/fa6";

const RoboGeniusProgreeDetailPage = () => {
  const courses = [
    { name: "Course 1", completed: "24/24", status: "Completed" },
    { name: "Course 2", completed: "8/24", status: "Active" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Main Section */}
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Child Name</h1>

        {/* Course Progress Table */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-14">
          <h2 className="text-xl font-semibold mb-3">Course Progress</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-700 font-semibold ">
                <th className="p-3">Course</th>
                <th className="p-3">Class Completed</th>
                <th className="p-3">Certificate</th>
                <th className="p-3">Course Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className=" text-gray-900">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.completed}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button className="hover:text-yellow">download</button>
                    <FaFilePdf  className="text-yellow"/>
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
