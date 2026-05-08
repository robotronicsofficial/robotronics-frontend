import PropTypes from "prop-types";
import { UserCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { useFormatMoney } from "@/utils/formatPrice";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   CheckoutSummary — sticky right-rail order recap.

   Identical visual frame across every wizard step so the user always
   knows how much they'll be charged and which kids are on the order.
   ────────────────────────────────────────────────────────────────── */

const SummaryRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <Text size="sm" tone="muted">
      {label}
    </Text>
    <Text
      size="sm"
      weight={highlight ? "semibold" : "regular"}
      className={cn("text-right", highlight && "text-foreground")}
    >
      {value}
    </Text>
  </div>
);

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
};

export const CheckoutSummary = ({ plan, learners, sticky = true, totalLabel = "Total today" }) => {
  const formatMoney = useFormatMoney();
  const childCount = learners.length;
  const price = plan?.price || 0;
  const total = childCount * price;
  const billingCycle = plan?.billingCycle || "monthly";
  const cycleLabel = billingCycle === "annual" ? "/year" : "/month";

  return (
    <Card className={cn(sticky && "lg:sticky lg:top-24 lg:self-start")}>
      <CardContent className="flex flex-col gap-5">
        <Heading level={3} className="text-h5">
          Order summary
        </Heading>

        {plan ? (
          <div className="flex flex-col gap-1 rounded-2xl bg-primary-soft p-4">
            <Eyebrow tone="brand">{billingCycle === "annual" ? "Annual" : "Monthly"}</Eyebrow>
            <Heading level={4} className="text-h5">
              {plan.name}
            </Heading>
            <Text size="sm" tone="muted">
              {formatMoney(price)}
              <span className="ml-0.5">{cycleLabel}</span>
              <span className="ml-1">per child</span>
            </Text>
          </div>
        ) : (
          <Text size="sm" tone="muted">
            Pick a plan to start your order.
          </Text>
        )}

        {childCount > 0 && (
          <div className="flex flex-col gap-2">
            <Eyebrow>{childCount === 1 ? "Learner" : "Learners"}</Eyebrow>
            <ul className="flex flex-col gap-2">
              {learners.map((child, index) => {
                const fullName = [child.firstName, child.lastName]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <li
                    key={child._id || child.childCode || `${index}-${child.firstName}`}
                    className="flex items-center gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
                    >
                      <UserCircle className="size-4" />
                    </span>
                    <Text size="sm" className="flex-1 truncate">
                      {fullName || `Child ${index + 1}`}
                    </Text>
                    <Text size="sm" tone="muted">
                      {formatMoney(price)}
                    </Text>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <SummaryRow label="Children" value={childCount} />
          <SummaryRow label={`Per child${cycleLabel}`} value={formatMoney(price)} />
          <SummaryRow label={totalLabel} value={formatMoney(total)} highlight />
        </div>

        <Text size="xs" tone="muted">
          Cancel anytime from your dashboard. No calls, no forms.
        </Text>
      </CardContent>
    </Card>
  );
};

CheckoutSummary.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    billingCycle: PropTypes.string,
  }),
  learners: PropTypes.array.isRequired,
  sticky: PropTypes.bool,
  totalLabel: PropTypes.string,
};

export default CheckoutSummary;
