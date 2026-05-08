import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import { Heading, Text } from "@/components/ui/typography";

const EmptyState = ({
  action,
  className,
  description,
  icon: Icon,
  title,
}) => (
  <div
    className={cn(
      "flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center shadow-xs",
      className,
    )}
  >
    {Icon && (
      <div className="mb-4 rounded-full bg-muted p-3 text-muted-foreground">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>
    )}
    <Heading level={3}>{title}</Heading>
    {description && (
      <Text className="mt-2 max-w-md" tone="muted">
        {description}
      </Text>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

EmptyState.propTypes = {
  action: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  icon: PropTypes.elementType,
  title: PropTypes.node.isRequired,
};

export default EmptyState;
