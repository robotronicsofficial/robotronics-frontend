import { useEffect } from "react";
import LeftNav from "./leftNav";
import Intro from "../dashboard/intro";
import { useAuth } from "../../contexts/AuthContext";

const UserInfoIntro = () => {
  const { currentUser } = useAuth();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Unknown";
    }
  };

  // Mask password for display
  const maskPassword = () => {
    return "••••••••";
  };

  return (
    <div className="bg-background min-h-screen px-4 md:px-20">
      <Intro />
      <div className="flex flex-col lg:flex-row pt-40 md:pt-4" data-aos="fade-up" data-aos-duration="2000">
        <div className="w-full lg:w-1/3">
          <LeftNav />
        </div>

        <div className="w-full px-6 py-6 md:px-10">
          <div>
            <p className="text-xl lg:text-2xl poppins-bold mb-2">My Info</p>
            <p className="text-base lg:text-xl poppins-light">Account Details</p>
          </div>

          <div className="mt-6 text-gray-600">
            <div className="mb-6">
              <p className="text-lightblack poppins-bold">Name</p>
              <p className="text-lightblack poppins-regular">
                {currentUser?.firstName || 'Not provided'} {currentUser?.lastName || ''}
              </p>
              <div className="w-full border border-lin mt-4"></div>
            </div>

            <div className="mb-6">
              <p className="text-lightblack poppins-bold">Email</p>
              <p className="text-lightblack poppins-regular">
                {currentUser?.email || 'Not provided'} 
                {/* {currentUser?.isVerified ? " (Verified)" : " (Not Verified)"} */}
              </p>
              <div className="w-full border border-lin mt-4"></div>
            </div>

            {currentUser?.phone && (
              <div className="mb-6">
                <p className="text-lightblack poppins-bold">Phone Number</p>
                <p className="text-lightblack poppins-regular">
                  {currentUser.phone}
                </p>
                <div className="w-full border border-lin mt-4"></div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-lightblack poppins-bold">Password</p>
              <p className="text-lightblack poppins-regular">
                {maskPassword()}
              </p>
              <div className="w-full border border-lin mt-4"></div>
            </div>

            <div className="mb-6">
              <p className="text-lightblack poppins-bold">Account Created</p>
              <p className="text-lightblack poppins-regular">
                {formatDate(currentUser?.createdAt)}
              </p>
              <div className="w-full border border-lin mt-4"></div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-base lg:text-xl poppins-bold text-brown">Account Summary</p>
          </div>

          <div className="flex flex-wrap p-2 lg:p-5">
            <div className="w-full p-3">
              <div className="flex flex-col space-y-4 bg-white rounded-xl p-5 shadow-lg w-full">
                <p className="text-lightblack poppins-bold">
                  <span className="font-semibold">Name:</span> {currentUser?.firstName || 'Not provided'} {currentUser?.lastName || ''}
                </p>
                <p className="text-lightblack poppins-bold">
                  <span className="font-semibold">Email:</span> {currentUser?.email || 'Not provided'}
                </p>
                {currentUser?.phone && (
                  <p className="text-lightblack poppins-bold">
                    <span className="font-semibold">Phone:</span> {currentUser.phone}
                  </p>
                )}
                {/* <p className="text-lightblack poppins-bold">
                  <span className="font-semibold">Status:</span> {currentUser?.isVerified ? "Verified" : "Not Verified"}
                </p> */}
                <p className="text-lightblack poppins-bold">
                  <span className="font-semibold">Member Since:</span> {formatDate(currentUser?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoIntro;