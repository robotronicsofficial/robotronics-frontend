import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Highlight, Text } from "@/components/ui/typography";
import { SectionInverse } from "@/components/layout/SectionInverse";

export const FinalCTASection = () => (
  <SectionInverse className="py-24 md:py-32">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
        <Heading level={2} tone="inverted" className="text-display-lg">
          Turn screen time into <Highlight>skill time</Highlight>.
        </Heading>
        <Text size="lg" className="text-background/75">
          AI, Coding, Robotics — all in one simple subscription. Start your child today.
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="marketingLg">
            <Link to="/subscriptions">Start Learning Now</Link>
          </Button>
          <Button
            asChild
            size="marketingLg"
            variant="ghost"
            className="text-background hover:bg-background/10 hover:text-background"
          >
            <Link to="/contactUs">Talk to schools team</Link>
          </Button>
        </div>
      </div>
    </Container>
  </SectionInverse>
);
