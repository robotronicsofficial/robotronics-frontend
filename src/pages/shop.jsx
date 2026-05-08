import Shopsearch from "@/components/site/shop/shopsearch";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";

const Shop = () => (
  <>
    <section className="bg-background pt-header pb-12">
      <Container size="wide">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Eyebrow>Shop</Eyebrow>
          <Display size="lg">
            Robotics kits &amp; <Highlight>build-your-own bots</Highlight>.
          </Display>
          <Text size="lg" tone="muted" className="max-w-2xl">
            Hardware that pairs with the curriculum — kits, parts, and accessories shipped to your door.
          </Text>
        </div>
      </Container>
    </section>
    <Shopsearch />
  </>
);

export default Shop;
