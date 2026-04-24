import logo from "../../../assets/logo/Robotrinic.svg";
import { ArrowLeft, Menu } from "lucide-react";
import PropTypes from "prop-types";
import { BrandIcon } from "../../../components/ui/brand-icons";
import AppImage from "../../AppImage";
import bar from "../../../assets/images/shopSurface.webp";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Careerintro = ({ job }) => {
  const navigate = useNavigate();
  const displayPosition = job?.position || job?.title || "Open position";
  const displayLocation = job?.location || "Remote / Lahore";
  const displayCategory = job?.experience || "Career opportunity";
  const displayDate = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently posted";

  return (
    <div className="bg-background">
      {/* upper */}
      <div className=" lg:p-10 p-5 lg:py-14">
        {/* upper */}
        <div className="flex flex-row justify-between items-center ">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-aos="fade-up">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <h1 className=" poppins-bold text-xs">
              ROBOTRONICS
              <br />
              <p className="text-xs poppins-bold text-primary  ">P A K I S T A N</p>
            </h1>
          </Link>
          {/* button */}
          <Button type="button" variant="secondary" size="icon" className="size-12 rounded-full border border-border bg-muted" data-aos="fade-up">
            <Menu className="text-muted-foreground" size={24} />
          </Button>
        </div>
        {/* lower */}
        <div className="lg:flex flex-row justify-between lg:p-10 p-5 lg:gap-y-0 gap-y-10 items-center">
          {/* button */}
          <div className="flex flex-row items-center" data-aos="fade-up">
            <Button
              type="button"
              onClick={() => navigate("/CareerJob")}
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full border border-border bg-muted lg:h-12 lg:w-12"
            >
              <ArrowLeft className="text-muted-foreground" size={24} />
            </Button>
            <p className="lg:p-3 poppins-regular p-1">Back</p>
          </div>
          {/* social icons */}
          <div className="flex flex-row justify-between lg:gap-x-5 gap-x-2" data-aos="fade-up">
            <p className="text-center poppins-regular pt-2">Share</p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="facebook" className="text-muted-foreground" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="twitter" className="text-muted-foreground" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="youtube" className="text-muted-foreground" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="instagram" className="text-muted-foreground" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="linkedin" className="text-muted-foreground" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:p-3 p-1 border border-foreground rounded-xl hover:bg-foreground hover:text-background"
            >
              <BrandIcon brand="whatsapp" className="text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>

      {/* lower */}
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-muted p-5 rounded-xl mx-5" data-aos="fade-up">
          <h2 className="lg:text-5xl poppins-bold text-3xl text-foreground mb-5 text-center">
            {displayPosition}
          </h2>
          <div className="relative py-5 lg:py-24 w-full">
            <AppImage
              src={bar}
              alt="Career details background"
              className="w-full rounded-xl"
              loading="eager"
            />
            <div className="absolute inset-0 flex flex-row justify-around items-center text-background">
              <div className="text-center">
                <p className="poppins-bold text-xs">Date</p>
                <p className="text-xs poppins-extralight ">{displayDate}</p>
              </div>
              <div className="text-center">
                <p className="poppins-bold text-xs">Category</p>
                <p className="text-xs poppins-extralight ">{displayCategory}</p>
              </div>
              <div className="text-center">
                <p className="poppins-bold text-xs">Location</p>
                <p className="text-xs poppins-extralight ">{displayLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Careerintro.propTypes = {
  job: PropTypes.shape({
    position: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    experience: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

export default Careerintro;
