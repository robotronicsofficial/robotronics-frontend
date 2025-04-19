// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import LeftNav from "./leftNav";
import { FaUserCircle } from "react-icons/fa";
import SuccessModal from "./popUps/SuccessModal";
import Modal from "react-modal";
import PinModal from "./popUps/PinModal";

const RoboGeniusChildProfile = () => {
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const handlePinSubmit = (pin) => {
    // Handle the PIN submission logic here
    console.log("Submitted PIN:", pin);
    setIsPinModalOpen(false); // Close the modal after submission
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
      <div className="w-full p-4 md:w-3/4 px-6">
  <h1 className="text-2xl font-bold mb-4 md:text-3xl">Child Accounts</h1>

  <div className="flex flex-wrap p-2 lg:p-5">
    <div className="w-full p-2 md:w-1/2 md:p-3">
      <div className="flex flex-col space-y-5 bg-white rounded-xl p-5 shadow-lg w-full md:w-[25vw] min-w-[280px]">
        <div className="space-y-6 md:space-y-8">
          {/* Display user data dynamically from the fetched 'user' object */}
          <div className="flex items-center gap-4 md:gap-6">
            <FaUserCircle className="text-3xl md:text-4xl" />
            <p className="text-lightblack poppins-bold text-xl md:text-2xl">
              Arslan Mumtaz
            </p>
          </div>
          <p className="text-lightblack poppins-bold text-sm md:text-base">
            amsdbakjs akjsdnakj unasjkdnak
          </p>
          <p className="text-lightblack poppins-bold text-sm md:text-base">
            032462866
          </p>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 md:space-x-5">
            <button
              onClick={() => navigate("/Dashboard/MyCoursesPage")}
              className="text-xs sm:text-sm poppins-light border border-lin rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-yellow text-white md:text-base"
            >
              View My Courses
            </button>
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="text-xs sm:text-sm poppins-light border border-lin rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-yellow text-white md:text-base"
            >
              Create Login Pin
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        contentLabel="Success Modal"
        className="bg-white rounded-lg p-8 max-w-lg mx-auto my-20 relative"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />
      </Modal>

      {/* Pin Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onPinSubmit={handlePinSubmit}
      />
    </div>
  );
};

export default RoboGeniusChildProfile;
