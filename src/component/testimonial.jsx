import ceo1 from "../assets/images/ceo1.svg";
import ceo2 from "../assets/images/ceo2.svg";
import ceo3 from "../assets/images/ceo3.svg";
import ceo4 from "../assets/images/ceo4.svg";
import ceo5 from "../assets/images/ceo5.svg";
import ceo7 from "../assets/images/ceo7.svg";
import TestimonialCard from "./testimonialCard";

const REVIEW_LONG =
  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.";
const REVIEW_SHORT =
  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam";
const REVIEW_BRIEF =
  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.";

const testimonials = [
  { image: ceo1, name: "Amet minim", role: "CEO, Avito", review: REVIEW_LONG },
  { image: ceo3, name: "Jon Sari", role: "CEO, Avito", review: REVIEW_SHORT },
  { image: ceo2, name: "Amet minim", role: "CEO, Avito", review: REVIEW_BRIEF },
  { image: ceo5, name: "Amet minim", role: "CEO, Avito", review: REVIEW_LONG },
  { image: ceo5, name: "Amet minim", role: "CEO, Avito", review: REVIEW_LONG },
  { image: ceo4, name: "Amet minim", role: "CEO, Avito", review: REVIEW_SHORT },
  { image: ceo7, name: "Amet minim", role: "CEO, Avito", review: REVIEW_SHORT },
];

const Testimonial = () => {
  return (
    <div className="flex flex-col">
      <div className="lg:flex justify-center items-center lg:pt-20 p-5">
        <p
          className="text-foreground lg:text-6xl text-2xl poppins-semibold m-5"
          data-aos="fade-down"
        >
          Are my clients happy?
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
