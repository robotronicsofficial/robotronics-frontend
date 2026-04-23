import Robogeniusreviewcustomer from './Robogeniusreviewcustomer'

const Robogeniusreviewcart = () => {
  return (
    <div>
      <div className="shopCarthero" id="shopCarthero">
        <div className="flex flex-col">
          <div className="items-center" data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <p className="text-brown font-bold text-wrap lg:text-4xl text-2xl poppins-bold text-center self-center mt-44">
            Review Order
          </p>
          <p className="text-brown text-sm text-wrap text-center poppins-semibold self-center mt-4 text-light opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className="self-center w-full" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <Robogeniusreviewcustomer />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Robogeniusreviewcart
