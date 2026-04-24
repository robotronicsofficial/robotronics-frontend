import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { getAosStaggerDelay } from "../../../utils/motion";

const Intro = () => {
  return (
    <div className="internationalServices">
      <div
        className="w-full pt-60"
        data-aos="fade-up"


      >
        <div className="space-y-10 lg:p-10 p-4 lg:px-24 lg:w-1/2 ">
          {/* Text */}
          <div className="space-y-2 ">
            <div
              className="flex flex-row space-x-2"
              data-aos="fade-up"


            >
              {/* <h1 className=" md:text-3xl text-xl poppins-extralight text-white">
                ROBOTRONICS
              </h1>
              <h1 className=" md:text-3xl tex-xl poppins-bold text-white font-bold">
                WELCOMES
              </h1> */}
            </div>
            <div
              className="flex flex-wrap"
              data-aos="fade-up"


            >
              <p className="lg:text-8xl text-4xl poppins-bold text-yellow">
                OUR&nbsp;
              </p>
              <p className="lg:text-8xl text-4xl poppins-bold text-white">
                SERVICES
              </p>
            </div>
            <p
              className="text-wrap text-sm poppins-extralight text-white  p-1 backdrop-blur-sm"
              data-aos="fade-up"


            >
              Robotronics has successfully taught 15,000+ International Student
              across the globe. International Students are invited to explore
              the future of Robotics, Coding and STEM Education. We offer
              hands-on learning experiences, empowering students of all ages to
              explore, create and innovate in the exciting world of Robotics &
              STEM.
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex flex-row py-10 space-x-2 lg:space-x-5  ">
            {[
              {
                href: "https://www.facebook.com/robotronicspakistan/",
                icon: <FaFacebook />,
              },
              {
                href: "https://twitter.com/robotronicspk",
                icon: <FaTwitter />,
              },
              {
                href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
                icon: <FaYoutube />,
              },
              {
                href: "https://www.instagram.com/robotronicspk/?hl=en",
                icon: <FaInstagram />,
              },
              {
                href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
                icon: <FaLinkedin />,
              },
              {
                href: "https://api.whatsapp.com/send?phone=1234567890",
                icon: <FaWhatsapp />,
              },
            ].map(({ href, icon }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay={getAosStaggerDelay(index)}
                className="lg:p-3 p-2 border border-brown bg-white rounded-xl hover:bg-brown hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
