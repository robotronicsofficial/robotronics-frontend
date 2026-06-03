import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logoMark from "@/assets/logo/robotronicsCharacter.svg";
import { cn } from "@/lib/utils";
import HeaderActions from "./HeaderActions";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderNav from "./HeaderNav";

const Brand = () => (
  <Link
    to="/"
    className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
    aria-label="Robotronics — home"
  >
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      className="h-8 w-8 shrink-0"
    />
    <span className="text-body font-semibold tracking-tight">Robotronics.ai</span>
  </Link>
);

/* Triggered ~one navbar-height down so a small scroll drift doesn't toggle
   the morph repeatedly. */
const SCROLL_THRESHOLD = 24;

/*
 * Header
 *
 * Two-state navbar:
 *   • At top — full-width bar, low-opacity background, no shadow.
 *     Lets the hero's dithered backdrop bleed through.
 *   • Scrolled — floating pill, narrower max-width, denser background +
 *     border + shadow. Reads as "you've left the hero, this is now chrome."
 *
 * The morph is a CSS transition on max-width / padding / border-radius /
 * background, not a remount, so dropdowns and focus state survive scroll.
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-header w-full duration-300 ease-out",
        scrolled ? "px-3 pt-3 sm:px-6" : "px-0 pt-0",
      )}
    >
      <div
        data-scrolled={scrolled || undefined}
        className={cn(
          "group/header mx-auto flex h-16 items-center justify-between gap-6 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "max-w-[68rem] rounded-full border border-border bg-background/85 px-4 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/70 sm:px-5"
            : "max-w-shell-wide border border-transparent bg-background/35 px-6 lg:px-8",
        )}
      >
        <div className="flex items-center gap-8">
          <Brand />
          <HeaderNav />
        </div>
        <div className="flex items-center gap-1">
          <HeaderActions />
          <HeaderMobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
