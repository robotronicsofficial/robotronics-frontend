import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserCircle } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { formatDisplayDate } from "../../lib/subscription";
import {
  getActiveChildId,
  matchesChildSessionIdentifier,
} from "../../utils/childSessionRequest";
import { useParent } from "../../hooks/useAccount";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SubscriptionProgressCertificate = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const activeChildId = getActiveChildId();
  const { data: parent } = useParent(userId);
  const children = parent?.children || [];

  return (
    <DashboardLayout>
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Child Accounts</h1>

        {children.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 p-3 sm:grid-cols-2 lg:p-5">
            {children.map((child, index) => {
              const isUnlockedChild = matchesChildSessionIdentifier(child, activeChildId);

              return (
                <Card key={index} className="h-full">
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <UserCircle className="size-10 text-muted-foreground" />
                      <p className="text-xl font-semibold text-muted-foreground">
                        {child.firstName} {child.lastName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <p><strong>Email:</strong> {child.email}</p>
                      <p><strong>Phone:</strong> {child.phone}</p>
                      <p><strong>DOB:</strong> {formatDisplayDate(child.dateOfBirth)}</p>
                      <p><strong>Country:</strong> {child.country}</p>
                      <p><strong>School:</strong> {child.schoolName}</p>
                      <p><strong>Street Address:</strong> {child.streetAddress}</p>
                      <p><strong>City:</strong> {child.city}</p>
                      <p><strong>Postal Code:</strong> {child.postalCode}</p>
                    </div>

                    <Button
                      type="button"
                      className="h-auto w-full rounded-lg border border-border bg-primary px-3 py-2 text-sm text-background hover:bg-primary"
                      onClick={() => {
                        if (!isUnlockedChild) {
                          navigate("/Dashboard/ChildProfile");
                          return;
                        }

                        navigate("/Dashboard/ProgressCertificate/ProgressPage");
                      }}
                    >
                      {isUnlockedChild ? "View Progress" : "Unlock in Child Accounts"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <p>No children found.</p>
        )}
    </DashboardLayout>
  );
};

export default SubscriptionProgressCertificate;
