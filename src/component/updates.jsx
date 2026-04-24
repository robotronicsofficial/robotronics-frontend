import img6 from "../assets/images/Rectangle27.webp";
import img7 from "../assets/images/Rectangle31.webp";
import p2 from "../assets/imagesContent/latestupdate/p2-optimized.webp"
import p3 from "../assets/imagesContent/latestupdate/p3-optimized.webp"
import p4 from "../assets/imagesContent/latestupdate/p4-optimized.webp"
import p6 from "../assets/imagesContent/latestupdate/p6-optimized.webp"
import AppImage from "./AppImage";

const Updates = () => {
  return (
    // image
    <div className="flex flex-col image " id="image">
      {/* layer 1 */}
      <div className="lg:flex lg:p-1 p-5 w-full">
        {/* div 1 */}
        <div className="flex-1 text-white space-y-4 ">
          <p
            className="text-white px-4 lg:px-14 py-14 poppins-extrabold text-2xl lg:text-5xl "
            data-aos="fade-up"

          >
            Latest Updates What&apos;s <br />
            <span className="block text-[#f5ab34] text-2xl lg:text-5xl poppins-extrabold mt-4">
              Cooking
            </span>
          </p>

          <h1
            className="text-white text-wrap px-4 poppins-regular lg:px-14 text-sm lg:text-lg "
            data-aos="fade-up"

          >Be informed about the latest updates in the world of Robotics.

          </h1>

          <AppImage
            className="w-full px-4 lg:px-14 py-4 object-cover"
            data-aos="fade-up"

            src={p6}
            alt="Cooking Image"
          />
        </div>
        {/* div 2 */}
        <div className="flex-1 text-white">
          {/* images */}
          <div
            className="flex space-between justify-center"
            data-aos="fade-down"

          >
            <AppImage className="lg:h-40 lg:w-28 h-22 w-14" src={img6} alt="Update accent card" />
            <AppImage className="lg:h-40 lg:w-28 h-22 w-14 " src={img7} alt="Update accent card" />
          </div>
          {/* text */}
          <div
            className="space-y-2"
            data-aos="fade-up"

          >
            <div className="text-wrap mt-4">
              <p className="text-white lg:text-2xl lg:p-3 text-xl font-bold text-wrap">
                01
              </p>
              <p className="text-white lg:text-xl lg:p-3 poppins-thin  text-wrap tracking-wide">
              Upcoming Headstart Robotics Competition in Islamabad on 14th-1th February 2025
              </p>
            </div>
            <div className="text-wrap">
              <p className="text-white lg:text-2xl lg:p-3 font-bold text-xl text-wrap">
                02
              </p>
              <p className="text-white lg:text-xl lg:p-3 poppins-thin text-wrap tracking-wide">
              Robotics Exhibition being held in Cornerstone School and College Global Campus on 9th April 2025
              </p>
            </div>
            <div className="text-wrap">
              <p className="text-white lg:text-2xl lg:p-3 font-bold text-xl text-wrap">
                03
              </p>
              <p className="text-white lg:text-xl lg:p-3 poppins-thin text-wrap tracking-wide">
              Major schools in Punjab incline towards the Robotronics Curriculum to be integrated in their Curriculum
              </p>
            </div>
            <div className="text-wrap">
              <p className="text-white lg:text-2xl lg:p-3 font-bold text-xl text-wrap">
                04
              </p>
              <p className="text-white lg:text-xl lg:p-3 poppins-thin text-wrap tracking-wide">
              Major schools in Punjab incline towards the Robotronics Curriculum to be integrated in their Curriculum
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* layer 2 */}
      <div className="flex flex-wrap justify-center md:justify-between px-4 sm:px-6 md:px-10 pb-5">
        <AppImage
          className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-4 md:p-5 object-contain"
          data-aos="fade-down"

          src={p3}
          alt="Image 1"
        />
        <AppImage
          className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-4 md:p-5 object-contain"
          data-aos="fade-up"

          src={p2}
          alt="Image 2"
        />
        <AppImage
          className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-4 md:p-5 object-contain"
          data-aos="fade-down"

          src={p4}
          alt="Image 3"
        />
        <AppImage
          className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-4 md:p-5 object-contain"
          data-aos="fade-up"

          src={p3}
          alt="Image 2"
        />
      </div>
    </div>
  );
};

export default Updates;
