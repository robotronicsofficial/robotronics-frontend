import AppImage from "../AppImage";
import founder1 from "../../assets/imagesContent/team/farhan.jpg";
import founder2 from "../../assets/imagesContent/team/mfarhan.jpg";
import founder3 from "../../assets/imagesContent/team/salman.jpg";
import founder4 from "../../assets/imagesContent/team/rehan.webp";

const AboutSquad = () => {
  const founders = [
    { id: 1, name: "Syed Farhan", title: "Co-Founder | CEO", imgSrc: founder1 },
    {
      id: 2,
      name: "Saba Farhan",
      title: "Co-Founder | Curriculum Head",
      imgSrc: founder2,
    },
    {
      id: 3,
      name: "Salman Shah",
      title: "Co-Founder | Director Sales & HR",
      imgSrc: founder3,
    },
    {
      id: 4,
      name: "Syed Rehan Ali",
      title: "Co-Founder | CFO | CMO",
      imgSrc: founder4,
    },
  ];

  return (
    <div className="flex flex-col bg-gray">
      {/* block 1 */}
      <div className="lg:flex lg:p-14 p-7">
        <p
          className="flex-1 lg:text-6xl poppins-semibold text-3xl font-bold"
          data-aos="fade-up"


        >
          OUR SQUAD
        </p>
        <p
          className="flex-1 text-wrap poppins-regular lg:text-4xl text-2xl pt-4 md:pt-0"
          data-aos="fade-up"


        >
          Our team is a tight-knit family of engineers, developers, educators
          and visionaries, all bound by the same innovative approach and
          creative enthusiasm.
        </p>
      </div>

      {/* block 2 - team members */}
      <div className="flex flex-wrap justify-center">
        {founders.map((founder) => (
          <div
            key={founder.id}
            className="w-full sm:w-1/2 lg:w-1/4 p-4 flex flex-col items-center"
          >
            <div
              className="w-full h-80 sm:h-96 md:h-[28rem] overflow-hidden rounded-tl-md rounded-tr-md shadow-2xl"

              data-aos="fade-down"


            >
              <AppImage
                src={founder.imgSrc}
                alt={founder.title}
                className="w-full h-full object-cover "
              />
            </div>
            <div
              className="bg-black flex flex-col items-center justify-center py-4 w-full"
              data-aos="fade-up"


            >
              <p className="text-white poppins-regular text-lg sm:text-xl">
                {founder.name}
              </p>
              <p className="text-white poppins-regular text-sm sm:text-base text-center">
                {founder.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* block 3 */}
      <div className="lg:p-10 p-5">
        <div className="flex">
          <div className="flex-1 flex flex-row justify-between items-center mb-6">
            {/* line */}
            <div
              className="flex"
              data-aos="fade-up"


            >
              <div className="h-0 lg:w-16 w-8 border border-black"></div>
              <div className="h-0 lg:w-48 w-20 border border-line"></div>
            </div>
            {/* text */}
            <p
              className="flex lg:text-xl text-sm text-wrap text-center poppins-regular"
              data-aos="fade-up"


            >
              Are you our next squad member?
            </p>
          </div>
        </div>
        <div className="flex-1 w-[70vw] poppins-bold">
          <p
            className="md:text-6xl text-2xl font-bold md:text-left text-wrap"
            data-aos="fade-up"


          >
            From ambitious startups to Countrywide Schools, we partner with
            Great{" "}
            <b className="text-[#f5ab34]">Educational industry leaders.</b>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSquad;
