import PropTypes from 'prop-types';
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DialogShell from "@/components/ui/dialog-shell";

const SuccessModal = ({ isOpen, onClose }) => (
  <DialogShell isOpen={isOpen} onClose={onClose} title="Successful">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckIcon aria-hidden="true" />
      </div>
      <Button className="w-full bg-primary text-background hover:bg-accent" onClick={onClose}>
        CONTINUE
      </Button>
    </div>
  </DialogShell>
);

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
