import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const Decription = ({ description, features }) => {
  const featureList = Array.isArray(features) ? features.filter(Boolean) : [];
  const hasFeatures = featureList.length > 0;

  return (
    <section className="bg-background py-14">
      <Container size="wide" className="flex flex-col gap-10">
        <div className="flex items-center justify-center gap-6" data-aos="fade-down">
          <Heading level={2} className="text-h3">Product detail</Heading>
          <span aria-hidden="true" className="block h-6 w-px bg-border" />
          <Heading level={2} className="text-h3">Delivery and return</Heading>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3" data-aos="fade-up">
            <Eyebrow>Description</Eyebrow>
            <Text tone="muted">{description}</Text>
          </div>
          {hasFeatures && (
            <div className="flex flex-col gap-3" data-aos="fade-up">
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
      </Container>
    </section>
  );
};

Decription.propTypes = {
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
};

export default Decription;
