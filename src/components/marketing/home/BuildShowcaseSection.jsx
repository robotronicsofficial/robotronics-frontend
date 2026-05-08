import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

import { DashboardVignette } from "./visuals/DashboardVignette";
import { EditorVignette } from "./visuals/EditorVignette";
import { RobotVignette } from "./visuals/RobotVignette";

const ShowcaseCard = ({ title, description, children }) => (
  <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background">
    <div className="flex aspect-[4/3] items-center justify-center bg-secondary/40 p-6">
      {children}
    </div>
    <div className="flex flex-col gap-1.5 p-6">
      <Heading level={3} className="text-h4">
        {title}
      </Heading>
      <Text size="sm" tone="muted">
        {description}
      </Text>
    </div>
  </article>
);

ShowcaseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/* Three concrete vignettes — code typing itself out, a robot moving,
   a parent dashboard filling — directly answers the brief that asked
   for "depictions of what kids actually do" instead of more text and
   icons. Each vignette pauses when its card scrolls out of view, so
   the motion budget is paid only when the section is on screen. */
export const BuildShowcaseSection = () => (
  <section className="bg-muted/40 py-20 md:py-24">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <Eyebrow>What they build</Eyebrow>
        <Heading level={2} className="text-display-md text-balance">
          Real projects, not just videos.
        </Heading>
        <Text size="lg" tone="muted" className="text-pretty">
          Every lecture ships project code, so your kid walks away with something they can show — not just a watch-time count.
        </Text>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ShowcaseCard
          title="They write real code"
          description="Project code with every lecture. Type it, run it, see what breaks, fix it."
        >
          <EditorVignette />
        </ShowcaseCard>
        <ShowcaseCard
          title="They build moving robots"
          description="Wheels, sensors, lights — wired up and programmed by your kid, not a script."
        >
          <RobotVignette />
        </ShowcaseCard>
        <ShowcaseCard
          title="You watch progress live"
          description="Parent dashboard fills up as your kid ships projects. No mystery hours."
        >
          <DashboardVignette />
        </ShowcaseCard>
      </div>
    </Container>
  </section>
);
