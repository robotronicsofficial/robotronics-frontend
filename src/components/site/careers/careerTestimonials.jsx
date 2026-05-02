import { useState } from "react";
import AppImage from "../AppImage";
import robot from "@/assets/images/careerTestimonial.webp";
import { Button } from "@/components/ui/button";

const CareerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const data = [
    {
      name: "Muhammad Hammad Ghazanfar",
      job: "Software Engineer",
      image: robot,
      quote: `Flowbite is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS application.`,
    },
    {
      name: "Muhammad",
      job: "Software Engineer",
      image: robot,
      quote: `Famous soccer athlete, Pele who appeared to be born with plenty
              of natural talent, continues this quote by adding “It is hard work,
              perseverance, learning, studying, sacrifice and most of all, love
              of what you are doing.`,
    },
    {
      name: "Ali",
      job: "Software Engineer",
      image: robot,
      quote: `This quote by George Bernard Shaw is a critical one for every
              entrepreneur who will succeed through both good and bad  times
              and bull runs and recessions. Sometimes business and revenues
              will come easy. Other times you need to create it.`,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % data.length);
  };

  const previousTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + data.length) % data.length);
  };

  const { name, job, image, quote } = data[currentTestimonial];

  return (
    <div className="lg:flex flex-row justify-between bg-foreground p-5">
      {/* left */}
      <div>
        <AppImage
          src={image}
          alt="robot"
          data-aos="fade-up"


        />
      </div>
      {/* right */}
      <div className="lg:w-1/2 py-5">
        {/* text */}
        <div
          className="flex flex-row content-center"
          data-aos="fade-up"


        >
          {/* text */}
          <div className="flex flex-col justify-between lg:py-10 py-5">
            <div></div>
            <div>
              <p className="text-xl  text-background">Our Employees</p>
              <p className="lg:text-6xl text-3xl text-primary font-bold">
                TESTIMONIALS
              </p>
            </div>
          </div>
          {/* img */}
          <div>
            <AppImage src={robot} className="h-34 w-64" alt="robot" />
          </div>
        </div>
        {/* message */}
        <blockquote
          className="w-full border-t border-border pt-6 text-xl italic font-semibold text-muted-foreground dark:text-background"
          data-aos="fade-up"
        >
          <p className="text-wrap text-foreground">{quote}</p>
        </blockquote>
        {/* name */}
        <div
          className="py-5"
          data-aos="fade-up"


        >
          <p className="text-primary text-2xl">{name}</p>
          <p className="text-background">{job}</p>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-x-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={previousTestimonial}
            className="size-3 rounded-full bg-card p-0 hover:bg-primary"
            aria-label="Previous testimonial"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={nextTestimonial}
            className="size-3 rounded-full bg-card p-0 hover:bg-primary"
            aria-label="Next testimonial"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={previousTestimonial}
            className="size-3 rounded-full bg-card p-0 hover:bg-primary"
            aria-label="Previous testimonial"
          />
        </div>
      </div>
    </div>
  );
};

export default CareerTestimonials;
