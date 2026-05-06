import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Code2,
  Gamepad2,
  MessageSquare,
  Rocket,
  Wand2,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

/* Concrete project list — each line is something a kid actually walks away
   with. Keeps the rail honest: no abstract "AI mentor" claims, just things
   you can point at on a Saturday. */
const PROJECTS = [
  { icon: Bot, label: "Light-following robot" },
  { icon: Code2, label: "Multiplayer browser game" },
  { icon: BrainCircuit, label: "AI homework helper" },
  { icon: Gamepad2, label: "Pong, with twists" },
  { icon: BarChart3, label: "Live weather dashboard" },
  { icon: MessageSquare, label: "Chatbot in 30 lines" },
  { icon: Rocket, label: "Planet-orbit simulator" },
  { icon: Wand2, label: "Camera filter that paints you" },
];

const Tile = ({ icon: Icon, label }) => (
  <li className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
    <Icon aria-hidden="true" className="size-5 text-primary" />
    <span className="whitespace-nowrap text-body-sm font-medium text-foreground">
      {label}
    </span>
  </li>
);

Tile.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

/* Continuous rail of project tiles. Same marquee math as LogoMarquee:
   render the set twice and slide -50% so the seam never shows. Slower
   speed than the logo strip so the eye actually catches each label. */
export const BuildShowcaseSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const items = [...PROJECTS, ...PROJECTS];

  return (
    <section className="bg-background py-20 md:py-24">
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
      </Container>

      <div className="relative isolate mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <motion.ul
          className="flex w-max items-center gap-4 py-2"
          initial={{ x: "0%" }}
          animate={prefersReducedMotion ? { x: "0%" } : { x: "-50%" }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { ease: "linear", duration: 55, repeat: Infinity }
          }
          style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
          aria-hidden={!prefersReducedMotion}
        >
          {items.map((project, index) => (
            <Tile key={`${project.label}-${index}`} {...project} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
