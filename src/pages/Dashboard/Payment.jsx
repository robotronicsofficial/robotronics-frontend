import Intro from "@/components/site/dashboard/intro";
import Payhistory from "@/components/site/dashboard/Payhistory";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const Payment = () => {
  return (
    <div className="bg-background">
      <Container size="wide">
        <Intro />
      </Container>
      <section className="bg-background pb-12 md:pb-16">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <Eyebrow>Billing</Eyebrow>
            <Heading level={1} className="text-display-md">
              Payment history
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Review your subscription receipts and one-time purchases. New payments appear within a few minutes after completion.
            </Text>
          </div>
        </Container>
      </section>
      <Payhistory />
    </div>
  );
};

export default Payment;
