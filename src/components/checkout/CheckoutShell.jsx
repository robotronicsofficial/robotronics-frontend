import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Stepper } from "@/components/ui/stepper";
import HeroAtmospherics from "@/components/marketing/HeroAtmospherics";
import { Display, Eyebrow, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   CheckoutShell — quiet hero band + Stepper + content frame.

   Deliberately uses the `compact` MarketingHero rhythm (atmospheric grid
   backdrop, brand mustard accents) so the wizard reads as part of the
   marketing story, not a separate ledger UI.
   ────────────────────────────────────────────────────────────────── */

const STEPS = [
  { key: "plan", label: "Plan", description: "Choose a subscription" },
  { key: "kids", label: "Kids", description: "Who's learning?" },
  { key: "parent", label: "Billing", description: "Where to send receipts" },
  { key: "payment", label: "Payment", description: "Choose confirmation" },
  { key: "confirm", label: "Confirm", description: "Submit request" },
];

export const CheckoutShell = ({
  step,
  title,
  subtitle,
  eyebrow,
  children,
  containerSize = "wide",
}) => {
  const activeIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.key === step),
  );

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background pt-header pb-10 md:pb-12">
        <HeroAtmospherics variant="grid" />
        <Container size={containerSize}>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <Eyebrow>{eyebrow || `Step ${activeIndex + 1} of ${STEPS.length}`}</Eyebrow>
            <Display size="md">{title}</Display>
            {subtitle && (
              <Text size="lg" tone="muted" className="max-w-prose">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="mt-10">
            <Stepper steps={STEPS} activeIndex={activeIndex} />
          </div>
        </Container>
      </section>

      <section className={cn("bg-background pb-20 md:pb-24")}>
        <Container size={containerSize}>{children}</Container>
      </section>
    </>
  );
};

CheckoutShell.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  eyebrow: PropTypes.node,
  children: PropTypes.node.isRequired,
  containerSize: PropTypes.oneOf(["narrow", "default", "wide", "full"]),
};

export default CheckoutShell;
