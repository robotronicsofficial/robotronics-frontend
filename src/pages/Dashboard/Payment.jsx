import Intro from "../../component/dashboard/intro"
import Payhistory from '../../component/dashboard/Payhistory'

const Payment = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-[#ebe5e2]">
      <Intro/>
      </div>
      <Payhistory/>
    </div>
  )
}

export default Payment
