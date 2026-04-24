import PropTypes from "prop-types";
import Intro from "../dashboard/intro";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../../contexts/useAuth";

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
        headerOffsetVariant="dashboardWide"
        navClassName="w-full lg:w-1/3"
        navProps={{ "data-aos": "fade-up" }}
      >
        <div data-aos="fade-up">
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
