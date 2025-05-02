import { PiGraduationCapLight } from "react-icons/pi";
// import Header from "../../header";
import bg from "../../../assets/images/coures1.png";
import pic from "../../../assets/images/courseDetailpic.svg";
import { BsCalendar } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import ReactPlayer from "react-player";
import video from "../../../assets/videos/video.mp4"; // ✅ Import your video

const Intro = () => {
  return (
    <div className="bg-background pt-44">
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex flex-wrap lg:flex-nowrap lg:space-x-6">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 space-y-4"
              data-aos="fade-up"
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
              <div className="flex items-center gap-8 pt-4">
                <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 bg-white rounded-full">
                  Game Development
                </span>
                <div className="flex items-center justify-center gap-2">
                  <FaStar className="text-yellow" />
                  <span className="text-brown text-sm">(4.5 Reviews)</span>
                </div>
              </div>
              <div>
                <div className="flex items-center w-[40vw]">
                  <h1 className="lg:text-5xl text-2xl text-wrap text-brown font-medium mb-4">
                    Animation And Game Development
                  </h1>
                </div>
                <div className="flex items-center space-x-2 text-[#7F7E97]">
                  <PiGraduationCapLight />
                  <span className="text-gray-500 my-2">2,250 Students Enrolled</span>
                </div>

                <div className="h-[12vh] w-[40vw] bg-[#D9D9D9] flex items-center px-8 justify-between mt-6 rounded-lg text-[#7D7D7D]">
                  <div className="inline-block">3 Months </div>
                  <div className="inline-block">24 Lectures</div>
                  <div className="inline-block">6 Module</div>
                  <div className="inline-block">6 Quizes</div>
                </div>
              </div>
            </div>

            {/* Right Side with Video */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0 space-y-4 bg-yellow h-[25vw] rounded-2xl">
              <div className="bg-gray-300 w-full h-full rounded-2xl overflow-hidden">
                <ReactPlayer
                  url={video}
                  playing
                  muted
                  loop
                  controls
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
