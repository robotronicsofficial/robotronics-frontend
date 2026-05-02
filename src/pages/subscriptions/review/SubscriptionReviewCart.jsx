import SubscriptionReviewCustomer from './SubscriptionReviewCustomer'

const SubscriptionReviewCart = () => {
  return (
    <div>
      <div className="shopCarthero" id="shopCarthero">
        <div className="flex flex-col">
          <div className="items-center" data-aos="fade-down">
          <p className="text-foreground font-bold text-wrap lg:text-4xl text-2xl poppins-bold text-center self-center mt-header">
            Review Order
          </p>
          <p className="text-muted-foreground text-sm text-wrap text-center poppins-semibold self-center mt-4 opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className="self-center w-full" data-aos="fade-up">
          <SubscriptionReviewCustomer />
        </div>
      </div>
      </div>
    </div>
  )
}

export default SubscriptionReviewCart
