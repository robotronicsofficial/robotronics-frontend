import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const Decription = ({ description, features }) => {
  const featureList = Array.isArray(features) ? features.filter(Boolean) : [];
  const hasFeatures = featureList.length > 0;

  return (
    <section className="bg-background py-16 md:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-10">
          <div
            className="flex flex-col items-center gap-3 text-center"
            data-aos="fade-down"
          >
            <Eyebrow>Product information</Eyebrow>
            <Heading level={2} className="text-display-md">
              Detail, delivery, and returns.
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
              data-aos="fade-up"
            >
              <Eyebrow>Description</Eyebrow>
              <Text tone="muted">{description}</Text>
            </div>
            {hasFeatures && (
              <div
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
                data-aos="fade-up"
              >
                <Eyebrow>Fits and features</Eyebrow>
                <ul className="flex flex-col gap-2">
                  {featureList.map((feature, index) => (
                    <li key={`${index}-${feature}`}>
                      <Text size="sm" tone="muted">
                        {index + 1}. {feature}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

Decription.propTypes = {
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
};

export default Decription;
