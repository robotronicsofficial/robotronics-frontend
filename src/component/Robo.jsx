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
          className="absolute bottom-[10vh] left-[10vw] items-center justify-center p-5 px-8 md:text-xl text-sm text-yellow  bg-white poppins-bold  shadow-xl rounded-md border-black"
        >
          Get Enrolled
        </button>
    </div>
  );
};

export default Robo;
