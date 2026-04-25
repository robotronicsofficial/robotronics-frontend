import { ArrowUpRight } from "lucide-react";
// import { useNavigate } from "@tanstack/react-router";
import { BrandIcon } from "@/components/ui/brand-icons";
import { useNavigate } from "@tanstack/react-router"; // Assuming React Router is used
import { getAosStaggerDelay } from "@/utils/motion";
import { Button } from "@/components/ui/button";

const CareesFindRole = () => {
  const navigate = useNavigate();

  const handleSendResume = () => {
    // Navigate to the job application form
    navigate({ to: "/JobApplicationForm" }); // Use the path to your job application form
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:p-10 p-5 lg:px-20 gap-y-10 lg:gap-y-0">
      {/* Left Section: Text and Buttons */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-10">
        <p
          className="text-wrap font-light text-foreground text-5xl lg:text-7xl mb-10"
          data-aos="fade-up"

        >
          Can't find a role <br />
          for you?
        </p>
        <div
          className="flex gap-x-5"
          data-aos="fade-up"

        >
          <Button
            type="button"
            onClick={handleSendResume}
            className="h-auto rounded-full bg-foreground px-6 py-3 font-light text-background hover:bg-foreground/90 lg:text-2xl"
          >
            Send Your Resume
          </Button>
          <Button type="button" variant="outline" size="icon" className="h-auto rounded-full border-foreground bg-card px-4 py-3 text-foreground hover:bg-foreground hover:text-background">
            <ArrowUpRight size={24} />
          </Button>
        </div>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex flex-row lg:flex-col justify-center lg:justify-between items-center gap-x-5 lg:gap-x-0 lg:gap-y-5">
        {[
          { href: "https://www.facebook.com", brand: "facebook" },
          { href: "https://www.twitter.com", brand: "twitter" },
          { href: "https://www.youtube.com", brand: "youtube" },
          { href: "https://www.instagram.com", brand: "instagram" },
          { href: "https://www.linkedin.com", brand: "linkedin" },
          {
            href: "https://api.whatsapp.com/send?phone=1234567890",
            brand: "whatsapp",
          },
        ].map(({ href, brand }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-foreground rounded-xl hover:bg-foreground hover:text-background transition transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={getAosStaggerDelay(index)}
          >
            <BrandIcon brand={brand} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CareesFindRole;
