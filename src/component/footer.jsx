import img from "../assets/logo/arrowN-E.svg";
import robot from "../assets/images/bosten.png";
import circle from "../assets/logo/twocircle.svg";
import up from "../assets/logo/uparrow.svg";
import mobile from "../assets/images/mobile.png";
import apple from "../assets/logo/apple.svg";
import pstore from "../assets/logo/Playstor.svg";
import { Link } from "react-router-dom";
import { BrandIcon } from "../components/ui/brand-icons";
import AppImage from "./AppImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="footer flex flex-col max-w-full ">
      {/* robotronics */}
      <div className="flex items-center lg:text-center p-10 ">
        {/* up button */}
        <div className="lg:w-1/4 md:w-1/3 w-1/2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="top-btn flex h-6 w-6 rounded-full border-card bg-transparent p-0 hover:bg-card/10 md:h-8 md:w-8 lg:h-12 lg:w-12"
            data-aos="fade-up"
            onClick={goToTop}
          >
            <AppImage
              className="flex lg:h-6 lg:w-14 md:h-4 md:w-10 h-3 w-7 lg:mt-2 mt-1 items-center justify-center "
              src={up}
              alt="Scroll to top"
            />
          </Button>
        </div>
        {/* robotronics */}
        <div className="text-left">
          <p
            className="text-foreground text-wrap font-black lg:text-8xl md:text-6xl text-4xl custom-outline"
            data-aos="fade-down"

          >
            ROBOTRONICS
          </p>
        </div>
      </div>
      {/* links */}
      <footer className="text-background body-font">
        <div className="container p-4 mx-auto">
          <div className="flex flex-wrap justify-between lg:text-center md:text-center text-left">
            <div
              className="lg:w-1/2 flex p-10"
              data-aos="fade-up"

            >
              {/* Quick Links */}
              <div className="w-1/2 text-wrap text-left">
                <h2 className="title-font font-medium poppins-semibold text-primary lg:text-xl tracking-widest">
                  Quick Links
                </h2>
                <nav className="flex flex-col list-none gap-y-2">
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/aboutUs"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/CareerJob"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/Blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/Course"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/International/videoGallery"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/International/home"
                    >
                      Robotronics International
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/TermsConditions"
                    >
                      Terms & Conditions
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/PrivacyPolicy"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/RefundPolicy"
                    >
                      Refund Policy
                    </Link>
                  </li>

                   <li>
                    <Link
                      className="text-background poppins-medium cursor-pointer lg:text-xl hover:text-primary"
                      to="/faqs"
                    >
                      FAQs
                    </Link>
                  </li>


                </nav>
                <AppImage className="h-7 w-7 mt-4" data-aos="fade-up" src={circle} alt="" />
              </div>

              {/* Contact Us */}
              <div className="w-1/2 text-wrap text-left">
                <h2 className="title-font font-medium poppins-semibold text-primary lg:text-xl tracking-widest">
                  Contact Us
                </h2>
                <nav className="flex flex-col list-none gap-y-4">
                  <li>
                    <span className="text-background font-bold poppins-medium lg:text-xl">
                      Email
                    </span>
                    <p className="text-background text-sm text-wrap poppins-regular font-thin">
                      support@robotronicsofficial.com
                    </p>
                  </li>
                  <li>
                    <span className="text-background font-bold poppins-medium lg:text-xl">
                      Phone
                    </span>
                    <p className="text-background text-wrap poppins-regular font-thin">
                      +92 320 7626 842
                    </p>
                  </li>
                  <li>
                    <span className="text-background font-bold poppins-medium lg:text-xl">
                      Location
                    </span>
                    <p className="text-background text-wrap poppins-regular font-thin">
                      Phase-4, DHA, Lahore, Pakistan
                    </p>
                  </li>
                  <li>
                    <span className="text-background font-bold poppins-medium lg:text-xl">
                      Mo - Fr
                    </span>
                    <p className="text-background text-wrap poppins-regular font-thin">
                      9am - 6pm
                    </p>
                  </li>
                </nav>
                <img
                  className="w-24 mt-4"
                  data-aos="fade-up"
                  src={robot}
                  alt="robot"
                />
              </div>
            </div>

            {/* Search & App Buttons */}
            <div
              className="flex flex-col justify-center w-full lg:w-1/2 px-4"


            >
              {/* Subscribe Section */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4 gap-y-4 lg:gap-y-0 lg:gap-x-4">
                <div className="relative w-full">
                  <Input
                    type="text"
                    id="footer-field"
                    placeholder="SUBSCRIBE NOW"
                    className="w-full border-card bg-transparent text-background placeholder:text-background/25"
                  />
                </div>
                <Button
                  type="button"
                  className="h-auto w-full rounded bg-primary px-6 py-3 text-background hover:bg-primary/80 lg:w-auto"
                  aria-label="Subscribe"
                >
                  <AppImage src={img} alt="Subscribe Button Icon" />
                </Button>
              </div>

              {/* Launch Countdown */}
              <div className="flex my-4">
                {/* img */}
                <div className="relative w-full max-w-sm mx-auto h-72">
  {/* Back phone */}
  <AppImage
    src={mobile}
    alt="Mobile 1"
    className="absolute left-10 top-5 w-32 sm:w-36 md:w-40 z-base"
  />

  {/* Front phone */}
  <AppImage
    src={mobile}
    alt="Mobile 2"
    className="absolute left-0 top-20 w-32 sm:w-36 md:w-40 z-raised"
  />
</div>


                <div className="flex flex-col flex-wrap items-center text-wrap text-center md:w-2/3 lg:w-1/2 lg:items-start lg:text-left">
                  <p className="text-2xl text-background poppins-bold mb-8 ">
                    READY TO LAUNCH IN...
                  </p>
                  <div
                    className="flex flex-wrap justify-center gap-4 text-background lg:justify-start"
                    data-aos="fade-up"
                  >
                    <div className="text-center">
                      <p className="text-primary poppins-regular text-sm">WEEKS</p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        22 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-primary text-sm poppins-regular ">DAYS</p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        12 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-primary text-sm poppins-regular ">
                        HOURS
                      </p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        23 :
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-primary text-sm poppins-regular ">
                        MINUTES
                      </p>
                      <p className="lg:text-4xl font-black text-2xl poppins-semibold ">
                        45
                      </p>
                    </div>
                  </div>

                  {/* App Store Buttons */}
                  <div className="flex flex-col gap-y-6 my-10">
                    <Button
                      type="button"
                      variant="outline"
                      className="mb-4 h-auto rounded-xl border-card bg-transparent p-4 text-background hover:bg-muted"
                      data-aos="fade-up"
                    >
                      <AppImage className="h-11 w-14" src={apple} alt="apple" />
                      <div className="text-left text-background">
                        <p className="text-sm text-wrap">Download on the</p>
                        <p className="text-2xl text-wrap font-bold">
                          APP STORE
                        </p>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-auto rounded-xl border-card bg-transparent p-4 text-background hover:bg-muted"
                      data-aos="fade-up"
                    >
                      <AppImage
                        className="h-11 w-14"
                        src={pstore}
                        alt="play-store"
                      />
                      <div className="text-left text-background">
                        <p className="text-sm text-wrap ">Download on the</p>
                        <p className="text-2xl text-wrap font-bold">
                          PLAY STORE
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-foreground border-t px-10   py-4">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
            <p className="text-sm poppins-medium text-wrap  text-background">
              Copyright © 2025. All Rights Reserved. Powered by Robotronics.
            </p>
            <div className="flex flex-row gap-x-2 lg:gap-x-5">
              {[
                {
                  href: "https://www.facebook.com/robotronicspakistan/",
                  brand: "facebook",
                },
                // {
                //   href: "https://twitter.com/robotronicspk",
                //   brand: "twitter",
                // },
                {
                  href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
                  brand: "youtube",
                },
                {
                  href: "https://www.instagram.com/robotronicspk/?hl=en",
                  brand: "instagram",
                },
                {
                  href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
                  brand: "linkedin",
                },
                {
                  href: "https://wa.me/message/TKZZPIE2A34UM1",
                  brand: "whatsapp",
                },
              ].map(({ href, brand }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:p-3 p-1 border border-foreground bg-card rounded-xl hover:bg-foreground hover:text-background text-foreground"
                >
                  <BrandIcon brand={brand} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
