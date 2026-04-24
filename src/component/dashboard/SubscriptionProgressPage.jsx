
import Intro from '../dashboard/intro'
// import PayHistory from './Payhistory'
import SubscriptionProgressDetailPage from './SubscriptionProgressDetailPage'

const SubscriptionProgressPage = () => {
  return (
    <div >
      <div className='px-4 md:px-20  bg-[#ebe5e2]'>
      <Intro/>
      </div>
      <SubscriptionProgressDetailPage/>
    </div>
  )
}

export default SubscriptionProgressPage
