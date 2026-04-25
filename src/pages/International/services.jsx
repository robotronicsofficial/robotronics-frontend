import Intro from "@/components/site/international/services/intro"
import Updates from "@/components/site/updates"
import OurServices from "@/components/site/international/services/ourServices"
import QuickContact from "@/components/site/international/services/quickContact"
import Marquees from "@/components/site/marquees"
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