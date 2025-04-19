import Shippingpencilalt from "../../assets/images/Shippingpencilalt.svg";
import pencilaltBlack from "../../assets/images/pencilaltBlack.svg"
import mastercard from "../../assets/images/mastercard.svg";
import { useSelector } from "react-redux";

const ShopShipping = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);

  const SHIPPING_COST = 500;
  const DISCOUNT_PERCENTAGE = 0.10;

  const discountAmount = totalPrice * DISCOUNT_PERCENTAGE;
  const totalAfterDiscount = totalPrice - discountAmount;
  const finalTotalPrice = totalAfterDiscount + SHIPPING_COST;

  return (
    <div className="lg:flex flex-row  bg-gray">
      {/* left */}

      <div className="lg:pt-8 pt-4 lg:space-y-20 space-y-8">
        <div className="lg:space-y-8 space-y-4">
          <p className="lg:text-4xl poppins-bold text-brown">YOUR ORDER</p>
          <p className="font-lato font-medium text-base leading-5 text-[#7E7F7C]">
            Review all the products you want to buy
          </p>
        </div>

        <div className="lg:space-y-5 space-y-2 poppins-extralight">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div className="flex flex-row space-x-3" key={product.id}>
                <img className="lg:h-32 lg:w-30" src={`http://localhost:8080/${product.images[0]}`} alt={product.name} />
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-bold text-wrap">{product.name}</p>
                  <div className="flex gap-2"><span>Quantity:</span><p>{product.quantity}</p></div>
                  <p className="font-bold">PKR {product.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-5 text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="h-0 border border-[#D4D4D4]"></div>

        <div className="space-y-2">
          {/* Summary Items */}
          <SummaryItem label="Shipping" value={`PKR ${SHIPPING_COST}`} />
          <SummaryItem label="Discount 10%" value={`- PKR ${discountAmount.toLocaleString()}`} />
          <SummaryItem label="Price" value={`PKR ${totalPrice.toLocaleString()}`} />
          <SummaryItem label="Total Price" value={`PKR ${finalTotalPrice.toLocaleString()}`} highlight />
        </div>

        <div className="h-0 border border-[#D4D4D4]"></div>
      </div>
      
      {/* line */}
      <div className="pt-4">
        <div className="h-full w-0 border border-[#D4D4D4]"></div>
      </div>

      {/* right */}
      <div className="lg:w-2/3  ">
        <div className="lg:p-14 p-5 lg:space-y-16 space-y-8">
          {/* text */}
          <div className="lg:space-y-8 space-y-4">
            <p className="text-3xl text-brown poppins-light poppins-extrabold font-bold">
              SHIPPING INFORMATION
            </p>
            <p className="text-sm text-brown">
              Please check berofe you finalize your order
            </p>
          </div>
          {/* cards */}
          <div className="bg-brown ">
            <div className="p-3 space-y-4">
              <div className="flex flex-row justify-between">
                <p className="text-l poppins-extrabold text-white">Shoaib Ali</p>
                <a href="">
                  <img src={Shippingpencilalt} alt="" />
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm poppins-light text-white">(480) 555-0103</p>
                <p className="text-sm poppins-light text-white">
                  2972 H Block Johar Town Lahore{" "}
                </p>
              </div>
              {/* line */}
              <div className="h-0 w-full border border-white"></div>
              <div className="flex flex-row">
                <div className="flex-1">
                  <p className="font-bold text-white poppins-extrabold text-l">FedEx</p>
                  <p className="text-white text-wrap poppins-light text-sm">
                    Estimated delivery time: Jul 20 - Aug 03
                  </p>
                </div>
                <div className="flex-1" >
                  <p className="text-sm text-white poppins-light text-right" >Free shipping</p>
                </div>
              </div>
            </div>
          </div>
          {/* line */}
          <div className="w-full h-0 border border-[#D4D4D4]" ></div>
          {/* text */}
          <div className="lg:space-y-8 space-y-8" >
            <p className="text-3xl text-brown poppins-bold font-bold" >PAYMENT METHOD</p>
            <p className="text-sm text-brown poppins-semibold " >Please check berofe you finalize your order</p>
          </div>
          {/* card */}
          <div className="bg-white flex flex-row justify-between p-5" >
            {/* mastercatrd */}
            <div className=" flex flex-row " >
              <img src={mastercard} alt="" />
              <div className="flex flex-col lg:px-4 px-2" >
                <p className="text-brown text-l poppins-regular font-bold" >Credit Card</p>
                <p className="text-brown poppins-extralight text-sm" > **** 7282 - Expired 8/2022</p>
              </div>
            </div>
            {/* icon */}
            <div className="" >
              <img src={pencilaltBlack} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Summary display line
const SummaryItem = ({ label, value, highlight = false }) => (
  <div className="flex justify-between">
    <p className="text-[#7E7F7C] font-lato text-base">{label}</p>
    <p className={`font-lato text-[20px] font-extrabold ${highlight ? 'text-yellow' : 'text-[#362D2C]'}`}>
      {value}
    </p>
  </div>
);

export default ShopShipping;