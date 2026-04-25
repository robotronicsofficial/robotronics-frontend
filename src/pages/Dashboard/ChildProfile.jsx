import Intro from "@/components/site/dashboard/intro";
// import PayHistory from "@/components/site/dashboard/Payhistory";
import SubscriptionChildProfile from "@/components/site/dashboard/SubscriptionChildProfile";
// import React from 'react'

const ChildProfile = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-background">
      <Intro/>

      </div>
      <SubscriptionChildProfile/>
    </div>
  )
}

export default ChildProfile
