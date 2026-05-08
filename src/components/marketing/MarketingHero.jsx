import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import HeroAtmospherics from "./HeroAtmospherics";

/* ──────────────────────────────────────────────────────────────────
   MarketingHero — single source of truth for hero rhythm.

   Three padding tiers control vertical breathing room:
     • flagship — home / about / final brand surfaces.
     • page     — standalone marketing pages (ServiceDetail, course detail).
     • compact  — flow steps (checkout, subscription, dashboard intros).

   Pass a `step` to render a flow eyebrow ("Step 2 · Payment") instead of
   a free-form `eyebrow`. Pass `visual` to switch to a 2-column split hero.
   ────────────────────────────────────────────────────────────────── */

const SIZE_CLASS = {
  flagship: "pt-header pb-20 md:pb-28",
  page: "pt-header pb-16 md:pb-20",
  compact: "pt-header pb-10 md:pb-12",
};

const ALIGN_CLASS = {
  center: "items-center text-center",
  left: "items-start text-left",
};

const renderTitle = (title, size) => {
  if (!title) return null;
  if (typeof title === "string") {
    return <Display size={size === "flagship" ? "lg" : "md"}>{title}</Display>;
  }
  return title;
};

export const MarketingHero = ({
  size = "page",
  align = "center",
  eyebrow,
  step,
  title,
  subtitle,
  actions,
  visual,
  atmosphere = "grid",
  className,
  containerSize = "wide",
  children,
}) => {
  const eyebrowContent = step
    ? `Step ${step.current} · ${step.label}`
    : eyebrow;

  const titleNode = renderTitle(title, size);
  const subtitleNode =
    typeof subtitle === "string" ? (
      <Text size="lg" tone="muted" className="max-w-prose">
        {subtitle}
      </Text>
    ) : (
      subtitle
    );

  if (visual) {
    return (
      <section
        className={cn(
          "relative isolate overflow-hidden bg-background",
          SIZE_CLASS[size],
          className,
        )}
      >
        {atmosphere !== "none" && <HeroAtmospherics variant={atmosphere} />}
        <Container size={containerSize}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
            <div className="flex min-w-0 flex-col items-start gap-5 text-left">
              {eyebrowContent && <Eyebrow>{eyebrowContent}</Eyebrow>}
              {titleNode}
              {subtitleNode}
              {children}
              {actions && (
                <div className="flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
            <div className="flex min-w-0 w-full justify-center lg:justify-end">
              {visual}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background",
        SIZE_CLASS[size],
        className,
      )}
    >
      {atmosphere !== "none" && <HeroAtmospherics variant={atmosphere} />}
      <Container size={containerSize}>
        <div
          className={cn(
            "flex max-w-2xl flex-col gap-3",
            align === "center" && "mx-auto",
            ALIGN_CLASS[align],
          )}
        >
          {eyebrowContent && <Eyebrow>{eyebrowContent}</Eyebrow>}
          {titleNode}
          {subtitleNode}
          {children}
          {actions && (
            <div
              className={cn(
                "flex flex-wrap items-center gap-3",
                align === "center" && "justify-center",
              )}
            >
              {actions}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

MarketingHero.propTypes = {
  size: PropTypes.oneOf(Object.keys(SIZE_CLASS)),
  align: PropTypes.oneOf(Object.keys(ALIGN_CLASS)),
  eyebrow: PropTypes.node,
  step: PropTypes.shape({
    current: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    total: PropTypes.number,
  }),
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  visual: PropTypes.node,
  atmosphere: PropTypes.oneOf(["grid", "none"]),
  className: PropTypes.string,
  containerSize: PropTypes.oneOf(["narrow", "default", "wide", "full"]),
  children: PropTypes.node,
};

export default MarketingHero;
