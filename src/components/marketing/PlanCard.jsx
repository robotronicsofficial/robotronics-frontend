import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatPKR } from "@/utils/formatPrice";

/* Pricing card used by both the B2C and B2B sections.
   `tone` chooses the surface variant; `popular` adds the "Most Popular" pill.
   `cycle` toggles the displayed pricing between monthly and annual. */
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
  const cycleLabel =
    cycle === "annual" ? "/month, billed annually" : "/month";

  return (
    <Card tone={tone} className={cn("relative", className)}>
      {popular && (
        <Badge variant="popular" className="absolute right-5 top-5">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="text-h3 font-semibold">{name}</CardTitle>
        {description && (
          <Text size="sm" tone="muted" className="mt-1">
            {description}
          </Text>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex items-baseline gap-2">
          <Heading level={1} className="text-display-md leading-none">
            {formatPKR(price)}
          </Heading>
          <Text size="sm" tone="muted">
            {cycleLabel}
          </Text>
        </div>

        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <Text size="sm">{feature}</Text>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="bg-transparent">
        {cta.to ? (
          <Button
            asChild
            size="marketing"
            variant={popular || tone === "tinted" ? "default" : "outline"}
            className="w-full"
          >
            <Link to={cta.to}>{cta.label}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={cta.onClick}
            size="marketing"
            variant={popular || tone === "tinted" ? "default" : "outline"}
            className="w-full"
          >
            {cta.label}
          </Button>
        )}
      </CardFooter>
    </Card>
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
