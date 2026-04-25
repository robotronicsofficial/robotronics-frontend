import Graph from "@/components/site/graph";
import Intro from "@/components/site/intro";
import Offers from "@/components/site/offers";
import Services from "@/components/site/services";
import Shop from "@/components/site/shop";
import Testimonial from "@/components/site/testimonial";
import Updates from "@/components/site/updates";
import BoToBtn from "@/components/site/goToBtn";
import Marquees from "@/components/site/marquees";
import Robo from "@/components/site/Robo"

const Home = () => {
  return (
    <div className="flex flex-col">
      <Intro />
      <Marquees direction = "left"/>
      <Graph />
      <Robo/>
      <Services />
      <Offers />
      <Shop />
      <Updates />
      <div className="hidden md:block">
        <Testimonial />
      </div>
      <BoToBtn />
    </div>
  );
};

export default Home;
