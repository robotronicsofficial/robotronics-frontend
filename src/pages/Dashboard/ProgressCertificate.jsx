import Intro from "@/components/site/dashboard/intro";
import SubscriptionProgressCertificate from "@/components/site/dashboard/SubscriptionProgressCertificate";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const ProgressCertificate = () => {
  return (
    <div className="bg-background">
      <Container size="wide">
        <Intro />
      </Container>
      <section className="bg-background pb-12 md:pb-16">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <Eyebrow>Learning</Eyebrow>
            <Heading level={1} className="text-display-md">
              Progress &amp; certificates
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Pick a child profile to view their course progress and earned certificates.
            </Text>
          </div>
        </Container>
      </section>
      <SubscriptionProgressCertificate />
    </div>
  );
};

export default ProgressCertificate;
