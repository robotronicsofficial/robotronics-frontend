import Intro from "../../component/international/services/intro";
import Offers from "../../component/offers";
import Updates from "../../component/updates";
import QuickContact from "../../component/international/services/quickContact";
import Shop from "../../component/international/internationalPage/Shop";
import Marquees from "../../component/marquees";
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
