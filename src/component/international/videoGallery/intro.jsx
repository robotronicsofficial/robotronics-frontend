
import { getHeaderOffsetClass } from "../../../components/layout/headerOffset";

const Intro = () => {
  return (
    <div className="videoG">
      <div className={getHeaderOffsetClass("eventHero")}>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-center shopbgcolor poppins-semibold bg-gray-800 bg-opacity-40"data-aos="fade-up">
          EVENT
        </h1>
      </div>
    </div>
  );
};

export default Intro;
