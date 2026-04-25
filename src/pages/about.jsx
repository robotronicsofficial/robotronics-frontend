import Intro from "@/components/site/about/aboutIntro";
import AboutRobotronics from "@/components/site/about/aboutRobotronics";
import AboutScience from "@/components/site/about/aboutScience"
import AboutVision from "@/components/site/about/aboutVision"
import AboutSquad from "@/components/site/about/aboutSquad"
import Gotobtn from "@/components/site/goToBtn"
import Marquees from "@/components/site/marquees";
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
