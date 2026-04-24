import Intro from "../../component/dashboard/intro";
// import PayHistory from "../../component/dashboard/Payhistory";
import SubscriptionChildProfile from "../../component/dashboard/SubscriptionChildProfile";
// import React from 'react'

const ChildProfile = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-[#ebe5e2]">
      <Intro/>

      </div>
      <SubscriptionChildProfile/>
    </div>
  )
}

export default ChildProfile
