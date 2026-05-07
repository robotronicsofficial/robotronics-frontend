import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Mail, Phone, School, MapPin, Cake, UserCircle } from "lucide-react";

import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SuccessModal from "./popUps/SuccessModal";
import PinModal from "./popUps/PinModal";
import ChangePinModal from "./popUps/ChangePinModal";
import ErrorModal from "./popUps/ErrorModal";
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
import { Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { ensureArray, formatDisplayDate } from "@/lib/subscription";
import { fetchChildEnrollment } from "@/lib/account";
import { queryKeys } from "@/lib/queryKeys";
import {
  useChangeChildPinMutation,
  useChildAccounts,
  useCreateChildPinMutation,
  useVerifyChildPinMutation,
} from "@/hooks/useAccount";
import {
  clearActiveChildSession,
  getChildSessionIdentifiers,
  setActiveChildSession,
} from "@/utils/childSessionRequest";

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5 text-body-sm">
    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    <div className="flex min-w-0 flex-col">
      <span className="text-caption uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="break-words text-foreground">{value}</span>
    </div>
  </div>
);

const EmptyStateCard = ({ title, description, ctaLabel, onCta }) => (
  <Card className="max-w-2xl">
    <CardContent className="flex flex-col items-start gap-5">
      <div className="flex flex-col gap-2">
        <Heading level={3} className="text-h4">
          {title}
        </Heading>
        <Text size="sm" tone="muted">
          {description}
        </Text>
      </div>
      <Button type="button" size="marketing" onClick={onCta}>
        {ctaLabel}
      </Button>
    </CardContent>
  </Card>
);

const ChildCard = ({ child, onViewCourses, onPinAction }) => {
  const fullName = [child.firstName, child.lastName].filter(Boolean).join(" ") || "Child";
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"
          >
            <UserCircle className="size-6" />
          </span>
          <div className="flex flex-col">
            <Heading level={3} className="text-h5">
              {fullName}
            </Heading>
            {child.schoolName && (
              <Text size="xs" tone="subtle">
                {child.schoolName}
              </Text>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailRow icon={Mail} label="Email" value={child.email || "—"} />
          {child.dateOfBirth && (
            <DetailRow icon={Cake} label="Date of birth" value={formatDisplayDate(child.dateOfBirth)} />
          )}
          {child.phone && <DetailRow icon={Phone} label="Phone" value={child.phone} />}
          {child.schoolName && (
            <DetailRow icon={School} label="School" value={child.schoolName} />
          )}
          {(child.streetAddress || child.city) && (
            <DetailRow
              icon={MapPin}
              label="Address"
              value={[child.streetAddress, child.city, child.postalCode]
                .filter(Boolean)
                .join(", ")}
            />
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            onClick={() => onViewCourses(child._id)}
            disabled={!child.hasPin}
            className="flex-1"
          >
            View courses
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onPinAction(child._id, child.hasPin)}
            className="flex-1"
          >
            {child.hasPin ? "Change PIN" : "Create login PIN"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

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
    data: childAccountsData,
    isLoading: childAccountsLoading,
    error: childAccountsError,
  } = useChildAccounts(userId);
  const changeChildPinMutation = useChangeChildPinMutation(userId);
  const createChildPinMutation = useCreateChildPinMutation(userId);
  const verifyChildPinMutation = useVerifyChildPinMutation();
  const parentData = childAccountsData?.parent || null;
  const children = childAccountsData?.children || [];
  const loading = Boolean(userId) && childAccountsLoading;
  const error = childAccountsError?.message || "";

  const handlePinSubmit = async (pinData) => {
    try {
      setPinError(null);
      if (pinData.error) {
        setPinError(pinData.error);
        setIsErrorModalOpen(true);
        return;
      }
      const selectedChild = children.find((child) => child._id === selectedChildId);
      if (!selectedChild) throw new Error("Child account not found");
      const childAccessId = selectedChild?.accessChildId || selectedChildId;
      await changeChildPinMutation.mutateAsync({
        childId: childAccessId,
        oldPin: pinData.oldPin,
        newPin: pinData.newPin,
      });
      setIsChangePinModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (err) {
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
      if (!childData) throw new Error("Child account not found");
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
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleVerifyPinSubmit = async (pinData) => {
    try {
      setPinError(null);
      const selectedChild = children.find((child) => child._id === selectedChildId);
      if (!selectedChild) throw new Error("Child account not found");
      const childAccessId = selectedChild?.accessChildId || selectedChildId;
      const data = await verifyChildPinMutation.mutateAsync({
        childId: childAccessId,
        pin: pinData,
      });
      if (
        data.message === "Another session is active. Please try again later." ||
        data.message === "Account is already active on another device"
      ) {
        setPinError("Another child is currently using this account. Please try again later.");
        setIsErrorModalOpen(true);
        return;
      }
      setIsVerifyPinModalOpen(false);
      if (data.sessionId) {
        clearActiveChildSession();
        setActiveChildSession({
          childId: childAccessId,
          childIds: getChildSessionIdentifiers(selectedChild),
          sessionId: data.sessionId,
        });
      }
      const coursesData = await queryClient.fetchQuery({
        queryKey: queryKeys.childCourses.enrollment(childAccessId),
        queryFn: () => fetchChildEnrollment(childAccessId),
      });
      const selectedCourses = ensureArray(coursesData?.courses);
      navigate({
        to: selectedCourses.length > 0 ? "/Dashboard/myAllCourses" : "/Dashboard/MyCoursesPage",
      });
    } catch (err) {
      setPinError(err.message);
      setIsErrorModalOpen(true);
    }
  };

  const handleViewCourses = (childId) => {
    setSelectedChildId(childId);
    const child = children.find((c) => c._id === childId);
    if (!child?.hasPin) return;
    setIsVerifyPinModalOpen(true);
  };

  const openPinModal = (childId, hasPin) => {
    setSelectedChildId(childId);
    if (hasPin) setIsReplacePinConfirmOpen(true);
    else setIsPinModalOpen(true);
  };

  const handleConfirmReplacePin = () => {
    setIsReplacePinConfirmOpen(false);
    setIsChangePinModalOpen(true);
  };

  if (loading) {
    return <CenteredState className="bg-background min-h-screen">Loading…</CenteredState>;
  }

  if (error) {
    return (
      <CenteredState className="min-h-screen bg-background px-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </CenteredState>
    );
  }

  return (
    <DashboardLayout contentClassName="px-6">
      {!parentData ? (
        <EmptyStateCard
          title="Set up child accounts"
          description="This login doesn't have a parent subscription profile yet. Choose a subscription and add child details to create child accounts."
          ctaLabel="Choose subscription"
          onCta={() => navigate({ to: "/subscriptions" })}
        />
      ) : children.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {children.map((child) => (
            <ChildCard
              key={child._id}
              child={child}
              onViewCourses={handleViewCourses}
              onPinAction={openPinModal}
            />
          ))}
        </div>
      ) : (
        <EmptyStateCard
          title="No child accounts yet"
          description="Your parent profile is ready, but no children are registered on it yet. Add a child through the subscription flow to start learning access."
          ctaLabel="Add child account"
          onCta={() => navigate({ to: "/subscriptions" })}
        />
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
        title="Enter your PIN"
        description="Please enter your 4-digit PIN to view courses."
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

      <Dialog open={isReplacePinConfirmOpen} onOpenChange={setIsReplacePinConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace existing PIN?</DialogTitle>
            <DialogDescription>
              This child already has a PIN. Setting a new one will replace the existing PIN. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsReplacePinConfirmOpen(false)}>
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
