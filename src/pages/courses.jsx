import { useMemo, useState } from "react";

import CourseProduct from "@/components/site/course/courseProduct";
import MarketingHero from "@/components/marketing/MarketingHero";
import { Container } from "@/components/ui/container";
import { Display, Highlight, Text } from "@/components/ui/typography";
import { useCourseCategories, useCourses } from "@/hooks/useCourses";
import { cn } from "@/lib/utils";

const FilterChip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "inline-flex h-9 items-center rounded-full border px-4 text-body-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground",
    )}
  >
    {children}
  </button>
);

const Courses = () => {
  const { data: courses = [], isLoading } = useCourses();
  const { data: courseCategories = [] } = useCourseCategories();
  const [filter, setFilter] = useState("");

  const filters = useMemo(
    () => [
      { label: "All", value: "" },
      ...courseCategories.map((category) => ({ label: category, value: category })),
    ],
    [courseCategories],
  );

  const visibleCourses = useMemo(
    () => (filter ? courses.filter((c) => c.category === filter) : courses),
    [courses, filter],
  );

  return (
    <>
      <MarketingHero
        size="page"
        eyebrow="Courses"
        title={
          <Display size="md">
            Pick a track. <Highlight>Build something real.</Highlight>
          </Display>
        }
        subtitle="30+ structured courses across AI, coding, robotics, and entrepreneurship — every one of them ships with project code so kids actually build."
      />

      <section className="bg-background pb-24">
        <Container size="wide">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((option) => (
              <FilterChip
                key={option.value}
                active={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </div>

          {isLoading ? (
            <Text tone="muted" className="mt-12 text-center">
              Loading courses…
            </Text>
          ) : visibleCourses.length === 0 ? (
            <Text tone="muted" className="mt-12 text-center">
              No courses in this category yet — try another filter.
            </Text>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleCourses.map((course) => (
                <CourseProduct
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  image={course.thumbnail}
                  price={course.price}
                  duration={course.month}
                  category={course.category}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Courses;
