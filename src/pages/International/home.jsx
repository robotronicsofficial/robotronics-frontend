import Intro from "@/components/site/international/services/intro";
import Offers from "@/components/site/offers";
import Updates from "@/components/site/updates";
import QuickContact from "@/components/site/international/services/quickContact";
import Shop from "@/components/site/international/internationalPage/Shop";
import Marquees from "@/components/site/marquees";
const IHome = () => {
  return (
    <div>
      <Intro />
      <Marquees/>
      <Offers />
      <Shop />
      <Updates />
      <QuickContact />
    </div>
  );
};

export default IHome;
