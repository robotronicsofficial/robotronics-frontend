import CartsStep from "../../component/shop/steps/cartsStep"

const Cart = () => {
  return (
    <div>
      <div className="shopCarthero pt-64" id="shopCarthero">
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <p className="text-brown font-bold text-wrap lg:text-5xl text-3xl poppins-bold text-center self-center ">
            SHOPING CART
          </p>
          <p className="text-brown text-sm text-wrap text-center poppins-semibold self-center mt-4 text-light opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className="self-center px-2"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <CartsStep />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;
