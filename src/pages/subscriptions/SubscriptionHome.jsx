import SubscriptionDetail from "./SubscriptionDetail"
import SubscriptionIntro from "./SubscriptionIntro"
import SubscriptionPlans from "./SubscriptionPlans"
import SubscriptionTestimonials from "./SubscriptionTestimonials"
import SubscriptionFAQSection from "./SubscriptionFAQSection"
import SubscriptionCourses from "./SubscriptionCourses"


const SubscriptionHome = () => {
  return (
    <div>
      <SubscriptionIntro/>
      <SubscriptionPlans/>
      <SubscriptionTestimonials/>
      <SubscriptionDetail/>
      <SubscriptionCourses/>
      <SubscriptionFAQSection/>

    </div>
  )
}

export default SubscriptionHome;
