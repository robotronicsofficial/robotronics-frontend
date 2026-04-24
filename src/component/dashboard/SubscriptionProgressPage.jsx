
import Intro from '../dashboard/intro'
// import PayHistory from './Payhistory'
import SubscriptionProgressDetailPage from './SubscriptionProgressDetailPage'

const SubscriptionProgressPage = () => {
  return (
    <div >
      <div className='px-4 md:px-20  bg-background'>
      <Intro/>
      </div>
      <SubscriptionProgressDetailPage/>
    </div>
  )
}

export default SubscriptionProgressPage
