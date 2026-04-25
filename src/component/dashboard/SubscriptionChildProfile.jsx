import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
  useCurrentParent,
  useVerifyChildPinMutation,
} from "../../hooks/useAccount";
import { queryKeys } from "../../lib/queryKeys";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isReplacePinConfirmOpen, setIsReplacePinConfirmOpen] = useState(false);
  const [pinError, setPinError] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const {
    data: parentData,
    isLoading: parentLoading,
    error: parentError,
  } = useCurrentParent(userId);
  const hasParentProfile = Boolean(parentData?._id);
  const {
    data: childAccessList = [],
    isLoading: accessLoading,
    error: accessError,
  } = useChildAccessList(hasParentProfile);
  const changeChildPinMutation = useChangeChildPinMutation(userId);
  const createChildPinMutation = useCreateChildPinMutation(userId);
  const verifyChildPinMutation = useVerifyChildPinMutation();
  const children = mergeChildrenWithAccess(parentData?.children || [], childAccessList);
  const loading = Boolean(userId) && (parentLoading || (hasParentProfile && accessLoading));
  const error = parentError?.message || (hasParentProfile ? accessError?.message : "") || "";

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
      
      // Store the session before routing so the child-session guard can validate it.
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
        navigate({ to: "/Dashboard/myAllCourses" });
      } else {
        navigate({ to: "/Dashboard/MyCoursesPage" });
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
      // Child already has a PIN — confirm before replacing via the create flow.
      setIsReplacePinConfirmOpen(true);
    } else {
      setIsPinModalOpen(true);
    }
  };

  const handleConfirmReplacePin = () => {
    setIsReplacePinConfirmOpen(false);
    setIsChangePinModalOpen(true);
  };

  if (loading) {
    return <CenteredState className="bg-muted min-h-screen">Loading...</CenteredState>;
  }

  if (error) {
    return (
      <CenteredState className="min-h-screen bg-muted px-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </CenteredState>
    );
  }

  return (
    <DashboardLayout contentClassName="px-6">
        <h1 className="pl-4 mb-4 text-2xl font-bold md:text-3xl">Child Accounts</h1>

        {children.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:p-5">
            {children.map((child) => {
              const hasPin = child.hasPin;
              return (
                <Card key={child._id} className="h-full">
                  <CardContent className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <UserCircle className="size-10" />
                      <p className="text-foreground poppins-bold text-xl md:text-2xl">
                        {child.firstName} {child.lastName}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        onClick={() => handleViewCourses(child._id)}
                        className={`h-auto rounded-lg border border-border px-3 py-2 text-sm md:text-base ${
                          hasPin ? 'bg-primary text-background cursor-pointer' : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                        disabled={!hasPin}
                      >
                        View My Courses
                      </Button>
                      <Button
                        type="button"
                        onClick={() => openPinModal(child._id, hasPin)}
                        className="h-auto rounded-lg border border-border bg-primary px-3 py-2 text-sm text-background md:text-base"
                      >
                        {hasPin ? 'Change PIN' : 'Create Login Pin'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="w-full p-4 text-center">
            <p className="text-lg">No child accounts found</p>
          </div>
        )}

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

      <Dialog
        open={isReplacePinConfirmOpen}
        onOpenChange={setIsReplacePinConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace existing PIN?</DialogTitle>
            <DialogDescription>
              This child already has a PIN. Setting a new one will replace the
              existing PIN. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsReplacePinConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirmReplacePin}>
              Replace PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SubscriptionChildProfile;
