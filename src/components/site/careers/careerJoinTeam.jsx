import AppImage from "../AppImage";
import { useState } from "react";
import img3 from "@/assets/images/5.webp";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getJobsErrorMessage } from "@/lib/jobs";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";

const CareerJoinTeam = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const {
    data: jobsPayload = [],
    isLoading: loading,
    error,
  } = useJobs();
  const jobs = Array.isArray(jobsPayload) ? jobsPayload : [];

  const jobSummary = (job) =>
    job.description?.trim()
      ? `${job.description.trim().slice(0, 140)}${job.description.trim().length > 140 ? "..." : ""}`
      : "Open role details available in the job description.";

  return (
    <div className="bg-background p-5 ">
      {/* text */}
      <div className="p-10">
        <p className="text-2xl poppins-bold text-foreground "data-aos="fade-up">
          Are you looking for a new career opportunity?
        </p>
        <p className="text-5xl text-foreground poppins-extrabold "data-aos="fade-up">join the A-Team!</p>
      </div>
      {/* img */}
      <div className="lg:flex flex-row p-10 gap-x-8">
        <AppImage src={img3} alt="" data-aos="fade-up" />
        <p className="text-xl text-foreground poppins-regular text-wrap py-10"data-aos="fade-up">
          The average employment period in our company is currently 4,5 years.
          Our People have the opportunity to work in a relaxed and friendly
          environment, with to industry partners on the most significant
          projects
        </p>
      </div>
      {/* jobs */}
      <div className="p-4 lg:px-14">
        {loading ? (
          <p className="poppins-regular text-foreground px-4 py-6">Loading open roles...</p>
        ) : error ? (
          <p className="poppins-regular text-destructive px-4 py-6">{getJobsErrorMessage(error)}</p>
        ) : jobs.length === 0 ? (
          <p className="poppins-regular text-foreground px-4 py-6">No open roles are available right now.</p>
        ) : (
          jobs.map((job, index) => (
            <article
              key={job._id}
              className="group relative flex flex-col gap-4 mb-6 border-b border-border p-4 pr-10 md:pr-16 justify-between cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate({ to: `/CareerDetailPage/${job._id}` })}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate({ to: `/CareerDetailPage/${job._id}` });
                }
              }}
            >
              {hoveredIndex === index && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-foreground bg-card p-3 hover:bg-foreground hover:text-background"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate({ to: `/CareerDetailPage/${job._id}` });
                  }}
                  aria-label={`View ${job.position || job.title}`}
                >
                  <ArrowUpRight />
                </Button>
              )}

              <div className="grid gap-4 md:grid-cols-3" data-aos="fade-up">
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Position</p>
                  <p className="poppins-bold text-xl text-foreground">{job.position || job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.title}</p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Experience</p>
                  <p className="poppins-regular text-foreground">{job.experience}</p>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                  <p className="poppins-regular text-foreground">{job.location}</p>
                </div>
              </div>
              <p className="max-w-3xl text-sm md:text-base text-foreground/80 poppins-light">
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
