import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const PageHeader = ({
  actions,
  children,
  className,
  eyebrow,
  title,
}) => (
  <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow className="mb-3 block">{eyebrow}</Eyebrow>}
      <Heading level={1}>{title}</Heading>
      {children && (
        <Text className="mt-4" size="lg" tone="muted">
          {children}
        </Text>
      )}
    </div>
    {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
  </div>
);

PageHeader.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
};

export default PageHeader;
