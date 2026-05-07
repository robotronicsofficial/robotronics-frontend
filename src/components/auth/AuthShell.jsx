import PropTypes from "prop-types";

import HeroAtmospherics from "@/components/marketing/HeroAtmospherics";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   AuthShell — atmospheric backdrop for auth pages.

   Re-uses the canonical hero grid so login / signup / reset / verify share
   the same quiet backdrop. The shell clears the fixed header and stretches
   to fill the viewport so the form lands centered vertically.
   ────────────────────────────────────────────────────────────────── */

export const AuthShell = ({ children, className }) => (
  <section
    className={cn(
      "relative isolate flex min-h-[calc(100vh_-_var(--spacing-header))] overflow-hidden bg-background pt-header pb-20",
      className,
    )}
  >
    <HeroAtmospherics variant="grid" />

    <Container size="narrow" className="flex flex-1 items-center">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        {children}
      </div>
    </Container>
  </section>
);

AuthShell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default AuthShell;
