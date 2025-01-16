import Intro from "../../component/dashboard/CourseDetail/intro"
import Footer from "../../component/footer"
import CourseDescription from "../../component/dashboard/CourseDetail/courseDescription"
import Robogeniusdetail from "./Robogeniusdetail"
import Robogeniusintro from "./Robogeniusintro"

const Robogeniushome = () => {
  return (
    <div>
      {/* <Intro /> */}
      <Robogeniusintro/>
      {/* <CourseDescription /> */}
      <Robogeniusdetail/>
      <Footer />
    </div>
  )
}

export default Robogeniushome;