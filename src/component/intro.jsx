import { useNavigate } from "@tanstack/react-router";
import Robort from "../assets/images/heroRobot.webp";
import AppImage from "./AppImage";
import { BrandIcon } from "../components/ui/brand-icons";
import { getAosStaggerDelay } from "../utils/motion";
import { Button } from "@/components/ui/button";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero" id="hero">
        <div className="flex flex-col gap-y-5 -top-10">
          <div className="flex justify-between w-full py-16 md:px-20 px-14 ">
            {/* text */}
            <div className="flex flex-col justify-center gap-y-5 mt-24 md:mt-header-auth md:w-1/2 w-full" data-aos="fade-up">
              {/* Text */}
              <div className="gap-y-2 flex flex-col gap-6 mt-8 w-full" data-aos="fade-up">
                <div className="flex flex-row gap-x-2">
                  <h1 className="lg:text-3xl md:text-2xl text-background poppins-thin">
               WELCOME TO THE{" "}
                  </h1>
                  <h1 className="lg:text-3xl md:text-2xl text-background poppins-extralight">
                    WORLD OF
                  </h1>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap">
                  <p className="lg:text-8xl md:text-xl text-4xl font-bold text-background poppins-bold">
                    RO
                  </p>
                  <p className="lg:text-8xl md:text-6xl text-4xl font-bold text-primary poppins-bold">
                    BOTRONICS
                  </p>
                </div>
                <p className="text-wrap text-sm poppins-light text-background mb-10">
                Hands-on robotics, coding, and STEM for curious kids aged 6 to 16. Build real robots, write real code, and ship projects you can show off.
                </p>
                {/* Buttons */}
              <div className="flex flex-col gap-x-3 mt-10" data-aos="fade-up">
                <Button
                  type="button"
                  onClick={() => navigate({ to: "/subscriptions" })}
                  className="h-auto items-center justify-center rounded-md bg-primary p-3 px-4 text-sm text-foreground hover:bg-border hover:text-background lg:text-lg"
                >
                  Start learning
                </Button>
              </div>
              </div>

              

              {/* Social Icons */}
              <div className="flex flex-row gap-x-2 lg:gap-x-5">
                {[
                  { href: "https://www.facebook.com/robotronicspakistan/", brand: "facebook" },
                  { href: "https://twitter.com/robotronicspk", brand: "twitter" },
                  { href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw", brand: "youtube" },
                  { href: "https://www.instagram.com/robotronicspk/?hl=en", brand: "instagram" },
                  { href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all", brand: "linkedin" },
                  { href: "https://wa.me/message/TKZZPIE2A34UM1", brand: "whatsapp" },
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

            {/* Image */}
            <div className="hidden md:block" data-aos="fade-left">
              <AppImage
                alt="Robotronics hero robot"
                src={Robort}
                className="w-full mt-10"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
