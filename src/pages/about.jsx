import Intro from "../component/about/aboutIntro";
import AboutRobotronics from "../component/about/aboutRobotronics";
import AboutScience from "../component/about/aboutScience"
import AboutVision from "../component/about/aboutVision"
import AboutSquad from "../component/about/aboutSquad"
import Gotobtn from "../component/goToBtn"
import Marquees from "../component/marquees";
const About = () => {
  return (
    <div className="flex flex-col" >
      <Intro/>
      <AboutRobotronics/>
      <AboutScience/>
      <AboutVision/>
      <AboutSquad/>
      <Marquees direction = "left"/>
      <Marquees direction = "right"/>
      <Gotobtn/>
    </div>
  )
}

export default About;
