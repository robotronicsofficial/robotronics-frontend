import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Award, Clock, Layers, Sparkles } from "lucide-react";

import AppImage from "@/components/site/AppImage";
import python from "@/assets/images/python.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Heading,
  Text,
} from "@/components/ui/typography";
import { createCourseCommerceItem } from "@/lib/commerceItems";
import { useCourse } from "../../hooks/useCourses";
import { useCartStore } from "@/stores/cartStore";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { formatPKR } from "@/utils/formatPrice";

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "AI-guided learning",
    description: "An AI mentor walks every lesson with the student.",
  },
  {
    icon: Layers,
    title: "Project-based",
    description: "Real project code ships with every module.",
  },
  {
    icon: Award,
    title: "Certificate on completion",
    description: "Internationally recognized e-certificate at the end.",
  },
];

const CoursesProductDetail = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: course, isLoading, error } = useCourse(id);

  const handleGiftCourse = () => {
    if (!course) return;
    const item = createCourseCommerceItem({
      _id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      price: course.price,
      category: course.category,
    });
    if (item) addToCart(item);
    navigate({ to: "/gift-courses" });
  };

  if (isLoading) {
    return (
      <div className="bg-background pt-header pb-20">
        <Container size="wide">
          <Text tone="muted" className="text-center">
            Loading course…
          </Text>
        </Container>
      </div>
    );
  }

  if (!id || error || !course) {
    return (
      <div className="bg-background pt-header pb-20">
        <Container size="wide">
          <Text tone="muted" className="text-center text-destructive">
            We couldn&apos;t load this course right now.
          </Text>
        </Container>
      </div>
    );
  }

  return (
    <>
      <section className="bg-background pt-header pb-16 md:pb-20">
        <Container size="wide">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-5">
              {course.category && <Eyebrow>{course.category}</Eyebrow>}
              <Display size="md">{course.title}</Display>
              {course.description && (
                <Text size="lg" tone="muted" className="max-w-prose">
                  {course.description}
                </Text>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {course.month && (
                  <Badge variant="outline" className="gap-1.5">
                    <Clock className="size-3" />
                    {course.month}
                  </Badge>
                )}
                {course.price != null && (
                  <Badge variant="outline" className="font-semibold">
                    {formatPKR(course.price)}
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="marketing">
                  <Link to="/subscriptions">Subscribe to learn</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="marketing"
                  onClick={handleGiftCourse}
                >
                  Gift this course
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border bg-muted">
                <AppImage
                  src={resolveBackendAssetUrl(course.thumbnail, python)}
                  alt={course.title}
                  className="size-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-20">
        <Container size="wide">
          <div className="flex max-w-2xl flex-col gap-3">
            <Eyebrow>What&apos;s included</Eyebrow>
            <Heading level={2} className="text-display-md">
              Built to actually stick.
            </Heading>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
              >
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary"
                >
                  <Icon className="size-5" />
                </span>
                <Heading level={3} className="text-h5">
                  {title}
                </Heading>
                <Text size="sm" tone="muted">
                  {description}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-20">
        <Container size="wide">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <Heading level={2} className="text-display-md">
              Ready to start learning?
            </Heading>
            <Text tone="muted" className="max-w-xl">
              One subscription unlocks this course and 30+ others. Cancel anytime — no calls, no forms.
            </Text>
            <Button asChild size="marketingLg">
              <Link to="/subscriptions">View plans</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CoursesProductDetail;
