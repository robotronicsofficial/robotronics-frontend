import Intro from "@/components/site/dashboard/intro";
import WishListD from "@/components/site/dashboard/wishList";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const WishList = () => {
  return (
    <div className="bg-background">
      <Container size="wide">
        <Intro />
      </Container>
      <section className="bg-background pb-12 md:pb-16">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <Eyebrow>Saved for later</Eyebrow>
            <Heading level={1} className="text-display-md">
              Wishlist
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Items you bookmarked from the live catalog. Compare them side-by-side, then move them to the cart when you&apos;re ready.
            </Text>
          </div>
        </Container>
      </section>
      <WishListD />
    </div>
  );
};

export default WishList;
