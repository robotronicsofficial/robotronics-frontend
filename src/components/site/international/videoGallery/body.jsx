import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { FormInput, FormSelect } from "@/components/forms/FormControls";
import { cn } from "@/lib/utils";
import { useVideoGallery } from "@/hooks/useVideoGallery";
import WorkshopCard from "./WorkshopCard";
import Pagination from "../../blog/Pagination";

const categories = [
  "Subscription Courses",
  "Robotics Workshops",
  "Skill Development Workshops",
  "IVY Club",
  "Robotronics Subject Implementation",
  "Curriculum Preparation",
  "Providing Robotics & STEM Trainer",
  "After-School Robotic Club",
  "Robotic Labs",
  "Summer/Winter Camps",
  "Online Courses",
  "Robotic Competitions",
];

const cityOptions = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Kahror Pakka",
].map((city) => ({ value: city, label: city }));

const Filters = ({
  selectedDate,
  setSelectedDate,
  selectedSchool,
  setSelectedSchool,
  selectedCity,
  setSelectedCity,
  sortBy,
  setSortBy,
}) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <FormInput
      label="Date"
      name="selectedDate"
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
    <FormInput
      label="School name"
      name="selectedSchool"
      value={selectedSchool}
      onChange={(e) => setSelectedSchool(e.target.value)}
      placeholder="Search by school"
    />
    <FormSelect
      label="City"
      name="selectedCity"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      options={cityOptions}
      placeholder="All cities"
    />
    <FormSelect
      label="Sort by"
      name="sortBy"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      options={[
        { value: "Date", label: "Date" },
        { value: "Videos", label: "Videos" },
      ]}
    />
  </div>
);

const Intro = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const workshopsPerPage = 12;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("Videos");
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    data: workshopsData = [],
    isLoading: loading,
    error,
  } = useVideoGallery();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.trim().toLowerCase());
  };

  const filteredWorkshops = useMemo(() => {
    return workshopsData
      .filter((workshop) => {
        const workshopActivity = workshop.activity
          ? workshop.activity.trim().toLowerCase()
          : "";
        const selectedCategoryFormatted = selectedCategory
          ? selectedCategory.trim().toLowerCase()
          : "";
        const workshopDate = workshop.date ? new Date(workshop.date) : null;

        if (
          selectedDate &&
          (!workshopDate ||
            Number.isNaN(workshopDate.getTime()) ||
            workshopDate.toISOString().split("T")[0] !== selectedDate)
        )
          return false;
        if (
          selectedSchool &&
          !workshop.schoolName?.toLowerCase().includes(selectedSchool.toLowerCase())
        )
          return false;
        if (selectedCity && workshop.city !== selectedCity) return false;
        if (
          selectedCategoryFormatted &&
          workshopActivity !== selectedCategoryFormatted
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Date") return new Date(a.date) - new Date(b.date);
        if (sortBy === "Popularity") return b.popularity - a.popularity;
        return 0;
      });
  }, [
    selectedDate,
    selectedSchool,
    selectedCity,
    sortBy,
    selectedCategory,
    workshopsData,
  ]);

  const indexOfLastWorkshop = currentPage * workshopsPerPage;
  const currentWorkshops = filteredWorkshops.slice(
    indexOfLastWorkshop - workshopsPerPage,
    indexOfLastWorkshop,
  );

  const availableCategories = categories.filter((category) =>
    workshopsData.some(
      (workshop) =>
        workshop.activity &&
        workshop.activity.trim().toLowerCase() === category.trim().toLowerCase(),
    ),
  );

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedDate("");
    setSelectedSchool("");
    setSelectedCity("");
    setSortBy("Videos");
    navigate({ to: "/International/videoGallery" });
  };

  if (loading) {
    return (
      <Container size="wide" className="py-16">
        <Text tone="muted">Loading…</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="wide" className="py-16">
        <Text className="text-destructive">
          We couldn&apos;t load the video gallery right now.
        </Text>
      </Container>
    );
  }

  return (
    <section className="bg-background py-12">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4">
            <button
              type="button"
              onClick={resetFilters}
              className="text-left text-h4 font-semibold text-foreground hover:text-primary"
            >
              Activities
            </button>
            <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-primary" />

            <ul className="flex flex-col gap-1">
              {availableCategories.map((category) => {
                const normalized = category.trim().toLowerCase();
                const isActive = selectedCategory === normalized;
                return (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category)}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2 text-left text-body-sm transition-colors",
                        isActive
                          ? "bg-primary-soft font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <main className="flex flex-col gap-6">
            <Filters
              {...{
                selectedDate,
                setSelectedDate,
                selectedSchool,
                setSelectedSchool,
                selectedCity,
                setSelectedCity,
                sortBy,
                setSortBy,
              }}
            />

            {currentWorkshops.length === 0 ? (
              <Text tone="muted">No workshops match your filters.</Text>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentWorkshops.map((workshop) => (
                  <WorkshopCard key={workshop._id} workshop={workshop} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredWorkshops.length / workshopsPerPage)}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </Container>
    </section>
  );
};

export default Intro;
