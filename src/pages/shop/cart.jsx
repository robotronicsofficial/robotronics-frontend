import CartsStep from "../../component/shop/steps/cartsStep"
const Cart = () => {
  return (
    <div className="shopCarthero" id="shopCarthero">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center" data-aos="fade-down">
          <p className="text-foreground font-poppins font-bold text-wrap lg:text-4xl text-2xl text-center mt-header-page">
            Your cart
          </p>
        </div>
        <div data-aos="fade-up">
          <CartsStep />
        </div>
      </div>
    </div>
  );
};

export default Cart;
