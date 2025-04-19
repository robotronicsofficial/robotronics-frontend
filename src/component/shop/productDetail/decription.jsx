import stars from "../../../assets/images/shopStar.svg";
import robot from "../../../assets/images/shopRobot.svg"

const Decription = ({ description, category, duration }) => {
  return (
    <div className="bg-gray lg:p-14 p-2">
      {/* div 1 */}
      <div className="px-2 flex flex-row lg:justify-center lg:space-x-10 space-x-4 "data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
        <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
          PRODUCT DETAIL
        </p>
        <p className="h-8 w-0 border border-black "></p>
        <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
          DELIVERY AND RETURN
        </p>
      </div>
      {/* div 2 */}
      <div className="p-5 flex flex-row justify-between ">
        <div className=" p-2 w-1/2 space-y-2">
          <p className="lg:text-2xl text-xl poppins-semibold text-brown"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
            DESCRIPTION
          </p>
          <p className="text-wrap text-xs poppins-medium text-line ">
            {description}
          </p>
        </div>
        <div className="p-2 w-1/2">
          <div className="text-wrap text-line space-y-2 lg:px-20 px-4"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
            <p className="lg:text-2xl text-xl  poppins-semibold text-brown">
              FITS AND FEATURES
            </p>
            <p className="text-xs poppins-medium ">
              1. Duis aute irure dolor in reprehenderit in{" "}
            </p>
            <p className="text-xs poppins-medium ">
              2. Duis aute irure dolor in reprehenderit in voluptate{" "}
            </p>
            <p className="text-xs poppins-medium ">
              3. Duis aute irure in reprehenderit in voluptate velit esse{" "}
            </p>
            <p className="text-xs poppins-medium ">
              4. Duis aute irure dolor in reprehenderit in voluptate{" "}
            </p>
            <p className="text-xs poppins-medium ">
              5. Duis aute irure voluptate velit esse{" "}
            </p>
          </div>
        </div>
      </div>


       <a className=" hover:curser-pointer transition duration-300 ease-in-out hover:opacity-70" >
            <div className="shopPages flex flex-row lg:px-14 px-5 " id="shopPages">
            {/* text */}
            <div className="flex-1 lg:py-20 py-8 ">
              <div className="flex flex-col justify-content ">
                <p className="flex text-gold lg:text-4xl text-2xl font-bold"data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">MORDERN</p>
                <p className="flex text-white lg:text-4xl text-2xl font-bold"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">LEGO ROBOT</p>
                <p className="flex text-white line-through lg:text-xl text-sm lg:pt-8 pt-4 "data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000" >PKR 3252.41</p>
                <p className="flex text-white lg:text-4xl text-2xl font-bold"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000" >PKR 2352.41</p>
      
              </div>
              <img src={stars} data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000"/>
            </div>
            {/* img */}
            <div className="flex-1"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
              <div className="flex justify-content w-full " >
              <img src={robot} alt="LEGO ROBOT"/>
              </div>
            </div>
          </div>
        </a>
    </div>
  );
};

export default Decription;
