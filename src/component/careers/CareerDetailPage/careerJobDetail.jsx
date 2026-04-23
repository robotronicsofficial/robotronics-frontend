import { FiArrowUpRight } from "react-icons/fi";
import JobApplicationForm from "./jobApplicationForm";

const CareerJobDetail = ({ job }) => {
  const description = job?.description?.trim() || "No role description is available for this position.";
  const roleOverview = job?.roleOverview?.trim() || "No role overview is available for this position.";
  const keyResponsibilities = Array.isArray(job?.keyResponsibilities)
    ? job.keyResponsibilities.filter(Boolean)
    : [];
  const requiredSkills = Array.isArray(job?.requiredSkills)
    ? job.requiredSkills.filter(Boolean)
    : [];
  const displayTitle = job?.title || job?.position || "Open position";

  return (
    <div className="lg:px-56 px-10 bg-background">
      <h1 className="lg:text-4xl text-xl poppins-extrabold mb-4" data-aos="fade-up">
        {displayTitle}
      </h1>
      <p className="mb-4 poppins-light" data-aos="fade-up">
        {description}
      </p>

      <h2 className="text-xl poppins-bold font-bold mb-2" data-aos="fade-up">
        Role Overview:
      </h2>
      <p className="mb-4" data-aos="fade-up">
        {roleOverview}
      </p>

      <h2 className="text-xl poppins-bold mb-2" data-aos="fade-up">
        Key Responsibilities:
      </h2>
      {keyResponsibilities.length > 0 ? (
        <ul className="list-disc poppins-light list-inside mb-4" data-aos="fade-up">
          {keyResponsibilities.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 poppins-light text-brown/80">Responsibilities will be shared during the hiring process.</p>
      )}

      <h2 className="text-xl poppins-bold mb-2" data-aos="fade-up">
        Required Skills:
      </h2>
      {requiredSkills.length > 0 ? (
        <ul className="list-disc poppins-light list-inside mb-4" data-aos="fade-up">
          {requiredSkills.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 poppins-light text-brown/80">Skills requirements will be shared during the hiring process.</p>
      )}

      <div className="lg:pb-20 pb-10" data-aos="fade-up">
        <div className="lg:py-20 py-10">
          <p className="text-wrap text-brown poppins-medium lg:text-2xl text-xl mb-10">
            Jumpstart your journey with Robotronics by sending your CV and details using the form below.
          </p>
          <p className="text-wrap text-brown poppins-medium lg:text-2xl text-xl">
            We value people who bring unique perspectives and want to grow with us. We encourage applicants of all genders and backgrounds to apply.
          </p>
        </div>

        <div id="application-form" className="scroll-mt-28">
          <JobApplicationForm job={job} />
        </div>

        <div className="flex flex-row justify-between border border-smallText lg:p-10 p-5 rounded-xl">
          <p className="text-wrap text-brown poppins-medium lg:text-2xl self-center">
            Interested in this position?
          </p>
          <a
            className="bg-brown text-white poppins-medium hover:text-brown hover:bg-yellow lg:text-xl text-sm p-3 rounded-xl self-center inline-flex items-center gap-2"
            href="#application-form"
          >
            Apply Now
            <FiArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareerJobDetail;
