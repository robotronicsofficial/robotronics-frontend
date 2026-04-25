// import React from 'react'
import Intro from '@/components/site/dashboard/intro'
import SubscriptionProgressCertificate from '@/components/site/dashboard/SubscriptionProgressCertificate'

const ProgressCertificate = () => {
  return (
    <div>
      <div className='px-4 md:px-20 bg-background'>

      <Intro/>
      </div>
      <SubscriptionProgressCertificate/>
    </div>
  )
}

export default ProgressCertificate
