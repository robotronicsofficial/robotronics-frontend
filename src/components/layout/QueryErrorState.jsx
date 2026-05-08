import PropTypes from "prop-types";
import { RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QueryErrorState = ({
  title = "Couldn't load this right now",
  message,
  onRetry,
  className,
}) => (
  <div className={cn("flex w-full flex-col items-start gap-4", className)}>
    <Alert variant="destructive" className="w-full">
      <AlertTitle>{title}</AlertTitle>
      {message ? <AlertDescription>{message}</AlertDescription> : null}
    </Alert>
    {onRetry ? (
      <Button
        type="button"
        onClick={onRetry}
        className="h-auto gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover"
      >
        <RefreshCw className="size-4" />
        Try again
      </Button>
    ) : null}
  </div>
);

QueryErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

export default QueryErrorState;
