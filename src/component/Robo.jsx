import robot from "../assets/imagesContent/roboo/roboposter.png";
import { useNavigate } from "react-router-dom";

const Robo = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden relative">
      <div className="w-screen h-[140vh] ">
        <img
          src={robot}
          alt="Robot Poster"
          className="w-full h-full  object-fill"
        />
      </div>
      <button
          to="section2"
          onClick={() => navigate("/Robogeniushome")}
          offset={-70}
          className="absolute bottom-[8vh] left-[14vw] items-center justify-center py-8 px-10 md:text-3xl text-sm text-yellow  bg-white poppins-bold  shadow-xl rounded-[6vw] border-black border-4"
        >
          Subscribe Now
        </button>
    </div>
  );
};

export default Robo;
