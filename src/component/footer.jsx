import img from "../assets/logo/arrowN-E.svg";
import robot from "../assets/images/bosten.png";
import circle from "../assets/logo/twocircle.svg";
import up from "../assets/logo/uparrow.svg";
import mobile from "../assets/images/mobile.png";
import apple from "../assets/logo/apple.svg";
import pstore from "../assets/logo/Playstor.svg";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  // FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import AppImage from "./AppImage";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="footer flex flex-col max-w-full ">
      {/* robotronics */}
      <div className="flex items-center lg:text-center p-10 ">
        {/* up button */}
        <div className="lg:w-1/4 md:w-1/3 w-1/2">
          <button
            className="flex lg:w-12 lg:h-12 md:h-8 md:w-8 h-6 w-6 top-btn border border-white rounded-full"
            data-aos="fade-up"

            onClick={goToTop}
          >
            <AppImage
              className="flex lg:h-6 lg:w-14 md:h-4 md:w-10 h-3 w-7 lg:mt-2 mt-1 items-center justify-center "
              src={up}
              alt="Scroll to top"
            />
          </button>
        </div>
        {/* robotronics */}
        <div className="text-left">
          <p
            className="text-black text-wrap font-black lg:text-8xl md:text-6xl text-4xl custom-outline"
            data-aos="fade-down"

          >
            ROBOTRONICS
          </p>
        </div>
      </div>
      {/* links */}
      <footer className="text-white body-font">
        <div className="container p-4 mx-auto">
          <div className="flex flex-wrap justify-between lg:text-center md:text-center text-left">
            <div
              className="lg:w-1/2 flex p-10"
              data-aos="fade-up"

            >
              {/* Quick Links */}
              <div className="w-1/2 text-wrap text-left">
                <h2 className="title-font font-medium poppins-semibold text-gold lg:text-xl tracking-widest">
                  Quick Links
                </h2>
                <nav className="list-none space-y-2">
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/aboutUs"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/CareerJob"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/Blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/Course"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/International/videoGallery"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/International/home"
                    >
                      Robotronics International
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/TermsConditions"
                    >
                      Terms & Conditions
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/PrivacyPolicy"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/RefundPolicy"
                    >
                      Refund Policy
                    </Link>
                  </li>

                   <li>
                    <Link
                      className="text-white poppins-medium cursor-pointer lg:text-xl hover:text-gold"
                      to="/faqs"
                    >
                      FAQs
                    </Link>
                  </li>


                </nav>
                <AppImage className="h-7 w-7 mt-4" data-aos="fade-up" src={circle} alt="" />
              </div>

              {/* Contact Us */}
              <div className="w-1/2 text-wrap text-left">
                <h2 className="title-font font-medium poppins-semibold text-gold lg:text-xl tracking-widest">
                  Contact Us
                </h2>
                <nav className="list-none space-y-4">
                  <li>
                    <span className="text-white font-bold poppins-medium lg:text-xl">
                      Email
                    </span>
                    <p className="text-white text-sm text-wrap poppins-regular font-thin">
                      support@robotronicsofficial.com
                    </p>
                  </li>
                  <li>
                    <span className="text-white font-bold poppins-medium lg:text-xl">
                      Phone
                    </span>
                    <p className="text-white text-wrap poppins-regular font-thin">
                      +92 320 7626 842
                    </p>
                  </li>
                  <li>
                    <span className="text-white font-bold poppins-medium lg:text-xl">
                      Location
                    </span>
                    <p className="text-white text-wrap poppins-regular font-thin">
                      Phase-4, DHA, Lahore, Pakistan
                    </p>
                  </li>
                  <li>
                    <span className="text-white font-bold poppins-medium lg:text-xl">
                      Mo - Fr
                    </span>
                    <p className="text-white text-wrap poppins-regular font-thin">
                      9am - 6pm
                    </p>
                  </li>
                </nav>
                <img
                  className="w-24 mt-4"
                  data-aos="fade-up"
                  src={robot}
                  alt="robot"
                />
              </div>
            </div>

            {/* Search & App Buttons */}
            <div
              className="flex flex-col justify-center w-full lg:w-1/2 px-4"


            >
              {/* Subscribe Section */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="footer-field"
                    placeholder="SUBSCRIBE NOW"
                    className="w-full placeholder-opacity-25 bg-transparent border border-white rounded py-2 px-4 text-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button className="w-full lg:w-auto flex items-center justify-center text-white bg-gold px-6 py-3 rounded hover:bg-gold-dark focus:outline-none transition-colors duration-200">
                  <AppImage src={img} alt="Subscribe Button Icon" />
                </button>
              </div>

              {/* Launch Countdown */}
              <div className="flex my-4">
                {/* img */}
                <div className="relative w-full max-w-sm mx-auto h-72">
  {/* Back phone */}
  <AppImage
    src={mobile}
    alt="Mobile 1"
    className="absolute left-10 top-5 w-32 sm:w-36 md:w-40 z-0"
  />

  {/* Front phone */}
  <AppImage
    src={mobile}
    alt="Mobile 2"
    className="absolute left-0 top-20 w-32 sm:w-36 md:w-40 z-10"
  />
</div>


                <div className="lg:w-1/2 md:2/3 flex flex-col flex-wrap items-center text-wrap lg:items-start text-center lg:text-left">
                  <p className="text-2xl text-white poppins-bold mb-8 ">
                    READY TO LAUNCH IN...
                  </p>
                  <div
                    className="flex  justify-center lg:justify-start space-x-4 text-white"
                    data-aos="fade-up"
                  >
                    <div className="text-center">
                      <p className="text-gold poppins-regular text-sm">WEEKS</p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        22 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gold text-sm poppins-regular ">DAYS</p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        12 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gold text-sm poppins-regular ">
                        HOURS
                      </p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        23 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gold text-sm poppins-regular ">
                        MINUTES
                      </p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        45
                      </p>
                    </div>
                  </div>

                  {/* App Store Buttons */}
                  <div className="flex flex-col gap-y-6 my-10">
                    <button
                      className="mb-4 border border-white p-4 rounded-xl flex items-center space-x-12 hover:bg-gray-800 transition-colors duration-200"
                      data-aos="fade-up"


                    >
                      <AppImage className="h-11 w-14" src={apple} alt="apple" />
                      <div className="text-white">
                        <p className="text-sm text-wrap">Download on the</p>
                        <p className="text-2xl text-wrap font-bold">
                          APP STORE
                        </p>
                      </div>
                    </button>
                    <button
                      className="border border-white p-4 rounded-xl flex items-center space-x-12 hover:bg-gray-800 transition-colors duration-200"
                      data-aos="fade-up"


                    >
                      <AppImage
                        className="h-11 w-14"
                        src={pstore}
                        alt="play-store"
                      />
                      <div className="text-white">
                        <p className="text-sm text-wrap ">Download on the</p>
                        <p className="text-2xl text-wrap font-bold">
                          PLAY STORE
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-black border-t px-10   py-4">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
            <p className="text-sm poppins-medium text-wrap  text-white">
              Copyright © 2025. All Rights Reserved. Powered by Robotronics.
            </p>
            <div className="flex flex-row space-x-2 lg:space-x-5">
              {[
                {
                  href: "https://www.facebook.com/robotronicspakistan/",
                  icon: <FaFacebook />,
                },
                // {
                //   href: "https://twitter.com/robotronicspk",
                //   icon: <FaTwitter />,
                // },
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
                  href: "https://wa.me/message/TKZZPIE2A34UM1",
                  icon: <FaWhatsapp />,
                },
              ].map(({ href, icon }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:p-3 p-1 border border-brown bg-white rounded-xl hover:bg-brown hover:text-white text-black"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
