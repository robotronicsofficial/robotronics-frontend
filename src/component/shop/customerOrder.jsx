import CustomerProduct from "../../component/shop/customerProduct";
import { useSelector } from "react-redux";
import { calculateCartSummary, formatShopCurrency } from "../../lib/shopCheckout";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const CustomerOrder = ({
  onNext,
  buttonLabel = "CONTINUE TO SHIPPING",
  showContinueButton = true,
}) => {
  const { cart } = useSelector((state) => state.cart);
  const summary = calculateCartSummary(cart);

  return (
    <div
      className="lg:px-14 px-5 lg:p-8 p-4 lg:space-y-20 space-y-8 "
      data-aos="fade-top"
      data-aos-duration="2000"
      data-aos-delay="4000"
    >
      {/* text */}
      <div className="lg:space-y-8 space-y-4">
        <p className="md:text-4xl text-2xl poppins-bold">YOUR ORDER</p>
        <p className="text-sm text-line poppins-regular">
          Review all the products you want to buy
        </p>
      </div>

      {/* map product */}
      <div className="lg:space-y-5 space-y-2 poppins-extralight">
        {cart.length > 0 ? (
          cart.map((product) => (
            <CustomerProduct
              key={product._id || product.id}
              title={product.name}
              image={resolveBackendAssetUrl(product?.images?.[0], "")}
              price={Number(product.price || 0).toLocaleString()}
              item={product.quantity}
            />
          ))
        ) : (
          <p className="text-sm text-[#7E7F7C]">Your cart is empty.</p>
        )}
      </div>

      {/* line  */}
      <div className="flex flex-col lg:py-5 py-2 ">
        <div className=" h-0 border border-lightgray  "></div>
      </div>

      {/* total bills */}
      <div className="justify-between lg:space-y-5 space-y-2  ">
        <div className="flex flex-row justify-between">
          <p className="text-sm poppins-light">Shipping</p>
          <p className="lg:text-xl text-sm poppins-bold">{formatShopCurrency(summary.shipping)}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm poppins-light">Discount 10%</p>
          <p className="text-sm poppins-bold">- {formatShopCurrency(summary.discount)}</p>
        </div>
        <div className="flex flex-row  justify-between">
          <p className="text-sm poppins-light">Price</p>
          <p className="text-xl poppins-bold">{formatShopCurrency(summary.subtotal)}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm poppins-light">Total Price</p>
          <p className="text-xl text-yellow poppins-bold">{formatShopCurrency(summary.total)}</p>
        </div>
        {/* line */}
        <div className="lg:space-y-3 space-y-1 lg:py-4 py-2">
          <div className="h-0 border border-lightgray "></div>
        </div>
        {/* button */}
        {showContinueButton ? (
          <div className="flex justify-center lg:py-4 py-2">
            <button
              type="button"
              className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5"
              onClick={onNext}
              disabled={!cart.length}
            >
              {buttonLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerOrder;
