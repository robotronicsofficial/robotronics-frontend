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
        <div className="w-full h-full px-24">
          <div className="lg:flex flex-wrap lg:flex-nowrap lg:space-x-6 mt-44">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 space-y-6"
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
              <div>
                <div className="flex gap-10 items-center w-[40vw] py-4">
                  <h1 className="lg:text-5xl text-2xl text-wrap text-brown font-medium mt-2">
                    RoboGenius Program
                  </h1>
                  <button className="border bg-red-600 text-sm text-white px-4 py-2 mt-3">
                    ON SALE
                  </button>
                </div>

                <div className="h-[12vh] w-[40vw] bg-[#D9D9D9] flex items-center px-8 justify-between mt-6 rounded-lg text-[#7D7D7D]">
                  <div className="inline-block">06 Sections</div>
                  <div className="inline-block">08 Lessons</div>
                  <div className="inline-block">Free Trial Available</div>
                  <div className="inline-block">Share</div>
                </div>

              
              </div>
            </div>

            {/* Right Side */}
            <div
              className="w-full lg:w-1/3 mt-6 lg:mt-0 space-y-4"
              data-aos="fade-up"
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
              <div className="bg-white px-14 py-7 rounded-md shadow-md">
                <h3 className="text-xl mb-4">Feature of this Program</h3>
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

                    <span className="text-xl">Self paced</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-5">
          <h1 className="font-semibold text-4xl my-6">Robogenius Short Description</h1>
          <p className="text-wrap text-lightblack">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            semper turpis, ac viverra velit tristique vitae. Sed vel felis ac
            neque euismod rutrum. Donec vulputate, lectus at tristique suscipit,
            ligula velit cursus purus, in condimentum metus dolor in urna. Donec
            at turpis vel nunc aliquet iaculis. Sed congue semper turpis, ac
            viverra velit tristique vitae. Sed vel felis ac neque euismod
            rutrum.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Robogeniusintro;
