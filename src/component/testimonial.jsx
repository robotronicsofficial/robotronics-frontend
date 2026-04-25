import reviewImgKSA from "../assets/imagesContent/review/ksa.jpg";
import reviewImgPak from "../assets/imagesContent/review/pak.jpg";
import reviewImgUAE from "../assets/imagesContent/review/uae.jpg";
import reviewImgUK from "../assets/imagesContent/review/uk.jpg";
import TestimonialCard from "./testimonialCard";

const testimonials = [
  {
    image: reviewImgUAE,
    name: "Omar Al Harbi",
    role: "Age 13, UAE",
    review:
      "The subscription changed the way I learn! The coding lessons are fun, and I love collecting certificates after completing each module. The quizzes keep me on my toes, and I'm already building small robotics projects at home!",
  },
  {
    image: reviewImgPak,
    name: "Ahmed Mansoor",
    role: "Age 12, Lahore",
    review:
      "I joined the subscription and it was totally worth it. I can access so many courses, collect certificates, and get help through live chat whenever I'm stuck.",
  },
  {
    image: reviewImgKSA,
    name: "Nasser Al Shammari",
    role: "Age 9, KSA",
    review:
      "The subscription platform is just like Netflix but for learning! I've completed courses on AI and E-commerce, and I even helped my dad set up his online store. The platform is easy to use on my tablet too!",
  },
  {
    image: reviewImgUK,
    name: "Oliver Bennett",
    role: "Age 10, UK",
    review:
      "I love the subscription because it makes learning feel like a game. The videos are fun and the projects are cool. My parents can even see my progress from their dashboard.",
  },
];

const Testimonial = () => {
  return (
    <div className="flex flex-col">
      <div className="lg:flex justify-center items-center lg:pt-20 p-5">
        <p
          className="text-foreground lg:text-6xl text-2xl poppins-semibold m-5"
          data-aos="fade-down"
        >
          What young builders and their families are saying
        </p>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 p-2 lg:p-5"
        data-aos="fade-up"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
