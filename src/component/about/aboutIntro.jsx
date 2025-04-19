import { useEffect } from "react";
// import { Link } from "react-scroll";
import "aos/dist/aos.css"; // Import CSS for AOS
import Aos from "aos";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Iaboutntro = () => {
  useEffect(() => {
    Aos.init(); // Initialize AOS library
  }, []);

  return (
    <>
      <div className="abouthero relative w-full" id="abouthero">
        <div className="overflow-hidden" >
        <div className="flex justify-between h-full w-full p-10   bg-black bg-opacity-70 md:bg-opacity-50">
            {/* text */}
            <div className="space-y-5 pt-40 md:pt-48 lg:w-1/2 md:ml-10">
              {/* Text */}
              <div className="space-y-2"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
                <div className="flex flex-row space-x-2 ">
                  <h1 className="lg:text-3xl md:text-2xl text-white poppins-thin">WELCOME TO THE </h1>
                  <h1 className="lg:text-3xl md:text-2xl text-white poppins-extralight">WORLD OF</h1>
                </div>
                <div className="flex text-wrap">
                  <p className="lg:text-8xl md:text-6xl text-4xl font-bold text-white poppins-bold my-4">About Us</p>
                </div>
                <p className="text-wrap text-sm poppins-light text-white my-4">
                Robotronics Pakistan (Pvt) Ltd is a pioneer educational institute dedicated to advancing robotics and STEM education across Pakistan since 2019. We are in collaboration with leading organizations and schools to empower youth with hands-on learning, fostering innovation, critical thinking and problem-solving skills.
                </p>  
              </div>

              {/* Social Icons */}
              <div className="flex flex-row space-x-2 lg:space-x-5">
                {[
                  { href: "https://www.facebook.com/robotronicspakistan/", icon: <FaFacebook /> },
                  { href: "https://twitter.com/robotronicspk", icon: <FaTwitter /> },
                  { href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw", icon: <FaYoutube /> },
                  { href: "https://www.instagram.com/robotronicspk/?hl=en", icon: <FaInstagram /> },
                  { href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all", icon: <FaLinkedin /> },
                  { href: "https://api.whatsapp.com/send?phone=1234567890", icon: <FaWhatsapp /> },
                ].map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-delay={index * 300}
                    className="lg:p-3 p-1 border border-brown bg-white rounded-xl hover:bg-brown hover:text-white"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iaboutntro;
