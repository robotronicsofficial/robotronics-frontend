import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Heading,
  Text,
} from "@/components/ui/typography";

/* Shared layout for legal/policy pages: Terms, Privacy, Refund,
   Child Protection, and similar text-only surfaces.
   Pass `sections` for an ordered list with auto-numbered headings,
   or render arbitrary children via `children`. */
export const PolicyPage = ({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
  children,
}) => (
  <div className="bg-background pt-header pb-20">
    <Container size="narrow" className="px-6">
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-3 border-b border-border pb-10">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Display size="md">{title}</Display>
          {lastUpdated && (
            <Text size="sm" tone="subtle">
              Last updated: {lastUpdated}
            </Text>
          )}
          {intro && (
            <Text size="lg" tone="muted" className="mt-2 max-w-prose">
              {intro}
            </Text>
          )}
        </header>

        {children && <div>{children}</div>}

        {sections && (
          <ol className="flex flex-col gap-10">
            {sections.map((section, idx) => (
              <li key={section.title} className="flex flex-col gap-3">
                <Heading level={2} className="text-h3">
                  {idx + 1}. {section.title}
                </Heading>
                {section.body &&
                  (Array.isArray(section.body) ? (
                    section.body.map((paragraph, i) => (
                      <Text key={i} tone="muted" className="max-w-prose">
                        {paragraph}
                      </Text>
                    ))
                  ) : (
                    <Text tone="muted" className="max-w-prose">
                      {section.body}
                    </Text>
                  ))}
                {section.items && (
                  <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-body text-muted-foreground marker:text-primary">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </Container>
  </div>
);

PolicyPage.propTypes = {
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  lastUpdated: PropTypes.string,
  intro: PropTypes.node,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
      ]),
      items: PropTypes.arrayOf(PropTypes.node),
    }),
  ),
  children: PropTypes.node,
};
