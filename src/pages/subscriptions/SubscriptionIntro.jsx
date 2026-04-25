import { useState, useRef, useEffect } from "react";
import AppImage from "../../component/AppImage";
import bg from "../../assets/images/courses_details.svg";
import yt from "../../assets/images/courseDetailsYoutube.webp";
import { CheckSquare, Share2 } from "lucide-react";
import { BrandIcon } from "../../components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SubscriptionIntro = () => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);
  const shareUrl = `${window.location.origin}/subscriptions`;

  // Close share menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-background">
      <div className="bg-muted py-6">
        <div className="w-full h-full px-4 py-12 sm:py-2 sm:px-8 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row lg:gap-x-6 mt-20 lg:mt-40">
            {/* Left Side */}
            <div
              className="w-full lg:w-2/3 flex flex-col justify-between"
              data-aos="fade-up"


            >
              {/* Image */}
              <div>
                <AppImage
                  src={bg}
                  alt="Course"
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Heading + Button */}
              <div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center w-full">
                  <h1 className="text-3xl sm:text-3xl lg:text-5xl text-foreground font-medium pt-6 lg:pt-0 poppins-bold">
                    Learning Subscription
                  </h1>
                  <Badge className="w-full rounded-lg border bg-destructive px-4 py-2 text-sm text-background sm:w-auto md:px-6 md:py-3 md:text-base lg:text-lg">
                    ON SALE
                  </Badge>
                </div>

                {/* Info Bar */}
                <div className="h-auto sm:h-[12vh] w-full bg-muted flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-8 justify-between mt-6 lg:mt-14 rounded-lg text-muted-foreground text-sm sm:text-base gap-2 sm:gap-0 py-4 sm:py-0 poppins-light ">
                  <div className="whitespace-nowrap">30+ Courses</div>
                  <div className="whitespace-nowrap">US-based Certificates</div>
                  <div className="whitespace-nowrap hidden sm:inline-block">
                    Self Paced Learning
                  </div>

                  {/* Share Button */}
                  <div className="relative" ref={shareRef}>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowShare((prev) => !prev)}
                      className="h-auto gap-1 whitespace-nowrap p-0 hover:bg-transparent"
                    >
                      <Share2 />
                      <span>Share</span>
                    </Button>

                    {/* Share Options */}
                    {showShare && (
                      <div className="absolute top-8 right-0 z-dropdown bg-card rounded shadow-md p-2 flex flex-col gap-2 min-w-[140px]">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-info"
                        >
                          <BrandIcon brand="facebookF" /> Facebook
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-info"
                        >
                          <BrandIcon brand="twitter" /> Twitter
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-success"
                        >
                          <BrandIcon brand="whatsapp" /> WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="flex flex-col w-full lg:w-1/3 mt-10 lg:mt-0 gap-y-6"
              data-aos="fade-up"


            >
              {/* Video */}
              <div className="bg-muted w-full rounded-md flex justify-center items-center">
                <AppImage
                  src={yt}
                  alt="Course"
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Features */}
              <div className="w-full rounded-md border border-border bg-background px-4 py-6 sm:px-6 sm:py-7 md:px-10 lg:px-8">
                <h3 className="text-lg sm:text-xl mb-4 font-semibold poppins-bold">
                  Subscription features:
                </h3>
                <ul className="flex flex-col list-none gap-y-3 text-muted-foreground">
                  {[
                    "30+ courses in one subscription",
                    "Robotics, STEM, AI, Coding all included",
                    "180+ hours of recorded Lectures",
                    "Freelancing Skills including E-Commerce",
                    "Easy to Understand Language",
                    "24/7 live support for active learners",
                    "Multiple Child Accounts under one Parent",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-x-4 sm:gap-x-6"
                    >
                      <span className="text-primary text-lg sm:text-xl">
                        <CheckSquare />
                      </span>
                      <span className="text-base sm:text-xl md:text-base  poppins-light ">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="pt-14">
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl mb-4 poppins-bold">
              What is the learning subscription?
            </h1>
            <p className="text-foreground leading-relaxed text-base sm:text-lg poppins-light">
	              One subscription plan. Every course unlocked. Progress that follows your
              child across devices, so learning doesn&apos;t stop when the tablet
              dies. From Robotics to AI to Coding, the whole library sits under
              one parent account with separate profiles for each child.
              <br />
              <br />
              Activate 2 to 4 courses at a time and start your learning with
              Robotronics. Submit Modular Assessments every month and receive a
              US based STEMSOL.org verified Certificate. These skills will help
              your child build their profile for IVY League University
              Admissions as well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionIntro;
