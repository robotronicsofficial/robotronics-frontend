import Intro from "@/components/site/dashboard/intro"
import Payhistory from '@/components/site/dashboard/Payhistory'

const Payment = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-background">
      <Intro/>
      </div>
      <Payhistory/>
    </div>
  )
}

export default Payment
