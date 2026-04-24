import { useState, useEffect } from "react";

import PinDigitFields from "@/components/forms/PinDigitFields";
import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";

const PinModal = ({ 
  isOpen, 
  onClose, 
  onPinSubmit, 
  mode = "create",
  title = "Set Up a PIN",
  description = "Enter your 4 digits pin"
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <PinDigitFields
          idPrefix={`${mode}-pin-input`}
          label="PIN"
          value={pin}
          onChange={setPin}
          type="text"
          hideLabel
          autoFocus
        />

        <Button type="submit" className="w-full bg-primary text-white hover:bg-accent">
          {mode === "verify" ? "VERIFY PIN" : "CONFIRM PIN"}
        </Button>
      </form>
    </DialogShell>
  );
};

export default PinModal; 
