import { useState, useRef, useEffect } from "react";
import AppImage from "../../component/AppImage";
import bg from "../../assets/images/courses_details.svg";
import yt from "../../assets/images/courseDetailsYoutube.webp";
import { IoMdShare } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";

const SubscriptionIntro = () => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);
  const shareUrl = `${window.location.origin}/subscriptions`;

  // Close share menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-background">
      <div className="bg-gray-100 py-6">
        <div className="w-full h-full px-4 py-12 sm:py-2 sm:px-8 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row lg:space-x-6 mt-20 lg:mt-40">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 flex flex-col justify-between"
              data-aos="fade-up"


            >
              {/* Image */}
              <div>
                <AppImage
                  src={bg}
                  alt="Course"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Heading + Button */}
              <div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center w-full">
                  <h1 className="text-3xl sm:text-3xl lg:text-5xl text-brown font-medium pt-6 lg:pt-0 poppins-bold">
                    Learning Subscription
                  </h1>
                  <button className="border bg-red-600 text-white text-sm md:text-base lg:text-lg px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto rounded-lg pointer-events-none">
                    ON SALE
                  </button>
                </div>

                {/* Info Bar */}
                <div className="h-auto sm:h-[12vh] w-full bg-[#D9D9D9] flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-8 justify-between mt-6 lg:mt-14 rounded-lg text-[#7D7D7D] text-sm sm:text-base gap-2 sm:gap-0 py-4 sm:py-0 poppins-light ">
                  <div className="whitespace-nowrap">30+ Courses</div>
                  <div className="whitespace-nowrap">US-based Certificates</div>
                  <div className="whitespace-nowrap hidden sm:inline-block">
                    Self Paced Learning
                  </div>

                  {/* Share Button */}
                  <div className="relative" ref={shareRef}>
                    <button
                      onClick={() => setShowShare((prev) => !prev)}
                      className="flex items-center gap-1 whitespace-nowrap"
                    >
                      <IoMdShare />
                      <span>Share</span>
                    </button>

                    {/* Share Options */}
                    {showShare && (
                      <div className="absolute top-8 right-0 z-10 bg-white rounded shadow-md p-2 flex flex-col gap-2 min-w-[140px]">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-blue-600"
                        >
                          <FaFacebookF /> Facebook
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-blue-400"
                        >
                          <FaTwitter /> Twitter
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-green-600"
                        >
                          <FaWhatsapp /> WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-1/3 mt-10 lg:mt-0 space-y-6"
              data-aos="fade-up"


            >
              {/* Video */}
              <div className="bg-gray-300 w-full rounded-md flex justify-center items-center">
                <AppImage
                  src={yt}
                  alt="Course"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>

              {/* Features */}
              <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-8 py-6 sm:py-7 rounded-md shadow-md w-full">
                <h3 className="text-lg sm:text-xl mb-4 font-semibold poppins-bold">
                Subscription features:
                </h3>
                <ul className="list-none space-y-3 text-gray-700">
                  {[
                    "30+ Courses in one Subscription",
                    "Robotics, STEM, AI, Coding all included",
                    "180+ hours of recorded Lectures",
                    "Freelancing Skills including E-Commerce",
                    "Easy to Understand Language",
                    "24/7 live support for active learners",
                    "Multiple Child Accounts under one Parent",

                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 sm:space-x-6 "
                    >
                      <span className="text-yellow text-lg sm:text-xl">
                        <MdCheckBox />
                      </span>
                      <span className="text-base sm:text-xl md:text-base  poppins-light ">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="pt-14">
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl mb-4 poppins-bold">
              What is the learning subscription?
            </h1>
            <p className="text-lightblack leading-relaxed text-base sm:text-lg poppins-light">
              The learning subscription is a course platform
              with all the skills under one roof. It is a one-stop solution
              for your Child to learn all the Modern Skills. From Robotics to AI
              to Coding we have got you covered. Just like Netflix, Parents can
              make multiple Child Accounts and engage their children in
              productive work.
              <br />
              <br />
              Activate 2 to 4 courses at a time and start your learning with
              Robotronics. Submit Modular Assessments every month and receive a
              US based STEMSOL.org verified Certificate. These skills will help
              your child build their profile for IVY League University
              Admissions as well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionIntro;
