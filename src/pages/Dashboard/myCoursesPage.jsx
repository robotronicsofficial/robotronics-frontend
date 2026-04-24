import MyCourses from "../../component/dashboard/myCourses"
import Intro from "../../component/dashboard/intro"
const MyCoursesPage = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-background">
      <Intro /> 
        
      </div>
      <MyCourses />
    </div>
  )
}

export default MyCoursesPage