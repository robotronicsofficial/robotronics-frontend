import { useMemo, useState } from "react";

import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Text } from "@/components/ui/typography";
import { getCurrentMonthEndIso } from "@/lib/promo";

/* The annual-offer counterpart to BillingToggle: only meaningful when a
   visitor is looking at annual pricing, so the parent page gates it on
   cycle === "annual". The label hides itself the instant the deadline
   passes — no orphan "Annual offer ends in" with an empty timer. */
export const AnnualOfferCountdown = () => {
  const endsAt = useMemo(getCurrentMonthEndIso, []);
  const [expired, setExpired] = useState(
    () => new Date(endsAt).getTime() <= Date.now(),
  );

  if (expired) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <Text size="xs" tone="muted" className="uppercase tracking-[0.14em]">
        Annual offer ends in
      </Text>
      <CountdownTimer endsAt={endsAt} onExpire={() => setExpired(true)} />
    </div>
  );
};
