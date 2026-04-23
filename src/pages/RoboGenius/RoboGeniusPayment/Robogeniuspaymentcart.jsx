import Robogeniuspaymentcustomercart from './Robogeniuspaymentcustomercart';

const Robogeniuspaymentcart = () => {
  return (
    <div>
      <div className="shopCarthero" id="shopCarthero">
     
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down">
          <p className="text-brown font-bold text-wrap lg:text-4xl text-2xl poppins-bold text-center self-center mt-44 pb-6">
            Payment Process 
          </p> 
          <p className="text-brown text-sm text-wrap text-center poppins-semibold self-center mt-4 text-light opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className=""data-aos="fade-up">
          <Robogeniuspaymentcustomercart/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Robogeniuspaymentcart


