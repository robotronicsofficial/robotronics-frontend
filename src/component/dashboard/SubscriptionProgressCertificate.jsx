import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserCircle } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { formatDisplayDate } from "../../lib/subscription";
import {
  getActiveChildId,
  matchesChildSessionIdentifier,
  resolveChildSessionIdentifier,
} from "../../utils/childSessionRequest";
import { useParent } from "../../hooks/useAccount";
import { Button } from "@/components/ui/button";

const SubscriptionProgressCertificate = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const activeChildId = getActiveChildId();
  const { data: parent } = useParent(userId);
  const children = parent?.children || [];

  return (
    <DashboardLayout>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Child Accounts</h1>

        <div className="flex flex-wrap p-1 sm:p-3 lg:p-5">
          {children.length > 0 ? (
            children.map((child, index) => {
              const isUnlockedChild = matchesChildSessionIdentifier(child, activeChildId);
              const childRouteId = resolveChildSessionIdentifier(child, activeChildId);

              return (
                <div
                  key={index}
                  className="w-full p-2 sm:w-1/2 md:p-3"
                >
                  <div className="flex flex-col gap-y-3 bg-card rounded-xl p-5 shadow-lg w-full min-w-[280px] md:max-w-md max-w-[450px]">
                    <div className="flex items-center gap-4 mb-3">
                      <UserCircle className="text-4xl text-muted-foreground" />
                      <p className="text-xl font-semibold text-muted-foreground">
                        {child.firstName} {child.lastName}
                      </p>
                    </div>

                    <div className="flex flex-col text-sm text-muted-foreground gap-y-1">
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
                      className="mt-3 h-auto w-full rounded-lg border border-border bg-primary px-3 py-2 text-sm text-background hover:bg-primary"
                      onClick={() => {
                        if (!isUnlockedChild || !childRouteId) {
                          navigate("/Dashboard/ChildProfile");
                          return;
                        }

                        navigate(
                          `/Dashboard/ProgressCertificate/ProgressPage?childId=${childRouteId}`
                        );
                      }}
                    >
                      {isUnlockedChild ? "View Progress" : "Unlock in Child Accounts"}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No children found.</p>
          )}
        </div>
    </DashboardLayout>
  );
};

export default SubscriptionProgressCertificate;
