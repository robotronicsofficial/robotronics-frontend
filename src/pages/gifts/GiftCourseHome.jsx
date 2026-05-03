import GiftCourseBody from "./GiftCourseBody";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";

const GiftCourseHome = () => (
  <div className="bg-background">
    <section className="bg-background pt-header pb-10">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>For someone special</Eyebrow>
          <Display size="md">Gift a course.</Display>
          <Text tone="muted" className="max-w-prose">
            Send any course as a gift. We&apos;ll deliver it to their inbox on the date you choose.
          </Text>
        </div>
      </Container>
    </section>
    <GiftCourseBody />
  </div>
);

export default GiftCourseHome;
