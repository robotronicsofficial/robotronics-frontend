import CheckoutIntro from "../../component/shop/CheckoutIntro";
import ShopPaymentMethod from "../../component/shop/shopPaymentMethod"

const ShippingService = () => {
  return (
    <div>
        <CheckoutIntro activeStep={3} />
        <ShopPaymentMethod/>
    </div>
  )
}

export default ShippingService;
