import Intro from "@/components/site/dashboard/intro";
import MyCourses from "@/components/site/dashboard/myCourses";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const MyCoursesPage = () => {
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
              My courses
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Continue where you left off.
            </Text>
          </div>
        </Container>
      </section>
      <MyCourses />
    </div>
  );
};

export default MyCoursesPage;
