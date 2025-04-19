import bg from "../../assets/images/courses_details.svg";
import yt from "../../assets/images/courseDetailsYoutube.svg";
// import pic from "../../assets/images/courseDetailpic.svg";
// import { FaRegHeart } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const Robogeniusintro = () => {
  // const navigate = useNavigate(); // Initialize the navigate function

  // const handleRegisterClick = () => {
  //   navigate("/Robogeniushome/Register"); // Navigate to the desired route
  // };

  // const handleGiftProgramClick = () => {
  //   navigate("/Robogeniushome/GiftCourse"); // Replace with your desired route
  // };

  return (
    <div className="bg-background">
      <div className="bg-gray-100 py-6 ">
        <div className="w-full h-full px-4 py-12 sm:py-2  sm:px-8  md:px-12 lg:px-24 ">
          <div className="flex flex-col lg:flex-row lg:space-x-6 mt-20 lg:mt-40">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              {/* Image */}
              <div>
                <img
                  src={bg}
                  alt="Course"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>

              {/* Heading + Button */}
              <div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center w-full ">
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl text-brown font-medium pt-6 lg:pt-0">
                    RoboGenius Program
                  </h1>
                  <button className="border bg-red-600 text-white text-sm md:text-base lg:text-lg px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto rounded-lg">
                    ON SALE
                  </button>
                </div>

                {/* Info Bar */}
                <div className="h-auto sm:h-[12vh] w-full bg-[#D9D9D9] flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-8 justify-between mt-6 lg:mt-14 rounded-lg text-[#7D7D7D] text-sm sm:text-base gap-2 sm:gap-0 py-4 sm:py-0 ">
                  <div className="whitespace-nowrap">06 Sections</div>
                  <div className="whitespace-nowrap">08 Lessons</div>
                  <div className="whitespace-nowrap hidden sm:inline-block">
                    Free Trial Available
                  </div>
                  <div className="whitespace-nowrap">Share</div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-1/3 mt-10 lg:mt-0 space-y-6"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              {/* Video */}
              <div className="bg-gray-300 w-full rounded-md flex justify-center items-center">
                <img
                  src={yt}
                  alt="Course"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>

              {/* Features */}
              <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-8 py-6 sm:py-7 rounded-md shadow-md w-full">
                <h3 className="text-lg sm:text-xl mb-4 font-semibold">
                  Feature of this Program
                </h3>
                <ul className="list-none space-y-3 text-gray-700">
                  {[
                    "Free Trial Available",
                    "English",
                    "Certificate Available",
                    "3-4 hours worth of material",
                    "Self paced",
                    "Self paced",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 sm:space-x-6"
                    >
                      <span className="text-yellow text-lg sm:text-xl">
                        <MdCheckBox />
                      </span>
                      <span className="text-base sm:text-xl">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="pt-14">
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl mb-4">
              Robogenius Short Description
            </h1>
            <p className="text-lightblack leading-relaxed text-base sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              congue semper turpis, ac viverra velit tristique vitae. Sed vel
              felis ac neque euismod rutrum. Donec vulputate, lectus at
              tristique suscipit, ligula velit cursus purus, in condimentum
              metus dolor in urna. Donec at turpis vel nunc aliquet iaculis. Sed
              congue semper turpis, ac viverra velit tristique vitae. Sed vel
              felis ac neque euismod rutrum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robogeniusintro;
