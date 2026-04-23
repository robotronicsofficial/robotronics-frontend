import AppImage from "../AppImage";
import { useEffect, useState } from "react";
import img3 from "../../assets/images/5.webp";
import { FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { fetchJobs, getJobsErrorMessage } from "../../lib/jobs";

const CareerJoinTeam = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await fetchJobs();

        if (active) {
          setJobs(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (fetchError) {
        if (active) {
          setJobs([]);
          setError(getJobsErrorMessage(fetchError));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      active = false;
    };
  }, []);

  const jobSummary = (job) =>
    job.description?.trim()
      ? `${job.description.trim().slice(0, 140)}${job.description.trim().length > 140 ? "..." : ""}`
      : "Open role details available in the job description.";

  return (
    <div className="bg-gray p-5 ">
      {/* text */}
      <div className="p-10">
        <p className="text-2xl poppins-bold text-brown "data-aos="fade-up">
          Are you looking for a new career opportunity?
        </p>
        <p className="text-5xl text-brown poppins-extrabold "data-aos="fade-up">join the A-Team!</p>
      </div>
      {/* img */}
      <div className="lg:flex flex-row p-10 space-x-8">
        <AppImage src={img3} alt="" data-aos="fade-up" />
        <p className="text-xl text-brown poppins-regular text-wrap py-10"data-aos="fade-up">
          The average employment period in our company is currently 4,5 years.
          Our People have the opportunity to work in a relaxed and friendly
          environment, with to industry partners on the most significant
          projects
        </p>
      </div>
      {/* jobs */}
      <div className="p-4 lg:px-14">
        {loading ? (
          <p className="poppins-regular text-brown px-4 py-6">Loading open roles...</p>
        ) : error ? (
          <p className="poppins-regular text-red-600 px-4 py-6">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="poppins-regular text-brown px-4 py-6">No open roles are available right now.</p>
        ) : (
          jobs.map((job, index) => (
            <article
              key={job._id}
              className="group relative flex flex-col gap-4 mb-6 border-b border-line p-4 pr-10 md:pr-16 justify-between cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/CareerDetailPage/${job._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/CareerDetailPage/${job._id}`);
                }
              }}
            >
              {hoveredIndex === index && (
                <button
                  type="button"
                  className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 border border-brown p-3 bg-white rounded-full hover:bg-brown hover:text-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/CareerDetailPage/${job._id}`);
                  }}
                  aria-label={`View ${job.position || job.title}`}
                >
                  <FiArrowUpRight />
                </button>
              )}

              <div className="grid gap-4 md:grid-cols-3" data-aos="fade-up">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-smallText">Position</p>
                  <p className="poppins-bold text-xl text-brown">{job.position || job.title}</p>
                  <p className="text-sm text-smallText">{job.title}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-smallText">Experience</p>
                  <p className="poppins-regular text-brown">{job.experience}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-smallText">Location</p>
                  <p className="poppins-regular text-brown">{job.location}</p>
                </div>
              </div>
              <p className="max-w-3xl text-sm md:text-base text-brown/80 poppins-light">
                {jobSummary(job)}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default CareerJoinTeam;
