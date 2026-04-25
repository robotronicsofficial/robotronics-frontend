import AppImage from "../AppImage";
import b6 from "@/assets/imagesContent/bannercode/b6-optimized.webp";
const AboutScience = () => {
  return (
    <div className="lg:flex flex-col bg-foreground">
      {/* block 1 */}
      <div className="lg:flex flex-row justify-between lg:p-5 p-3 items-center  ">
        {/* div 1 */}
        <div className="lg:pl-20 pl-8 lg:py-16 py-8">
          <p
            className="text-background lg:text-7xl text-2xl poppins-bold"
            data-aos="fade-down"


          >
            Turning science <br /> Fiction into <br />{" "}
            <p
              className=" text-primary poppins-bold pb-2"
              data-aos="fade-up"


            >
              Reality
            </p>
            <p
              className="flex border border-primary h-0 w-32 "
              data-aos="fade-up"


            ></p>
          </p>
        </div>
        {/* div 2 */}
        <div className="bg-foreground text-background p-6 max-w-md">
          <p
            className="text-sm text-wrap poppins-light leading-relaxed"
            data-aos="fade-up"
          >
            Personal computers have transformed our lives in ways science
            fiction writers could not have imagined. Helper robots have the
            potential to do the same, if we work together.
          </p>
        </div>
      </div>
      {/* block 2 */}
      <div className="lg:flex justify-between lg:p-5 p-2 items-center ">
        <div className="flex lg:pl-20 flex-col bg-ye">
          <div className="flex flex-row justify-between">
            <div
              className="border-t border-primary pt-4"
              data-aos="fade-up"


            >
              <h2
                className="text-primary pb-2 text-xl md:text-3xl "
                data-aos="fade-up"


              ></h2>
            </div>
            <div className="bg-foreground">
              <div className="max-w-4xl mx-auto">
                <div
                  className="border-t border-card pt-4"
                  data-aos="fade-up"


                >
                  <h2
                    className="text-primary text-xl md:text-3xl font-semibold"
                    data-aos="fade-up"


                  >
                    Solving Small TO Big
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[50vh] md:h-[80vh] w-100 px-10 overflow-hidden ">
        <AppImage
          className="h-full w-full object-cover"
          data-aos="fade-up"


          src={b6}
          alt="Science showcase"
        />
      </div>
    </div>
  );
};

export default AboutScience;
