import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftNav from "./leftNav";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/useAuth";
import { fetchSessionJson } from "../../lib/api";
import { formatDisplayDate, normalizeParentRecord } from "../../lib/robogenius";
import {
  getActiveChildId,
  matchesChildSessionIdentifier,
  resolveChildSessionIdentifier,
} from "../../utils/childSessionRequest";

const RoboGeniusProgressCertificate = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const activeChildId = getActiveChildId();

  useEffect(() => {
    const fetchParentData = async () => {
      if (!userId) {
        return;
      }

      try {
        const data = normalizeParentRecord(
          await fetchSessionJson(`/api/parents/${userId}`)
        );
        setChildren(data.children);
      } catch (error) {
        console.error("Error fetching parent data:", error);
        setChildren([]);
      }
    };

    fetchParentData();
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      <div className="w-full p-4 md:w-3/4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Child Accounts</h1>

        <div className="flex flex-wrap p-1 sm:p-3 lg:p-5">
          {children.length > 0 ? (
            children.map((child, index) => {
              const isUnlockedChild = matchesChildSessionIdentifier(child, activeChildId);
              const childRouteId = resolveChildSessionIdentifier(child, activeChildId);

              return (
                <div
                  key={index}
                  className="w-full p-2 sm:w-1/2 md:p-3"
                >
                  <div className="flex flex-col space-y-3 bg-white rounded-xl p-5 shadow-lg w-full min-w-[280px] md:w-[27vw] max-w-[450px]">
                    <div className="flex items-center gap-4 mb-3">
                      <FaUserCircle className="text-4xl text-gray-600" />
                      <p className="text-xl font-semibold text-gray-800">
                        {child.firstName} {child.lastName}
                      </p>
                    </div>

                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>Email:</strong> {child.email}</p>
                      <p><strong>Phone:</strong> {child.phone}</p>
                      <p><strong>DOB:</strong> {formatDisplayDate(child.dateOfBirth)}</p>
                      <p><strong>Country:</strong> {child.country}</p>
                      <p><strong>School:</strong> {child.schoolName}</p>
                      <p><strong>Street Address:</strong> {child.streetAddress}</p>
                      <p><strong>City:</strong> {child.city}</p>
                      <p><strong>Postal Code:</strong> {child.postalCode}</p>
                    </div>

                    <button
                      className="mt-3 w-full text-sm poppins-light border border-lin rounded-lg px-3 py-2 bg-yellow text-white hover:bg-yellow-600 transition-colors"
                      onClick={() => {
                        if (!isUnlockedChild || !childRouteId) {
                          navigate("/Dashboard/ChildProfile");
                          return;
                        }

                        navigate(
                          `/Dashboard/ProgressCertificate/ProgressPage?childId=${childRouteId}`
                        );
                      }}
                    >
                      {isUnlockedChild ? "View Progress" : "Unlock in Child Accounts"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No children found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoboGeniusProgressCertificate;
