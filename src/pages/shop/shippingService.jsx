import CheckoutIntro from "@/components/site/shop/CheckoutIntro";
import ShopPaymentMethod from "@/components/site/shop/shopPaymentMethod"

const ShippingService = () => {
  return (
    <div>
        <CheckoutIntro activeStep={3} />
        <ShopPaymentMethod/>
    </div>
  )
}

export default ShippingService;
