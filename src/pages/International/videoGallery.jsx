import { Display, Highlight } from "@/components/ui/typography";
import MarketingHero from "@/components/marketing/MarketingHero";
import Body from "@/components/site/international/videoGallery/body";

const HeroSection = () => (
  <MarketingHero
    size="page"
    eyebrow="Events & workshops"
    title={
      <Display size="md">
        Watch what kids are <Highlight>actually building</Highlight>.
      </Display>
    }
    subtitle="Highlights from competitions, robotics workshops, school visits, and summer camps across the Robotronics network."
  />
);

const VideoGallery = () => (
  <>
    <HeroSection />
    <Body />
  </>
);

export default VideoGallery;
