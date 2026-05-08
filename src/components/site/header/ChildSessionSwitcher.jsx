import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, LogOut, RefreshCw, UserCircle, X } from "lucide-react";
import { toast } from "sonner";

import PinDigitFields from "@/components/forms/PinDigitFields";
import { Button } from "@/components/ui/button";
import { Eyebrow, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import {
  useChildAccounts,
  useVerifyChildPinMutation,
} from "@/hooks/useAccount";
import {
  clearActiveChildSession,
  getActiveChildSession,
  getChildSessionIdentifiers,
  matchesChildSessionIdentifier,
  setActiveChildSession,
} from "@/utils/childSessionRequest";
import { cn } from "@/lib/utils";
import HeaderPopover from "./HeaderPopover";

/* ──────────────────────────────────────────────────────────────────
   ChildSessionSwitcher — first-class profile picker.

   Shown in the header whenever the parent has at least one child on the
   subscription. Lets the parent see who's learning right now and swap in
   one click + one PIN. Replaces the old "navigate to dashboard, find the
   right card, re-enter PIN" path.
   ────────────────────────────────────────────────────────────────── */

const ChildSessionSwitcher = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: childAccountsData } = useChildAccounts(currentUser?._id);
  const verifyPinMutation = useVerifyChildPinMutation();
  const [activeSession, setSession] = useState(() => getActiveChildSession());
  const [pendingChild, setPendingChild] = useState(null);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);

  /* Refresh the local snapshot of which child is active when:
     • we mount (route change / hard reload)
     • the parent activates a new session via PIN
     • the parent signs out a child */
  useEffect(() => {
    const interval = setInterval(() => {
      const next = getActiveChildSession();
      setSession((prev) => (prev?.sessionId === next?.sessionId ? prev : next));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pendingChild) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePinDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [pendingChild]);

  const children = childAccountsData?.children || [];
  if (!children.length) return null;

  const activeChild = activeSession
    ? children.find((child) =>
        matchesChildSessionIdentifier(child, activeSession.childId),
      )
    : null;

  const activeName = activeChild
    ? [activeChild.firstName, activeChild.lastName].filter(Boolean).join(" ")
    : null;

  const closePinDialog = () => {
    setPendingChild(null);
    setDigits(["", "", "", ""]);
    setError(null);
  };

  const handleSwitchClick = (child) => {
    if (!child.hasPin) {
      navigate({ to: "/Dashboard/ChildProfile" });
      toast.info(`Set a PIN for ${child.firstName} first.`);
      return;
    }
    setPendingChild(child);
    setDigits(["", "", "", ""]);
    setError(null);
  };

  const handlePinSubmit = async (event) => {
    event.preventDefault();
    if (!pendingChild) return;
    const pin = digits.join("");
    if (pin.length !== 4) {
      setError("Enter all 4 digits.");
      return;
    }
    setError(null);
    try {
      const childAccessId = pendingChild?.accessChildId || pendingChild?._id;
      const data = await verifyPinMutation.mutateAsync({
        childId: childAccessId,
        pin,
        force: true,
      });

      /* Force-takeover: a previously-active session is replaced silently.
         This used to be a dead-end "Another child is using this account"
         toast — now we just swap. */
      clearActiveChildSession();
      if (data.sessionId) {
        setActiveChildSession({
          childId: childAccessId,
          childIds: getChildSessionIdentifiers(pendingChild),
          sessionId: data.sessionId,
        });
        setSession(getActiveChildSession());
      }

      toast.success(`Switched to ${pendingChild.firstName}.`);
      closePinDialog();
      navigate({ to: "/Dashboard/myAllCourses" });
    } catch (mutationError) {
      setError(
        mutationError.message ||
          "Wrong PIN. Tap 'Forgot PIN' if you can't remember it.",
      );
    }
  };

  const handleSignOutChild = () => {
    clearActiveChildSession();
    setSession(null);
    toast.info("Logged out of child profile.");
    navigate({ to: "/Dashboard/ChildProfile" });
  };

  const handleForgotPin = () => {
    closePinDialog();
    toast.info("Manage PINs from Child accounts.");
    navigate({ to: "/Dashboard/ChildProfile" });
  };

  const triggerLabel = activeName
    ? `Now learning as ${activeName}`
    : "Switch profile";

  return (
    <>
      <HeaderPopover
        contentClassName="min-w-64"
        trigger={({ open, triggerProps }) => (
          <button
            {...triggerProps}
            className={cn(
              "hidden h-9 max-w-[16rem] items-center gap-2 rounded-full border border-border px-3 text-body-sm font-medium",
              "transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex",
              activeChild && "border-primary bg-primary-soft text-foreground",
            )}
            aria-label={triggerLabel}
          >
            <UserCircle aria-hidden="true" className="size-4" />
            <span className="truncate">
              {activeChild ? activeName : "Pick learner"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-180")}
            />
          </button>
        )}
      >
        {({ close }) => (
          <>
            <div className="px-2.5 py-2 text-caption font-semibold text-muted-foreground">
              {activeChild ? "Now learning as" : "Pick a learner"}
            </div>
            {activeChild && (
              <div className="px-2.5 pb-2">
                <Text size="sm" weight="semibold" className="truncate">
                  {activeName}
                </Text>
                <Text size="xs" tone="muted">
                  {activeChild.email || "PIN session active"}
                </Text>
              </div>
            )}
            <hr className="-mx-2 border-border" />
            <div className="px-2.5 py-2">
              <Eyebrow>All children</Eyebrow>
            </div>
            {children.map((child) => {
              const fullName =
                [child.firstName, child.lastName].filter(Boolean).join(" ") ||
                "Child";
              const isActive = matchesChildSessionIdentifier(
                child,
                activeSession?.childId,
              );

              return (
                <button
                  key={child._id}
                  type="button"
                  role="menuitem"
                  disabled={isActive}
                  onClick={() => {
                    close();
                    handleSwitchClick(child);
                  }}
                  className={cn(
                    "flex w-full flex-col items-start gap-0.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:cursor-default",
                    isActive && "bg-primary-soft",
                  )}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="font-medium">{fullName}</span>
                    {isActive && (
                      <span className="text-caption font-semibold uppercase tracking-wide text-primary">
                        Active
                      </span>
                    )}
                  </span>
                  <span className="text-caption text-muted-foreground">
                    {child.hasPin ? "Tap to switch" : "Set a PIN to log in"}
                  </span>
                </button>
              );
            })}
            <hr className="-mx-2 my-1 border-border" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                close();
                navigate({ to: "/Dashboard/ChildProfile" });
              }}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-body-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Manage child accounts
            </button>
            {activeChild && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  handleSignOutChild();
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-body-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive focus:outline-none"
              >
                <LogOut aria-hidden="true" className="size-4" />
                Sign out of {activeChild.firstName}
              </button>
            )}
          </>
        )}
      </HeaderPopover>

      {pendingChild && (
        <div className="fixed inset-0 z-modal grid place-items-center p-4">
          <button
            type="button"
            aria-label="Close PIN dialog"
            className="absolute inset-0 bg-overlay"
            onClick={closePinDialog}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="switch-child-title"
            aria-describedby="switch-child-description"
            className="relative w-full max-w-md rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-xl"
          >
            <button
              type="button"
              aria-label="Close PIN dialog"
              onClick={closePinDialog}
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
            <div className="mb-5 pr-8 text-center">
              <h2 id="switch-child-title" className="text-h3">
                Switch to {pendingChild.firstName}
              </h2>
              <Text id="switch-child-description" size="sm" tone="muted" className="mt-2">
                Enter the 4-digit PIN to start their learning session.
              </Text>
            </div>
            <form onSubmit={handlePinSubmit} className="flex flex-col gap-5">
              <PinDigitFields
                idPrefix="switch-child-pin"
                label="PIN"
                value={digits}
                onChange={setDigits}
                type="password"
                hideLabel
                autoFocus
              />
              {error && (
                <Text size="sm" className="text-center text-destructive" role="alert">
                  {error}
                </Text>
              )}
              <Button type="submit" disabled={verifyPinMutation.isPending}>
                {verifyPinMutation.isPending ? "Switching..." : "Start session"}
              </Button>
              <Button type="button" variant="link" onClick={handleForgotPin}>
                Forgot PIN?
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildSessionSwitcher;
