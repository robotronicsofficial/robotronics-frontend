import { useNavigate } from "@tanstack/react-router";
import { Cake, Mail, MapPin, Phone, School, UserCircle } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { formatDisplayDate } from "@/lib/subscription";
import {
  getActiveChildId,
  matchesChildSessionIdentifier,
} from "@/utils/childSessionRequest";
import { useCurrentParent } from "@/hooks/useAccount";

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

const SubscriptionProgressCertificate = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser?._id;
  const activeChildId = getActiveChildId();
  const { data: parent } = useCurrentParent(userId);
  const children = parent?.children || [];

  return (
    <DashboardLayout contentClassName="px-6">
      <div className="mb-8 flex flex-col gap-1">
        <Heading level={1} className="text-h1">
          Progress &amp; certificates
        </Heading>
        <Text tone="muted">
          Pick a child profile to view their course progress and earned certificates.
        </Text>
      </div>

      {children.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {children.map((child) => {
            const isUnlockedChild = matchesChildSessionIdentifier(child, activeChildId);
            const fullName = [child.firstName, child.lastName].filter(Boolean).join(" ") || "Child";
            const address = [child.streetAddress, child.city, child.postalCode]
              .filter(Boolean)
              .join(", ");
            return (
              <Card key={child._id} className="h-full">
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
                      {child.country && (
                        <Text size="xs" tone="subtle">
                          {child.country}
                        </Text>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {child.email && <DetailRow icon={Mail} label="Email" value={child.email} />}
                    {child.dateOfBirth && (
                      <DetailRow
                        icon={Cake}
                        label="Date of birth"
                        value={formatDisplayDate(child.dateOfBirth)}
                      />
                    )}
                    {child.phone && <DetailRow icon={Phone} label="Phone" value={child.phone} />}
                    {child.schoolName && (
                      <DetailRow icon={School} label="School" value={child.schoolName} />
                    )}
                    {address && <DetailRow icon={MapPin} label="Address" value={address} />}
                  </div>

                  <Button
                    type="button"
                    variant={isUnlockedChild ? "default" : "outline"}
                    className="mt-auto w-full"
                    onClick={() => {
                      navigate({
                        to: isUnlockedChild
                          ? "/Dashboard/ProgressCertificate/ProgressPage"
                          : "/Dashboard/ChildProfile",
                      });
                    }}
                  >
                    {isUnlockedChild ? "View progress" : "Unlock in child accounts"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent>
            <Text tone="muted">
              No children found. Add a child profile to start tracking progress.
            </Text>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default SubscriptionProgressCertificate;
