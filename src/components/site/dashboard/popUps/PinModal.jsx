import { useState, useEffect } from "react";

import PinDigitFields from "@/components/forms/PinDigitFields";
import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";

const PinModal = ({
  isOpen,
  onClose,
  onPinSubmit,
  mode = "create",
  title = "Set up a PIN",
  description = "Enter a 4-digit PIN",
  onForgotPin,
}) => {
  const [pin, setPin] = useState(["", "", "", ""]);

  useEffect(() => {
    if (isOpen) {
      setPin(["", "", "", ""]);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPin = pin.join("");
    if (fullPin.length === 4) {
      onPinSubmit(fullPin);
    } else {
      onPinSubmit({ error: "Please enter a 4-digit PIN" });
    }
  };

  return (
    <DialogShell isOpen={isOpen} onClose={onClose} title={title} description={description}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <PinDigitFields
          idPrefix={`${mode}-pin-input`}
          label="PIN"
          value={pin}
          onChange={setPin}
          type="password"
          hideLabel
          autoFocus
        />

        <Button type="submit" className="w-full">
          {mode === "verify" ? "Start session" : "Save PIN"}
        </Button>

        {mode === "verify" && onForgotPin && (
          <Button type="button" variant="link" onClick={onForgotPin}>
            Forgot PIN?
          </Button>
        )}
      </form>
    </DialogShell>
  );
};

export default PinModal;

