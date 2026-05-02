import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { Calendar, KeyRound, Mail, Phone, User } from "lucide-react";

import Intro from "../dashboard/intro";
import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
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

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 border-b border-border py-4 first:border-t last:border-b-0">
    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="text-caption uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="break-words text-body text-foreground">{value}</span>
    </div>
  </div>
);

InfoRow.propTypes = {
  icon: PropTypes.elementType.isRequired,
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
      <Card className="mb-6">
        <CardContent>
          <Text size="sm" tone="muted">
            Checking subscription…
          </Text>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        className="mb-6"
        title="Couldn't load subscription details"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Card tone="tinted" className="mb-6">
      <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <Heading level={3} className="text-h5">
            {hasChildren ? "Continue learning" : "Set up learning access"}
          </Heading>
          <Text size="sm" tone="muted" className="max-w-xl">
            {hasChildren
              ? `${children.length} child profile${children.length === 1 ? "" : "s"} ready. Open Child Accounts to unlock a child session and continue courses.`
              : "Choose a subscription plan, add child profiles, then unlock your child's course dashboard."}
          </Text>
        </div>
        <Button asChild size="marketing">
          <Link to={hasChildren ? "/Dashboard/ChildProfile" : "/subscriptions"}>
            {hasChildren ? "Open child accounts" : "Choose subscription"}
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
  const displayName =
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") || "Not provided";
  const displayEmail = currentUser?.email || "Not provided";
  const memberSince = formatAccountDate(currentUser?.createdAt);

  return (
    <div className="bg-background min-h-screen px-4 md:px-20">
      <Intro />
      <DashboardLayout contentClassName="px-6">
        <DashboardNextStep userId={currentUser?._id} />

        <div className="mb-6 flex flex-col gap-1">
          <Heading level={1} className="text-h1">
            My info
          </Heading>
          <Text tone="muted">Account details and contact information.</Text>
        </div>

        <div className="rounded-2xl border border-border bg-card px-5">
          <InfoRow icon={User} label="Name" value={displayName} />
          <InfoRow icon={Mail} label="Email" value={displayEmail} />
          {currentUser?.phone && (
            <InfoRow icon={Phone} label="Phone number" value={currentUser.phone} />
          )}
          <InfoRow icon={KeyRound} label="Password" value={MASKED_PASSWORD} />
          <InfoRow icon={Calendar} label="Member since" value={memberSince} />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default UserInfoIntro;
