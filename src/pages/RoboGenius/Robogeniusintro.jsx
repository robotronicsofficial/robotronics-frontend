import bg from "../../assets/images/courses_details.svg";
import yt from "../../assets/images/courseDetailsYoutube.svg";
import pic from "../../assets/images/courseDetailpic.svg";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdCheckBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Robogeniusintro = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegisterClick = () => {
    navigate("/Robogeniushome/Register"); // Navigate to the desired route
  };

  const handleGiftProgramClick = () => {
    navigate("/Robogeniushome/GiftCourse"); // Replace with your desired route
  };

  return (
    <div className="bg-background">
     
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex flex-wrap lg:flex-nowrap lg:space-x-6 mt-20">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 space-y-6"
              data-aos="fade-right"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              <div>
                <img
                  src={bg}
                  alt="Course"
                  className="w-full h-auto rounded-2xl shadow-md"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded">
                    Development
                  </span>
                  <FaStar className="text-yellow" />
                  <span className="text-brown text-sm">(4.5 Reviews)</span>
                  <div>
                    <button className="ml-4 border px-2 py-1 bg-red-600 text-sm text-white">
                      ON SALE
                    </button>
                  </div>
                </div>
                <h1 className="lg:text-5xl text-2xl text-wrap text-brown font-bold mt-2">
                  Resolving Conflicts Between Designers And Engineers
                </h1>

                {/* button */}
                <div className="my-6">
                  <button
                    onClick={handleRegisterClick}
                    className=" text-brown py-2 px-10 rounded-md bg-gold shadow-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Register Now
                  </button>
                </div>

                <div className="">
                  <h1 className="lg:text-3xl text-2xl text-wrap text-[#c86400] font-bold mt-2">
                    Pkr 5000/Month-Rs 4000/Month (Rs 48000/Annual)
                  </h1>
                </div>
                <div class="border-t border-gray-300 my-4 w-[20vw] opacity-15"></div>

                <div className="">
                  <div className="flex space-x-6">
                    <div className="inline-block ">
                      <button
                        onClick={handleGiftProgramClick}
                        className="bg-yellow text-white py-3 px-4 rounded-full shadow-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Gift This Program
                      </button>
                    </div>
                    <div className="lg:flex lg:space-x-10 items-center text-gray-700 opacity-65">
                      <FaRegHeart className="text-2xl text-yellow" />
                      <div className="inline-block">06 Sections</div>
                      <div className="inline-block">08 Lessons</div>
                      <div className="inline-block">Free Trial Available</div>
                    </div>
                    <div className="flex items-center justify-center text-xl">
                      <IoShareSocialOutline />
                      1k Shares
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-1/3 mt-6 lg:mt-0 space-y-4"
              data-aos="fade-left"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              <div className="bg-gray-300 w-full rounded-md flex justify-center items-center">
                <img
                  src={yt}
                  alt="Course"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>
              <div className="bg-white px-14 py-8 rounded-md shadow-md">
                <ul className="list-none space-y-2 text-gray-700">
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>
                    <span className="text-xl">Free Trial Available</span>
                  </li>
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>
                    <span className="text-xl">English</span>
                  </li>
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>

                    <span className="text-xl">Certificate Available</span>
                  </li>
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>

                    <span className="text-xl">3-4 hours worth of material</span>
                  </li>
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>

                    <span className="text-xl">Self paced</span>
                  </li>
                  <li className="flex items-center space-x-6">
                    <span className="text-yellow text-xl">
                      <MdCheckBox />
                    </span>

                    <span className="text-xl">Share this course</span>
                  </li>
                </ul>
              </div>
              <div className="bg-brown p-4 rounded-md shadow-md flex items-center space-x-4 h-36">
                <img
                  src={pic}
                  alt="Instructor"
                  className="w-24 h-24 rounded-full"
                />
                <div className="h-24 justify-center">
                  <h2 className="text-lg text-white font-bold mb-2">
                    David Millar
                  </h2>
                  <p className="text-sm text-wrap text-white">
                    Masters - Business Administration Mentor/Motivational
                    Speaker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robogeniusintro;
