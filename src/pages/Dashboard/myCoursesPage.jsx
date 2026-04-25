import MyCourses from "@/components/site/dashboard/myCourses"
import Intro from "@/components/site/dashboard/intro"
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