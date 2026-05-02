import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const SPLASH_KEY = "robotronics:hasSeenSplash";
const AUTO_ADVANCE_MS = 2500;

const Screen = () => {
  const navigate = useNavigate();

  // If the visitor has already seen the splash in this browser, redirect
  // immediately without rendering the splash content.
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
      /* storage may be unavailable (private mode); splash still works */
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

  if (alreadySeen) {
    return null;
  }

  const skip = () => navigate({ to: "/", replace: true });

  return (
    <button
      type="button"
      onClick={skip}
      aria-label="Continue to Robotronics home"
      className="flex h-svh w-full cursor-pointer flex-col items-center justify-center gap-6 bg-background px-6 text-center animate-in fade-in duration-500"
    >
      <p className="text-2xl tracking-[0.3em] text-muted-foreground md:text-3xl">
        WELCOME TO
      </p>
      <h1 className="text-5xl text-primary md:text-7xl lg:text-8xl">
        ROBOTRONICS
      </h1>
      <p className="lato-regular max-w-xl text-base text-muted-foreground md:text-lg">
        Hands-on robotics, coding, and STEM for kids.
      </p>
      <p className="lato-regular mt-6 text-sm text-muted-foreground">
        Press any key to continue
      </p>
    </button>
  );
};

export default Screen;
