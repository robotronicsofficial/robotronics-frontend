import Robogeniusdetail from "./Robogeniusdetail"
import Robogeniusintro from "./Robogeniusintro"
import Robogeniuscards from "./Robogeniuscards"
import Robogeniusreview from "./Robogeniusreview"
import RobogeniusFAQSection from "./RobogeniusFAQSection"
import Robogeniusmaincourses from "./Robogeniusmaincourses"


const Robogeniushome = () => {
  return (
    <div>
      <Robogeniusintro/>
      <Robogeniuscards/>
      <Robogeniusreview/>
      <Robogeniusdetail/>
      <Robogeniusmaincourses/>
      <RobogeniusFAQSection/>

    </div>
  )
}

export default Robogeniushome;