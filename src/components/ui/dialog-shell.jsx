import PropTypes from "prop-types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const DialogShell = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  showCloseButton = true,
}) => {
  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "max-h-[90vh] overflow-y-auto rounded-lg bg-card p-6 text-card-foreground sm:max-w-md",
          className
        )}
      >
        <DialogHeader className="text-center">
          <DialogTitle className={cn("text-xl font-bold sm:text-2xl", titleClassName)}>
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription
              className={cn("text-center text-sm sm:text-base", descriptionClassName)}
            >
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

DialogShell.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  showCloseButton: PropTypes.bool,
};

export default DialogShell;
