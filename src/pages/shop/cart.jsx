import CartsStep from "../../component/shop/steps/cartsStep"
const Cart = () => {
  return (
      <div className="shopCarthero pt-64" id="shopCarthero">
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
        <p className="text-[#362D2C] font-poppins font-bold text-3xl lg:text-[32px] leading-[40px] tracking-normal text-center">
          SHOPPING CART
        </p>

        <p className="text-[#7E7F7C] font-poppins font-normal text-base leading-5 tracking-normal text-center mt-7">
          THIS IS YOUR CART BASED ON WHAT YOU WANTED TO BUY
        </p>

        </div>
        <div className="self-center px-2"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <CartsStep />
        </div>
      </div>
    </div>
  );
};

export default Cart;
