import { useEffect, useState } from "react";

import PinDigitFields from "@/components/forms/PinDigitFields";
import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";

const ChangePinModal = ({ 
  isOpen, 
  onClose, 
  onPinSubmit,
  error,
  onClearError
}) => {
  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPin(["", "", "", ""]);
      setNewPin(["", "", "", ""]);
      setConfirmPin(["", "", "", ""]);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClearError();
    
    const fullCurrentPin = currentPin.join("");
    const fullNewPin = newPin.join("");
    const fullConfirmPin = confirmPin.join("");

    if (fullCurrentPin.length !== 4 || fullNewPin.length !== 4 || fullConfirmPin.length !== 4) {
      onPinSubmit({ error: "Please fill all PIN fields" });
      return;
    }

    if (fullNewPin !== fullConfirmPin) {
      onPinSubmit({ error: "New PINs don't match" });
      return;
    }

    if (fullNewPin === fullCurrentPin) {
      onPinSubmit({ error: "New PIN cannot be same as current PIN" });
      return;
    }

    onPinSubmit({
      oldPin: fullCurrentPin,
      newPin: fullNewPin
    });
  };

  return (
    <DialogShell
      isOpen={isOpen}
      onClose={onClose}
      title="Change Your PIN"
      description="Enter your current and new 4-digit PIN"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <PinDigitFields
          idPrefix="current-pin-input"
          label="Current PIN"
          value={currentPin}
          onChange={setCurrentPin}
          autoFocus
        />
        <PinDigitFields
          idPrefix="new-pin-input"
          label="New PIN"
          value={newPin}
          onChange={setNewPin}
        />
        <PinDigitFields
          idPrefix="confirm-pin-input"
          label="Confirm New PIN"
          value={confirmPin}
          onChange={setConfirmPin}
        />

        <Button type="submit" className="w-full bg-primary text-background hover:bg-primary-hover">
          CHANGE PIN
        </Button>
      </form>
    </DialogShell>
  );
};

export default ChangePinModal;
