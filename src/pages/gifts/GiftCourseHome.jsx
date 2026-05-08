import GiftCourseBody from "./GiftCourseBody";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";

const GiftCourseHome = () => (
  <>
    <section className="relative isolate overflow-hidden bg-background pt-header pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-25 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)",
          }}
        />
      </div>
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>For someone special</Eyebrow>
          <Display size="md">Gift a course.</Display>
          <Text size="lg" tone="muted" className="max-w-prose">
            Send any course as a gift. We&apos;ll deliver it to their inbox on
            the date you choose.
          </Text>
        </div>
      </Container>
    </section>
    <section className="bg-muted/40 pb-20 pt-12 md:pb-28">
      <GiftCourseBody />
    </section>
  </>
);

export default GiftCourseHome;
