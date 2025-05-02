import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftNav from "./leftNav";
import { FaUserCircle } from "react-icons/fa";
import SuccessModal from "./popUps/SuccessModal";
import Modal from "react-modal";
import PinModal from "./popUps/PinModal";
import ChangePinModal from "./popUps/ChangePinModal";
import ErrorModal from "./popUps/ErrorModal";
import { useAuth } from "../../contexts/AuthContext";

const RoboGeniusChildProfile = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVerifyPinModalOpen, setIsVerifyPinModalOpen] = useState(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [childCourses, setChildCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pinError, setPinError] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedChildHasPin, setSelectedChildHasPin] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?._id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          const parentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/parents/${currentUser._id}`);
          if (!parentResponse.ok) {
            throw new Error("Failed to fetch parent data");
          }
          const parentData = await parentResponse.json();

          const childCoursesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getAllChild`);
          if (!childCoursesResponse.ok) {
            throw new Error("Failed to fetch child courses");
          }
          const childCoursesData = await childCoursesResponse.json();
          setChildCourses(childCoursesData.childCourse || []);
     
          const mergedChildren = parentData.children.map(child => {
            const childCourse = childCoursesData.childCourse.find(
              cc => cc.childId === child._id
            );
            
            return {
              ...child,
              pin: childCourse?.pin || null,
              hasPin: !!childCourse?.pin,
              courses: childCourse?.courses || []
            };
          });
          
          setChildren(mergedChildren);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const refreshChildData = async () => {
    try {
      const parentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/parents/${currentUser._id}`);
      const parentData = await parentResponse.json();
      
      const childCoursesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getAllChild`);
      const childCoursesData = await childCoursesResponse.json();
      setChildCourses(childCoursesData.childCourse || []);
      
      const mergedChildren = parentData.children.map(child => {
        const childCourse = childCoursesData.childCourse.find(
          cc => cc.childId === child._id
        );
        
        return {
          ...child,
          pin: childCourse?.pin || null,
          hasPin: !!childCourse?.pin,
          courses: childCourse?.courses || []
        };
      });
      
      setChildren(mergedChildren);
    } catch (err) {
      console.error('Error refreshing child data:', err);
      setError(err.message);
    }
  };

  const verifyPin = async (childId, pin) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verifyChildPin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          childId,
          pin
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify PIN");
      }

      const data = await response.json();
      return data.isValid;
    } catch (err) {
      console.error('Error verifying PIN:', err);
      setError(err.message);
      return false;
    }
  };

  const handlePinSubmit = async (pinData) => {
    try {
      setPinError(null);
      
      if (pinData.error) {
        setPinError(pinData.error);
        setIsErrorModalOpen(true);
        return;
      }

      // For changing PIN
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/children/${selectedChildId}/pin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPin: pinData.oldPin,
          newPin: pinData.newPin
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change PIN');
      }

      const data = await response.json();
      console.log('PIN changed successfully:', data);
      
      await refreshChildData();
      
      setIsChangePinModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('Error changing PIN:', err);
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleCreatePinSubmit = async (pinData) => {
    try {
      setPinError(null);
      
      if (pinData.error) {
        setPinError(pinData.error);
        setIsErrorModalOpen(true);
        return;
      }

      const childData = children.find(child => child._id === selectedChildId) || {};
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/AddChildData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...childData,
          pin: pinData,
          userId: currentUser._id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create PIN');
      }

      const data = await response.json();
      console.log('PIN created successfully:', data);
      
      await refreshChildData();
      
      setIsPinModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('Error creating PIN:', err);
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleVerifyPinSubmit = async (pinData) => {
    try {
      setPinError(null);
      
      const isValid = await verifyPin(selectedChildId, pinData);
      if (isValid) {
        setIsVerifyPinModalOpen(false);
        navigate(`/Dashboard/MyCoursesPage/${selectedChildId}`);
      } else {
        setPinError("Incorrect PIN. Please try again.");
        setIsErrorModalOpen(true);
      }
    } catch (err) {
      console.error('Error verifying PIN:', err);
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleViewCourses = (childId) => {
    setSelectedChildId(childId);
    const child = children.find(c => c._id === childId);
    if (!child?.hasPin) return;
    
    setIsVerifyPinModalOpen(true);
  };

  const openPinModal = (childId, hasPin) => {
    setSelectedChildId(childId);
    setSelectedChildHasPin(hasPin);
    
    if (hasPin) {
      setIsChangePinModalOpen(true);
    } else {
      setIsPinModalOpen(true);
    }
  };

  if (loading) {
    return <div className="bg-gray-100 min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-gray-100 min-h-screen flex justify-center items-center">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Child Accounts Section */}
      <div className="w-full p-4 md:w-3/4 px-6">
        <h1 className="text-2xl font-bold mb-4 md:text-3xl pl-4">Child Accounts</h1>

        <div className="flex flex-wrap p-2 lg:p-5">
          {children.length > 0 ? (
            children.map((child) => {
              const hasPin = child.hasPin;
              return (
                <div key={child._id} className="w-full p-2 md:w-1/2 md:p-3">
                  <div className="flex flex-col space-y-5 bg-white rounded-xl p-5 shadow-lg w-full md:w-[25vw] min-w-[280px]">
                    <div className="space-y-6 md:space-y-8">
                      <div className="flex items-center gap-4 md:gap-6">
                        <FaUserCircle className="text-3xl md:text-4xl" />
                        <p className="text-lightblack poppins-bold text-xl md:text-2xl">
                          {child.firstName} {child.lastName}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lightblack poppins-bold text-sm md:text-base">
                          <span className="font-semibold">Email:</span> {child.email}
                        </p>
                        {child.dateOfBirth && (
                          <p className="text-lightblack poppins-bold text-sm md:text-base">
                            <span className="font-semibold">Date of Birth:</span> {new Date(child.dateOfBirth).toLocaleDateString()}
                          </p>
                        )}
                        <p className="text-lightblack poppins-bold text-sm md:text-base">
                          <span className="font-semibold">Phone:</span> {child.phone}
                        </p>
                        <p className="text-lightblack poppins-bold text-sm md:text-base">
                          <span className="font-semibold">School:</span> {child.schoolName}
                        </p>
                        <p className="text-lightblack poppins-bold text-sm md:text-base text-wrap">
                          <span className="font-semibold">Address:</span> {child.streetAddress}, {child.city}, {child.postalCode}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 md:space-x-5">
                        <button
                          onClick={() => handleViewCourses(child._id)}
                          className={`text-xs sm:text-sm poppins-light border border-lin rounded-lg px-2 py-1 sm:px-3 sm:py-2 ${
                            hasPin ? 'bg-yellow text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          } md:text-base`}
                          disabled={!hasPin}
                        >
                          View My Courses
                        </button>
                        <button
                          onClick={() => openPinModal(child._id, hasPin)}
                          className="text-xs sm:text-sm poppins-light border border-lin rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-yellow text-white md:text-base"
                        >
                          {hasPin ? 'Change PIN' : 'Create Login Pin'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full p-4 text-center">
              <p className="text-lg">No child accounts found</p>
            </div>
          )}
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

      {/* Pin Modal (for create) */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onPinSubmit={handleCreatePinSubmit}
        mode="create"
      />

      {/* Pin Modal (for verify) */}
      <PinModal
        isOpen={isVerifyPinModalOpen}
        onClose={() => setIsVerifyPinModalOpen(false)}
        onPinSubmit={handleVerifyPinSubmit}
        mode="verify"
        title="Enter Your PIN"
        description="Please enter your 4-digit PIN to view courses"
      />

      {/* Change Pin Modal */}
      <ChangePinModal
        isOpen={isChangePinModalOpen}
        onClose={() => setIsChangePinModalOpen(false)}
        onPinSubmit={handlePinSubmit}
        error={pinError}
        onClearError={() => setPinError(null)}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errorMessage={pinError}
      />
    </div>
  );
};

export default RoboGeniusChildProfile;