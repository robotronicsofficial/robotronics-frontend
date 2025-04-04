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
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
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
                  <div className="flex flex-row space-x-5">
                    <button
                      onClick={() =>
                        navigate("/Dashboard/MyCoursesPage")
                      }
                      className="text-sm lg:text-base poppins-light border border-lin rounded-lg px-3 py-2 bg-yellow text-white"
                    >
                      View My Courses
                    </button>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <button
                      onClick={() => setIsPinModalOpen(true)}
                      className="text-sm lg:text-base poppins-light border border-lin rounded-lg px-3 py-2 bg-yellow text-white"
                    >
                      Create Login Pin
                    </button>
                  </div>
                </div>

                {/* <div className="flex flex-row space-x-5">
                    <a className="text-sm lg:text-base px-3 py-2 poppins-bold cursor-pointer">
                      Remove
                    </a>
                    <a className="text-sm lg:text-base px-3 py-2 poppins-bold cursor-pointer">
                      Edit
                    </a>
                  </div> */}
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
