import { useState } from "react";
import { Search } from "lucide-react";

import CourseProduct from "../course/courseProduct";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCourses } from "@/hooks/useCourses";

const COURSE_FILTERS = [
  { label: "All", value: "" },
  { label: "Lego WeDo 2.0", value: "Lego WeDo 2.0" },
  { label: "Lego Mindstorms EV3", value: "Lego Mindstorms EV3" },
  { label: "Arduino based Robots", value: "Arduino based Robots" },
];

const ShopCoursesIntro = () => {
  const { data: courses = [] } = useCourses();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) => {
    if (selectedFilter && course.category !== selectedFilter) return false;
    if (searchTerm) {
      const haystack = `${course.title || ""} ${course.description || ""}`.toLowerCase();
      if (!haystack.includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <section className="bg-background py-12">
      <Container size="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3" data-aos="fade-up">
          <Eyebrow>Catalog</Eyebrow>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Text size="lg" weight="semibold" className="text-h3">
              Courses
            </Text>
            <div className="relative w-full sm:max-w-sm">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search for courses"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)]" data-aos="fade-up">
          <aside className="flex flex-col gap-1">
            {COURSE_FILTERS.map((filter) => {
              const isActive = selectedFilter === filter.value;
              return (
                <Button
                  key={filter.value || "all"}
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={cn(
                    "h-auto justify-start rounded-lg px-3 py-2 text-left text-body-sm",
                    isActive
                      ? "bg-primary-soft font-semibold text-primary hover:bg-primary-soft"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {filter.label}
                </Button>
              );
            })}
          </aside>

          <div>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseProduct
                    key={course?._id}
                    id={course?._id}
                    title={course?.title}
                    description={course?.description}
                    image={course?.thumbnail}
                    price={course?.price}
                    category={course?.category}
                    duration={course?.month}
                  />
                ))}
              </div>
            ) : (
              <Text tone="muted">No courses match your filters.</Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShopCoursesIntro;
