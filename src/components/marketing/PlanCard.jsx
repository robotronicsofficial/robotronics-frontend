import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { Check, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatPKR } from "@/utils/formatPrice";

/* Two-zone pricing card: a gradient header carries the price (and the
   "Popular" tag when applicable), and a clean white body carries the name,
   description, features, and pill CTA. Mustard is the anchor (left) and
   the warm-sunset extensions (peach → rose → violet) flow toward the right
   so the header reads as iridescent without losing the brand voice.
   - default → mustard-only (lowest emphasis, no extension hues)
   - tinted  → mustard → peach → rose (warm two-step)
   - highlighted → mustard → rose → violet (full sunset, popular tier)
   The radial in the top-right corner is the "light bouncing off the
   surface" highlight that gives the gradient depth instead of reading flat. */
const TONE_BACKGROUNDS = {
  default: {
    backgroundImage:
      "radial-gradient(circle at 80% 0%, var(--color-brand-50), transparent 55%), linear-gradient(135deg, var(--color-brand-100), var(--color-brand-300))",
  },
  tinted: {
    backgroundImage:
      "radial-gradient(circle at 100% 0%, var(--color-gradient-rose), transparent 60%), linear-gradient(135deg, var(--color-brand-300) 0%, var(--color-gradient-peach) 55%, var(--color-gradient-rose) 100%)",
  },
  highlighted: {
    backgroundImage:
      "radial-gradient(circle at 100% 25%, var(--color-gradient-violet), transparent 65%), linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-gradient-rose) 50%, var(--color-gradient-violet) 100%)",
  },
};

export const PlanCard = ({
  name,
  description,
  pricing,
  features,
  cta,
  tone = "default",
  popular = false,
  cycle = "monthly",
  className,
}) => {
  const price = cycle === "annual" ? pricing.annualMonthly : pricing.monthly;
  const billedLabel =
    cycle === "annual" ? "Billed annually" : "Billed monthly";
  const headerBg = TONE_BACKGROUNDS[tone] ?? TONE_BACKGROUNDS.default;

  const ctaButton = (
    <Button
      asChild={Boolean(cta.to)}
      type={cta.to ? undefined : "button"}
      onClick={cta.to ? undefined : cta.onClick}
      size="marketing"
      className="group/cta w-full gap-2 rounded-full"
    >
      {cta.to ? (
        <Link to={cta.to}>
          {cta.label}
          <ChevronsRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
        </Link>
      ) : (
        <>
          {cta.label}
          <ChevronsRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
        </>
      )}
    </Button>
  );

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-card shadow-md",
        className,
      )}
    >
      {/* Gradient header — Popular eyebrow always reserves space so paired
         cards (Basic/Pro) line up at the price baseline. */}
      <div
        className="relative flex flex-col gap-3 px-7 pb-7 pt-6"
        style={headerBg}
      >
        <span
          className={cn(
            "text-caption font-semibold uppercase tracking-[0.14em]",
            popular ? "text-foreground/80" : "invisible",
          )}
        >
          {popular ? "Popular" : "·"}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-display-md font-bold leading-none text-foreground">
              {formatPKR(price)}
            </span>
            <span className="text-body-sm text-foreground/70">/month</span>
          </div>
          <span className="text-caption text-foreground/60">
            Per child · {billedLabel}
          </span>
        </div>
      </div>

      {/* Body — name, description, divider, feature list, pill CTA pinned
         to the bottom (mt-auto) so paired cards align CTA-to-CTA. */}
      <div className="flex flex-1 flex-col gap-6 px-7 pb-7 pt-6">
        <div className="flex flex-col gap-1.5">
          <Heading level={3} className="text-h3 font-semibold">
            {name}
          </Heading>
          {description && (
            <Text size="sm" tone="muted">
              {description}
            </Text>
          )}
        </div>

        <span aria-hidden="true" className="block h-px w-full bg-border" />

        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-border text-foreground">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <Text size="sm">{feature}</Text>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">{ctaButton}</div>
      </div>
    </article>
  );
};

PlanCard.propTypes = {
  name: PropTypes.node.isRequired,
  description: PropTypes.node,
  pricing: PropTypes.shape({
    monthly: PropTypes.number.isRequired,
    annualMonthly: PropTypes.number.isRequired,
  }).isRequired,
  features: PropTypes.arrayOf(PropTypes.node).isRequired,
  cta: PropTypes.shape({
    label: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
  tone: PropTypes.oneOf(["default", "tinted", "highlighted"]),
  popular: PropTypes.bool,
  cycle: PropTypes.oneOf(["monthly", "annual"]),
  className: PropTypes.string,
};
