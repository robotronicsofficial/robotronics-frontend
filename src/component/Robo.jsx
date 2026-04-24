import robot from "../assets/imagesContent/roboo/roboposter.webp";
import { useNavigate } from "react-router-dom";
import AppImage from "./AppImage";
import { Button } from "@/components/ui/button";

const Robo = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden relative">
      <div className="w-screen h-[140vh] ">
        <AppImage
          src={robot}
          alt="Robot Poster"
          className="w-full h-full  object-fill"
        />
      </div>
      <Button
        type="button"
        onClick={() => navigate("/subscriptions")}
        className="absolute bottom-[8vh] left-[14vw] h-auto items-center justify-center rounded-[6vw] border-4 border-foreground bg-card px-10 py-8 text-sm text-primary hover:bg-card/90 md:text-3xl"
      >
        Subscribe Now
      </Button>
    </div>
  );
};

export default Robo;
