import Intro from "../../component/international/services/intro"
import Updates from "../../component/updates"
import OurServices from "../../component/international/services/ourServices"
import QuickContact from "../../component/international/services/quickContact"
import Marquees from "../../component/marquees"
const IServices = () => {
  return (
    <div>
      <Intro />
      <Marquees/>
      <OurServices />
      <Updates />
      <QuickContact />
    </div>
  )
}

export default IServices