import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";
import Body from "@/components/site/international/videoGallery/body";

const HeroSection = () => (
  <section className="bg-background pt-header pb-12">
    <Container size="wide">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <Eyebrow>Events &amp; workshops</Eyebrow>
        <Display size="lg">
          Watch what kids are <Highlight>actually building</Highlight>.
        </Display>
        <Text size="lg" tone="muted" className="max-w-2xl">
          Highlights from competitions, robotics workshops, school visits, and summer camps across the Robotronics network.
        </Text>
      </div>
    </Container>
  </section>
);

const VideoGallery = () => (
  <>
    <HeroSection />
    <Body />
  </>
);

export default VideoGallery;
