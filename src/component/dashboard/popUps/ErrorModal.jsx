import { CircleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <DialogShell isOpen={isOpen} onClose={onClose} title="Error">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlertIcon aria-hidden="true" />
        </div>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
        <Button type="button" variant="destructive" className="w-full" onClick={onClose}>
          OK
        </Button>
      </div>
    </DialogShell>
  );
};

export default ErrorModal;
