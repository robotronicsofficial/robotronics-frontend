import CartsStep from "../../component/shop/steps/cartsStep"
const Cart = () => {
  return (
      <div className="shopCarthero" id="shopCarthero">
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
        <p className="text-[#362D2C] font-poppins font-bold text-wrap lg:text-4xl text-2xl text-center self-center mt-44 pb-6">
          SHOPPING CART
        </p>

        <p className="text-[#7E7F7C] font-poppins font-normal text-base leading-5 tracking-normal text-center mt-7">
          THIS IS YOUR CART BASED ON WHAT YOU WANTED TO BUY
        </p>

        </div>
        <div className=""data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <CartsStep />
        </div>
      </div>
    </div>
  );
};

export default Cart;
