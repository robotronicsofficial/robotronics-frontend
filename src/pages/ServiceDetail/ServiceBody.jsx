import PropTypes from "prop-types";
import { CheckCircle2, Compass, Sparkles, Users } from "lucide-react";

import robo from "@/assets/imagesContent/servicedetailbanner/robo.png";
import AppImage from "@/components/site/AppImage";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

const DIFFERENTIATORS = [
  {
    icon: Sparkles,
    title: "Real builds, not just slides",
    description:
      "Every session ends with something kids can show off — code that runs, robots that move, projects they own.",
  },
  {
    icon: Compass,
    title: "A curriculum that grows with them",
    description:
      "From their first blinking LED to autonomous robots, the path scales with curiosity and skill — never with age alone.",
  },
  {
    icon: Users,
    title: "Mentors who love this stuff",
    description:
      "Small groups led by builders, not lecturers. Kids get attention, feedback, and the room to ask anything.",
  },
];

const OverviewSection = ({ service, sideImage }) => {
  const goodAtItems = Array.isArray(service?.whatWeAreGoodAt)
    ? service.whatWeAreGoodAt
    : [];

  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Eyebrow>Overview</Eyebrow>
              <Heading level={2} className="text-display-md">
                {service?.title || "What this program covers."}
              </Heading>
              <Text size="lg" tone="muted">
                {service?.overview || "Overview coming soon."}
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <Eyebrow>What we&apos;re good at</Eyebrow>
              {goodAtItems.length > 0 ? (
                <ul className="flex flex-col gap-3">
                  {goodAtItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"
                      >
                        <CheckCircle2 className="size-4" />
                      </span>
                      <Text size="sm" className="leading-relaxed">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text tone="muted">No details available yet.</Text>
              )}
            </div>
          </div>

          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card">
            <AppImage
              src={sideImage}
              alt={service?.name ? `${service.name} in action` : "Service in action"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

OverviewSection.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    name: PropTypes.string,
    whatWeAreGoodAt: PropTypes.arrayOf(PropTypes.string),
  }),
  sideImage: PropTypes.string.isRequired,
};

const DifferenceSection = ({ service }) => (
  <section className="bg-background py-20 md:py-28">
    <Container size="wide" className="flex flex-col gap-12">
      <div className="flex max-w-3xl flex-col gap-4">
        <Eyebrow>Why Robotronics</Eyebrow>
        <Heading level={2} className="text-display-md">
          What makes {service?.name ? `${service.name} at Robotronics` : "Robotronics"} different.
        </Heading>
        <Text size="lg" tone="muted">
          Kids build real robots and write real code with mentors who love this stuff. Small groups, hands-on projects, and a curriculum that grows with your child from their first blinking LED to autonomous robots they can show off at home.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
          >
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-lg bg-primary-soft text-primary"
            >
              <Icon className="size-5" />
            </span>
            <Heading level={3} className="text-h4">
              {title}
            </Heading>
            <Text size="sm" tone="muted">
              {description}
            </Text>
          </div>
        ))}
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted/40">
        <AppImage
          src={robo}
          alt="Kids building a robot at Robotronics"
          className="h-full w-full object-contain"
        />
      </div>
    </Container>
  </section>
);

DifferenceSection.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const ServiceBody = ({ service }) => {
  const sideImage = resolveBackendAssetUrl(service?.sideImage, robo);

  return (
    <>
      <OverviewSection service={service} sideImage={sideImage} />
      <DifferenceSection service={service} />
    </>
  );
};

ServiceBody.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    sideImage: PropTypes.string,
    whatWeAreGoodAt: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ServiceBody;
