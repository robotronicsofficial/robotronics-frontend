import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CenteredState from "../../components/layout/CenteredState";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserCircle } from "lucide-react";
import SuccessModal from "./popUps/SuccessModal";
import PinModal from "./popUps/PinModal";
import ChangePinModal from "./popUps/ChangePinModal";
import ErrorModal from "./popUps/ErrorModal";
import { useAuth } from "../../contexts/useAuth";
import {
  clearActiveChildSession,
  getChildSessionIdentifiers,
  setActiveChildSession,
} from "../../utils/childSessionRequest";
import { ensureArray, formatDisplayDate } from "../../lib/subscription";
import { fetchChildEnrollment } from "../../lib/account";
import {
  useChangeChildPinMutation,
  useChildAccessList,
  useCreateChildPinMutation,
  useParent,
  useVerifyChildPinMutation,
} from "../../hooks/useAccount";
import { queryKeys } from "../../lib/queryKeys";

const resolveChildAccess = (child, childAccessList) => (
  childAccessList.find((access) => (
    access.childId === child._id || access.childId === child.childCode
  )) || null
);

const mergeChildrenWithAccess = (parentChildren, childAccessList) =>
  parentChildren.map((child) => {
    const childAccess = resolveChildAccess(child, childAccessList);

    return {
      ...child,
      accessChildId: childAccess?.childId || child._id || child.childCode || "",
      hasPin: Boolean(childAccess?.hasPin),
    };
  });

const SubscriptionChildProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVerifyPinModalOpen, setIsVerifyPinModalOpen] = useState(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [pinError, setPinError] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const {
    data: parentData,
    isLoading: parentLoading,
    error: parentError,
  } = useParent(userId);
  const {
    data: childAccessList = [],
    isLoading: accessLoading,
    error: accessError,
  } = useChildAccessList(Boolean(userId));
  const changeChildPinMutation = useChangeChildPinMutation(userId);
  const createChildPinMutation = useCreateChildPinMutation(userId);
  const verifyChildPinMutation = useVerifyChildPinMutation();
  const children = mergeChildrenWithAccess(parentData?.children || [], childAccessList);
  const loading = Boolean(userId) && (parentLoading || accessLoading);
  const error = parentError?.message || accessError?.message || "";

  const handlePinSubmit = async (pinData) => {
    try {
      setPinError(null);
      
      if (pinData.error) {
        setPinError(pinData.error);
        setIsErrorModalOpen(true);
        return;
      }

      // For changing PIN
      const selectedChild = children.find((child) => child._id === selectedChildId);
      if (!selectedChild) {
        throw new Error("Child account not found");
      }

      const childAccessId = selectedChild?.accessChildId || selectedChildId;

      await changeChildPinMutation.mutateAsync({
        childId: childAccessId,
        oldPin: pinData.oldPin,
        newPin: pinData.newPin,
      });

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

      const childData = children.find((child) => child._id === selectedChildId);
      if (!childData) {
        throw new Error("Child account not found");
      }

      const childPlanId = childData.plan?.planId || childData.plan?.id;
      if (!childPlanId || !childData.plan?.billingCycle) {
        throw new Error("Child subscription plan is missing. Refresh the page and try again.");
      }

      await createChildPinMutation.mutateAsync({
        _id: childData._id,
        firstName: childData.firstName,
        lastName: childData.lastName,
        email: childData.email,
        phone: childData.phone,
        dateOfBirth: childData.dateOfBirth,
        country: childData.country,
        schoolName: childData.schoolName,
        streetAddress: childData.streetAddress,
        city: childData.city,
        postalCode: childData.postalCode,
        gender: childData.gender,
        plan: {
          planId: childPlanId,
          billingCycle: childData.plan.billingCycle,
        },
        pin: pinData,
        userId: currentUser._id,
      });

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
      const selectedChild = children.find((child) => child._id === selectedChildId);
      if (!selectedChild) {
        throw new Error("Child account not found");
      }

      const childAccessId = selectedChild?.accessChildId || selectedChildId;
      
      const data = await verifyChildPinMutation.mutateAsync({
        childId: childAccessId,
        pin: pinData,
      });

      if (
        data.message === 'Another session is active. Please try again later.' ||
        data.message === 'Account is already active on another device'
      ) {
        setPinError("Another child is currently using this account. Please try again later.");
        setIsErrorModalOpen(true);
        return;
      }

      setIsVerifyPinModalOpen(false);
      
      // Store session ID locally so ProtectedChild can validate the same child session.
      if (data.sessionId) {
        clearActiveChildSession();
        setActiveChildSession({
          childId: childAccessId,
          childIds: getChildSessionIdentifiers(selectedChild),
          sessionId: data.sessionId,
        });
      }

      // Fetch child's courses data
      const coursesData = await queryClient.fetchQuery({
        queryKey: queryKeys.childCourses.active(childAccessId),
        queryFn: () => fetchChildEnrollment(childAccessId),
      });
      const selectedCourses = ensureArray(coursesData?.courses);
      
      // Navigate based on whether courses exist
      if (selectedCourses.length > 0) {
        navigate(`/Dashboard/myAllCourses/${childAccessId}`);
      } else {
        navigate(`/Dashboard/MyCoursesPage/${childAccessId}`);
      }
    } catch (err) {
      console.error('Error verifying PIN:', err);
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleViewCourses = async (childId) => {
    setSelectedChildId(childId);
    const child = children.find((currentChild) => currentChild._id === childId);
    
    if (!child?.hasPin) return;
    
    setIsVerifyPinModalOpen(true);
  };


  const openPinModal = (childId, hasPin) => {
    setSelectedChildId(childId);
    
    if (hasPin) {
      setIsChangePinModalOpen(true);
    } else {
      setIsPinModalOpen(true);
    }
  };

  if (loading) {
    return <CenteredState className="bg-muted min-h-screen">Loading...</CenteredState>;
  }

  if (error) {
    return <CenteredState className="bg-muted min-h-screen">Error: {error}</CenteredState>;
  }

  return (
    <DashboardLayout contentClassName="px-6">
        <h1 className="text-2xl font-bold mb-4 md:text-3xl pl-4">Child Accounts</h1>

        <div className="flex flex-wrap p-2 lg:p-5">
          {children.length > 0 ? (
            children.map((child) => {
              const hasPin = child.hasPin;
              return (
                <div key={child._id} className="w-full p-2 md:w-1/2 md:p-3">
                  <div className="flex flex-col gap-y-5 bg-card rounded-xl p-5 shadow-lg w-full md:max-w-sm min-w-[280px]">
                    <div className="flex flex-col gap-y-6 md:gap-y-8">
                      <div className="flex items-center gap-4 md:gap-6">
                        <UserCircle className="text-3xl md:text-4xl" />
                        <p className="text-foreground poppins-bold text-xl md:text-2xl">
                          {child.firstName} {child.lastName}
                        </p>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="text-foreground poppins-bold text-sm md:text-base">
                          <span className="font-semibold">Email:</span> {child.email}
                        </p>
                        {child.dateOfBirth && (
                          <p className="text-foreground poppins-bold text-sm md:text-base">
                            <span className="font-semibold">Date of Birth:</span> {formatDisplayDate(child.dateOfBirth)}
                          </p>
                        )}
                        <p className="text-foreground poppins-bold text-sm md:text-base">
                          <span className="font-semibold">Phone:</span> {child.phone}
                        </p>
                        <p className="text-foreground poppins-bold text-sm md:text-base">
                          <span className="font-semibold">School:</span> {child.schoolName}
                        </p>
                        <p className="text-foreground poppins-bold text-sm md:text-base text-wrap">
                          <span className="font-semibold">Address:</span> {child.streetAddress}, {child.city}, {child.postalCode}
                        </p>
                      </div>

                      <div className="flex flex-col gap-y-3 sm:flex-row sm:gap-y-0 sm:gap-x-3 md:gap-x-5">
                        <button
                          onClick={() => handleViewCourses(child._id)}
                          className={`text-xs sm:text-sm poppins-light border border-border rounded-lg px-2 py-1 sm:px-3 sm:py-2 ${
                            hasPin ? 'bg-primary text-background cursor-pointer' : 'bg-muted text-muted-foreground cursor-not-allowed'
                          } md:text-base`}
                          disabled={!hasPin}
                        >
                          View My Courses
                        </button>
                        <button
                          onClick={() => openPinModal(child._id, hasPin)}
                          className="text-xs sm:text-sm poppins-light border border-border rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-primary text-background md:text-base"
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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onPinSubmit={handleCreatePinSubmit}
        mode="create"
      />

      <PinModal
        isOpen={isVerifyPinModalOpen}
        onClose={() => setIsVerifyPinModalOpen(false)}
        onPinSubmit={handleVerifyPinSubmit}
        mode="verify"
        title="Enter Your PIN"
        description="Please enter your 4-digit PIN to view courses"
      />

      <ChangePinModal
        isOpen={isChangePinModalOpen}
        onClose={() => setIsChangePinModalOpen(false)}
        onPinSubmit={handlePinSubmit}
        error={pinError}
        onClearError={() => setPinError(null)}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errorMessage={pinError}
      />
    </DashboardLayout>
  );
};

export default SubscriptionChildProfile;
