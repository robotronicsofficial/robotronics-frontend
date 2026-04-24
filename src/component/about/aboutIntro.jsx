import { BrandIcon } from "../../components/ui/brand-icons";
import { getHeaderOffsetClass } from "../../components/layout/headerOffset";
import { getAosStaggerDelay } from "../../utils/motion";

const Iaboutntro = () => {
  return (
    <>
      <div className="abouthero relative w-full" id="abouthero">
        <div className="overflow-hidden" >
        <div className="flex justify-between h-full w-full p-10 bg-foreground/70 md:bg-foreground/50">
            {/* text */}
            <div className={getHeaderOffsetClass("aboutHero", "flex flex-col gap-y-5 lg:w-1/2 md:ml-10")}>
              {/* Text */}
              <div className="flex flex-col gap-y-2"data-aos="fade-up">
                <div className="flex flex-row gap-x-2">
                  <h1 className="lg:text-3xl md:text-2xl text-background poppins-thin">WELCOME TO THE </h1>
                  <h1 className="lg:text-3xl md:text-2xl text-background poppins-extralight">WORLD OF</h1>
                </div>
                <div className="flex text-wrap">
                  <p className="lg:text-8xl md:text-6xl text-4xl font-bold text-background poppins-bold my-4">About Us</p>
                </div>
                <p className="text-wrap text-sm poppins-light text-background my-4">
                Robotronics Pakistan (Pvt) Ltd is a pioneer educational institute dedicated to advancing robotics and STEM education across Pakistan since 2019. We are in collaboration with leading organizations and schools to empower youth with hands-on learning, fostering innovation, critical thinking and problem-solving skills.
                </p>  
              </div>

              {/* Social Icons */}
              <div className="flex flex-row gap-x-2 lg:gap-x-5">
                {[
                  { href: "https://www.facebook.com/robotronicspakistan/", brand: "facebook" },
                  { href: "https://twitter.com/robotronicspk", brand: "twitter" },
                  { href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw", brand: "youtube" },
                  { href: "https://www.instagram.com/robotronicspk/?hl=en", brand: "instagram" },
                  { href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all", brand: "linkedin" },
                  { href: "https://api.whatsapp.com/send?phone=1234567890", brand: "whatsapp" },
                ].map(({ href, brand }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay={getAosStaggerDelay(index)}
                    className="lg:p-3 p-1 border border-foreground bg-card rounded-xl hover:bg-foreground hover:text-background"
                  >
                    <BrandIcon brand={brand} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iaboutntro;
