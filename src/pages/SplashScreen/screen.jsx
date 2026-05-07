import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Display, Eyebrow, Text } from "@/components/ui/typography";

const SPLASH_KEY = "robotronics:hasSeenSplash";
const AUTO_ADVANCE_MS = 2500;

const Screen = () => {
  const navigate = useNavigate();

  const alreadySeen =
    typeof window !== "undefined" && window.localStorage?.getItem(SPLASH_KEY) === "1";

  useEffect(() => {
    if (alreadySeen) {
      navigate({ to: "/", replace: true });
      return;
    }

    try {
      window.localStorage?.setItem(SPLASH_KEY, "1");
    } catch {
      /* storage may be unavailable (private mode) */
    }

    const goHome = () => navigate({ to: "/", replace: true });
    const timer = window.setTimeout(goHome, AUTO_ADVANCE_MS);
    const onKey = () => goHome();

    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [alreadySeen, navigate]);

  if (alreadySeen) return null;

  const skip = () => navigate({ to: "/", replace: true });

  return (
    <button
      type="button"
      onClick={skip}
      aria-label="Continue to Robotronics home"
      className="flex h-svh w-full cursor-pointer flex-col items-center justify-center gap-6 bg-background px-6 text-center animate-in fade-in duration-500"
    >
      <Eyebrow className="tracking-[0.3em]">Welcome to</Eyebrow>
      <Display size="xl" tone="brand" className="uppercase">
        Robotronics
      </Display>
      <Text tone="muted" className="max-w-xl">
        Hands-on robotics, coding, and STEM for kids.
      </Text>
      <Text size="sm" tone="subtle">
        Press any key to continue
      </Text>
    </button>
  );
};

export default Screen;
