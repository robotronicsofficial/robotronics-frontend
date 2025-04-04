import { useNavigate } from "react-router-dom"; // Import useNavigate
import LeftNav from "./leftNav";
import { FaUserCircle } from "react-icons/fa";

const RoboGeniusProgressCertificate = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Main Section */}
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Child Accounts</h1>

        <div className="flex flex-wrap lg:p-5">
          <div className="w-full md:w-1/2 p-3">
            <div className="flex flex-col space-y-5 bg-white rounded-xl p-5 shadow-lg w-[25vw]">
              <div className="space-y-8">
                {/* Display user data dynamically from the fetched 'user' object */}
                <div className="flex items-center gap-6">
                  <FaUserCircle className="text-4xl" />
                  <p className="text-lightblack poppins-bold text-2xl">
                    Arslan Mumtaz
                  </p>
                </div>
                <p className="text-lightblack poppins-bold">
                  amsdbakjs akjsdnakj unasjkdnak
                </p>
                <p className="text-lightblack poppins-bold">032462866</p>

                <div className="flex flex-row space-x-5">
                  <button
                    className="text-sm lg:text-base poppins-light border border-lin rounded-lg px-3 py-2 bg-yellow text-white"
                    onClick={() =>
                      navigate("/Dashboard/ProgressCertificate/ProgressPage")
                    }
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
