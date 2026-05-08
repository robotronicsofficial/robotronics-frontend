import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PinDigitFields from "@/components/forms/PinDigitFields";
import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";
import { Text } from "@/components/ui/typography";

/* Parent-side PIN reset. Skips the "current PIN" requirement on purpose:
   the parent owns the account, so requiring a forgotten PIN to set a new
   one was a dead-end. Instead we ask the parent to re-confirm by setting
   a new PIN twice; the backend `/children/:id/pin/reset` is gated by the
   parent session cookie. */
const ForgotPinModal = ({ isOpen, onClose, onSubmit, isPending }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirm, setConfirm] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setPin(["", "", "", ""]);
      setConfirm(["", "", "", ""]);
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const pinValue = pin.join("");
    const confirmValue = confirm.join("");
    if (pinValue.length !== 4) {
      setError("PIN must be 4 digits.");
      return;
    }
    if (pinValue !== confirmValue) {
      setError("PINs don't match.");
      return;
    }
    setError(null);
    onSubmit(pinValue);
  };

  return (
    <DialogShell
      isOpen={isOpen}
      onClose={onClose}
      title="Reset PIN"
      description="Pick a new 4-digit PIN. We'll skip the old one because you're signed in as the parent."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <PinDigitFields
          idPrefix="forgot-new-pin"
          label="New PIN"
          value={pin}
          onChange={setPin}
          type="password"
        />
        <PinDigitFields
          idPrefix="forgot-confirm-pin"
          label="Confirm new PIN"
          value={confirm}
          onChange={setConfirm}
          type="password"
        />
        {error && (
          <Text size="sm" className="text-center text-destructive" role="alert">
            {error}
          </Text>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Reset PIN"}
        </Button>
        <Button type="button" variant="link" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
      </form>
    </DialogShell>
  );
};

ForgotPinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default ForgotPinModal;
