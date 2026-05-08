import Intro from "@/components/site/dashboard/intro";
import SubscriptionChildProfile from "@/components/site/dashboard/SubscriptionChildProfile";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const ChildProfile = () => {
  return (
    <div className="bg-background">
      <Container size="wide">
        <Intro />
      </Container>
      <section className="bg-background pb-12 md:pb-16">
        <Container size="wide">
          <div className="flex flex-col gap-3">
            <Eyebrow>Family</Eyebrow>
            <Heading level={1} className="text-display-md">
              Child accounts
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Manage logins and PINs for the kids on your subscription. Each child gets their own learning dashboard once a PIN is set.
            </Text>
          </div>
        </Container>
      </section>
      <SubscriptionChildProfile />
    </div>
  );
};

export default ChildProfile;
