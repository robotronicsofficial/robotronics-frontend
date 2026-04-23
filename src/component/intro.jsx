import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Robort from "../assets/images/heroRobot.webp";
import AppImage from "./AppImage";
import { getAosStaggerDelay } from "../utils/motion";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero" id="hero">
        <div className="space-y-5 -top-10">
          <div className="flex justify-between w-full py-16 md:px-20 px-14 ">
            {/* text */}
            <div className="flex flex-col justify-center space-y-5 mt-24 md:mt-32 md:w-1/2 w-full " data-aos="fade-up">
              {/* Text */}
              <div className="space-y-2  flex flex-col gap-6 mt-8  w-full" data-aos="fade-up">
                <div className="flex flex-row  space-x-2 ">
                  <h1 className="lg:text-3xl md:text-2xl text-white poppins-thin">
               WELCOME TO THE{" "}
                  </h1>
                  <h1 className="lg:text-3xl md:text-2xl text-white poppins-extralight">
                    WORLD OF
                  </h1>
                </div>
                <div className="flex text-wrap">
                  
                  <p className="lg:text-8xl md:text-xl text-4xl font-bold text-white poppins-bold">
                    RO
                  </p>
                  <p className="lg:text-8xl md:text-6xl text-4xl font-bold text-yellow poppins-bold">
                  BOTRONICS
                  </p>
                </div>
                <p className="text-wrap text-sm poppins-light text-white mb-10">
                Your gateway to the future of Robotics, Coding and STEM Education. We offer hands-on learning experiences, empowering students of all ages to explore, create and innovate in the exciting world of Robotics.
                </p>
                {/* Buttons */}
              <div className="space-x-3 mt-10" data-aos="fade-up">
                <button
                  to="section2"
                  onClick={() => navigate("/Robogeniushome")}
                  offset={-70}
                  className="items-center justify-center p-3 px-4 lg:text-lg text-sm text-black hover:text-white bg-gold poppins-bold hover:bg-lin shadow-xl rounded-md"
                >
                  Get Enrolled
                </button>
                {/* <button
                  to="section1"
                  offset={-70}
                  className="items-center justify-center p-3 px-4 lg:text-lg text-sm text-black hover:text-white bg-gold poppins-bold hover:bg-lin shadow-xl rounded-md"
                >
                  Get Started
                </button> */}
              </div>
              </div>

              

              {/* Social Icons */}
              <div className="flex flex-row space-x-2 lg:space-x-5">
                {[
                  { href: "https://www.facebook.com/robotronicspakistan/", icon: <FaFacebook /> },
                  { href: "https://twitter.com/robotronicspk", icon: <FaTwitter /> },
                  { href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw", icon: <FaYoutube /> },
                  { href: "https://www.instagram.com/robotronicspk/?hl=en", icon: <FaInstagram /> },
                  { href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all", icon: <FaLinkedin /> },
                  { href: "https://wa.me/message/TKZZPIE2A34UM1", icon: <FaWhatsapp /> },
                ].map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay={getAosStaggerDelay(index)}
                    className="lg:p-3 p-1 border border-brown bg-white rounded-xl hover:bg-brown hover:text-white"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:block" data-aos="fade-left">
              <AppImage
                alt="Robotronics hero robot"
                src={Robort}
                className="w-full mt-10"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
