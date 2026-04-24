import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import WorkshopCard from "./WorkshopCard";
import Pagination from "../../blog/Pagination";

import { BACKEND_BASE_URL } from "../../../lib/api";
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
  <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-6 mb-6">
    <div className="w-full md:w-1/4">
      <label className="block text-brown poppins-medium mb-2">Date</label>
      <input
        type="date"
        className="w-full p-2 border border-gray rounded"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
    <div className="w-full md:w-1/4">
      <label className="block text-brown poppins-medium mb-2">
        School Name
      </label>
      <input
        type="text"
        className="w-full p-2 border border-gray rounded"
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}
      />
    </div>
    <div className="w-full md:w-1/4">
      <label className="block text-brown poppins-medium mb-2">
        Select City
      </label>
      <select
        className="w-full p-2 border border-gray rounded"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">City</option>
        {[
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
        ].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
    <div className="w-full md:w-1/4">
      <label className="block text-brown poppins-medium mb-2">Sort by</label>
      <select
        className="w-full p-2 border border-gray rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Date">Date</option>
      </select>
    </div>
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
  const [workshopsData, setWorkshopsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/allVideoGallery`);
        if (!response.ok) {
          throw new Error("Failed to fetch services data");
        }
        const data = await response.json();
        setWorkshopsData(data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

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
          (!workshopDate || Number.isNaN(workshopDate.getTime()) || workshopDate.toISOString().split("T")[0] !== selectedDate)
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
        if (sortBy === "Date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "Popularity") {
          return b.popularity - a.popularity;
        }
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
    indexOfLastWorkshop
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray p-14">
      <div className="flex flex-wrap md:flex-nowrap gap-8 md:space-x-6">
        <aside className="p-8 w-[22vw] overflow-hidden">
          <h2
            className="font-bold text-3xl poppins-bold text-brown mb-4 cursor-pointer"
            onClick={() => {
              setSelectedCategory("");
              setSelectedDate("");
              setSelectedSchool("");
              setSelectedCity("");
              setSortBy("");
              navigate("/International/videoGallery");
            }}
          >
            Activities
          </h2>
          <h2 className="border border-brown w-1/3 h-2 rounded-md bg-brown mb-4"></h2>

          {/* this will show all the activities filter */}
          {/* <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer poppins-light lg:text-base text-sm lg:pt-5 pt-2 transition-colors duration-300 ${
                  selectedCategory === category.trim().toLowerCase()
                    ? "font-semibold text-[#e06f21]"
                    : "text-gray-600 hover:text-gray-400"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul> */}

          {/* this filter will only show those activity filters who are having data in them */}
          <ul className="space-y-2">
            {categories
              .filter((category) =>
                workshopsData.some(
                  (workshop) =>
                    workshop.activity &&
                    workshop.activity.trim().toLowerCase() ===
                      category.trim().toLowerCase()
                )
              )
              .map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer poppins-light lg:text-base text-sm lg:pt-5 pt-2 transition-colors duration-300 ${
                    selectedCategory === category.trim().toLowerCase()
                      ? "font-semibold text-[#e06f21]"
                      : "text-gray-600 hover:text-gray-400"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
          </ul>
        </aside>
        <main className="w-full md:w-3/4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
            {currentWorkshops.map((workshop) => (
              <WorkshopCard key={workshop._id} workshop={workshop} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredWorkshops.length / workshopsPerPage)}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default Intro;
