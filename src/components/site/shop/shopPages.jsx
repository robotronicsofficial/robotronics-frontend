import stars from "@/assets/images/shopStar.svg";
import AppImage from "../AppImage";
import robot from "@/assets/images/shopRobot.webp";

const ShopPages = () => {
  return (
    <section
      className="shopPages flex px-5 transition duration-300 ease-in-out hover:opacity-70 lg:px-14"
      id="shopPages"
    >
      <div className="flex-1 py-8 lg:py-20">
        <div className="flex flex-col justify-content">
          <p className="flex text-2xl font-bold text-primary lg:text-4xl" data-aos="fade-right">MODERN</p>
          <p className="flex text-2xl font-bold text-background lg:text-4xl" data-aos="fade-left">LEGO ROBOT</p>
          <div className="flex items-baseline gap-2 pt-4 lg:pt-8" data-aos="fade-right">
            <span className="text-xs text-muted-foreground lg:text-sm">Was</span>
            <span className="text-sm text-muted-foreground line-through lg:text-xl">PKR 3252.41</span>
          </div>
          <p className="flex text-2xl font-bold text-background lg:text-4xl" data-aos="fade-left">PKR 2352.41</p>
        </div>
        <img src={stars} alt="" data-aos="fade-up" />
      </div>
      <div className="flex-1" data-aos="fade-left">
        <div className="flex w-full justify-content">
          <AppImage src={robot} alt="LEGO ROBOT" />
        </div>
      </div>
    </section>
  );
};

export default ShopPages;
