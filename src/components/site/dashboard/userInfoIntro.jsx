import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import Intro from "../dashboard/intro";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import { useCurrentParent } from "@/hooks/useAccount";

const MASKED_PASSWORD = "••••••••";

const formatAccountDate = (dateString) => {
  if (!dateString) return "Unknown";

  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Unknown";
  }
};

const AccountDetailRow = ({ label, value }) => (
  <div>
    <p className="text-foreground poppins-bold">{label}</p>
    <p className="text-foreground poppins-regular">{value}</p>
    <div className="mt-4 w-full border border-border"></div>
  </div>
);

AccountDetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};

const AccountSummaryLine = ({ label, value }) => (
  <p className="text-foreground poppins-bold">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

AccountSummaryLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};

const DashboardNextStep = ({ userId }) => {
  const {
    data: parentData,
    isLoading,
    error,
    refetch,
  } = useCurrentParent(userId);
  const children = parentData?.children || [];
  const hasChildren = children.length > 0;

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-foreground">Checking subscription...</p>
          <p className="text-sm text-muted-foreground">Loading your child profiles and next step.</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        className="mb-8"
        title="Couldn't load subscription details"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Card className="mb-8">
      <CardContent className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {hasChildren ? "Continue learning" : "Set up learning access"}
          </p>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {hasChildren
              ? `${children.length} child profile${children.length === 1 ? "" : "s"} ready. Open Child Accounts to unlock a child session and continue courses.`
              : "Choose a subscription plan, add child profiles, then unlock the child's course dashboard."}
          </p>
        </div>
        <Button
          asChild
          className="h-auto rounded-lg bg-primary px-5 py-3 text-primary-foreground hover:bg-accent hover:text-background"
        >
          <Link to={hasChildren ? "/Dashboard/ChildProfile" : "/subscriptions"}>
            {hasChildren ? "Open Child Accounts" : "Choose Subscription"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

DashboardNextStep.propTypes = {
  userId: PropTypes.string,
};

const UserInfoIntro = () => {
  const { currentUser } = useAuth();
  const displayName = [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") || "Not provided";
  const displayEmail = currentUser?.email || "Not provided";
  const memberSince = formatAccountDate(currentUser?.createdAt);

  return (
    <div className="bg-background min-h-screen px-4 md:px-20">
      <Intro />
      <DashboardLayout
        className="bg-background min-h-0 flex flex-col md:flex-col lg:flex-row px-0"
        contentClassName="w-full px-6 py-6 md:px-10 p-0"
        navClassName="w-full lg:w-1/3"
        navProps={{ "data-aos": "fade-up" }}
      >
        <div data-aos="fade-up">
          <DashboardNextStep userId={currentUser?._id} />
          <div>
            <p className="mb-2 text-xl poppins-bold lg:text-2xl">My Info</p>
            <p className="text-base lg:text-xl poppins-light">Account Details</p>
          </div>

          <div className="mt-6 flex flex-col gap-6 text-muted-foreground">
            <AccountDetailRow label="Name" value={displayName} />
            <AccountDetailRow label="Email" value={displayEmail} />
            {currentUser?.phone && (
              <AccountDetailRow label="Phone Number" value={currentUser.phone} />
            )}
            <AccountDetailRow label="Password" value={MASKED_PASSWORD} />
            <AccountDetailRow label="Account Created" value={memberSince} />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-base lg:text-xl poppins-bold text-foreground">Account Summary</p>
          </div>

          <Card className="mt-4">
            <CardContent className="flex flex-col gap-4">
              <AccountSummaryLine label="Name" value={displayName} />
              <AccountSummaryLine label="Email" value={displayEmail} />
              {currentUser?.phone && (
                <AccountSummaryLine label="Phone" value={currentUser.phone} />
              )}
              <AccountSummaryLine label="Member Since" value={memberSince} />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default UserInfoIntro;
