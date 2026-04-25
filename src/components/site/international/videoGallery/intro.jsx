
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";

const Intro = () => {
  return (
    <div className="videoG">
      <div className={getHeaderOffsetClass("eventHero")}>
        <h1 className="text-background text-3xl sm:text-4xl md:text-5xl text-center poppins-semibold bg-muted/40"data-aos="fade-up">
          EVENT
        </h1>
      </div>
    </div>
  );
};

export default Intro;
