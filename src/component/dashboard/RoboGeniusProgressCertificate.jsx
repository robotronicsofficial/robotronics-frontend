import { useNavigate } from "react-router-dom"; // Import useNavigate
import LeftNav from "./leftNav";
import { FaUserCircle } from "react-icons/fa";

const RoboGeniusProgressCertificate = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Main Section */}
      <div className="w-full p-4 md:w-3/4">
  <h1 className="text-2xl md:text-3xl font-bold mb-4">Child Accounts</h1>

  <div className="flex flex-wrap p-1 sm:p-3 lg:p-5">
    <div className="w-full p-2 sm:w-1/2 md:p-3">
      <div className="flex flex-col space-y-4 sm:space-y-5 bg-white rounded-xl p-4 sm:p-5 shadow-lg w-full min-w-[280px] md:w-[27vw] max-w-[400px]">
        <div className="space-y-6 sm:space-y-8">
          {/* User Info Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <FaUserCircle className="text-3xl sm:text-4xl text-gray-600" />
            <p className="text-lightblack poppins-bold text-xl sm:text-2xl">
              Arslan Mumtaz
            </p>
          </div>
          
          <p className="text-lightblack poppins-bold text-sm sm:text-base">
            amsdbakjs akjsdnakj unasjkdnak
          </p>
          
          <p className="text-lightblack poppins-bold text-sm sm:text-base">
            032462866
          </p>

          {/* Button Section */}
          <div className="flex flex-row">
            <button
              className="w-full sm:w-auto text-sm sm:text-base poppins-light border border-lin rounded-lg px-3 py-2 bg-yellow text-white hover:bg-yellow-600 transition-colors"
              onClick={() => navigate("/Dashboard/ProgressCertificate/ProgressPage")}
            >
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default RoboGeniusProgressCertificate;
