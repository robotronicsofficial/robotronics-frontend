import ShopPriceBar from "../shop/shopPriceBar";
import ShopList from "../shop/shopList";
import { useState } from "react";

const Shopfilter = () => {
  const [setOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!setOpen);
  };

  return (
    <div className="hidden lg:block">
      {/* All Products */}
      <div className="lg:pt-6 pt-3 text-lightblack">
        <div className="flex justify-between">
          <p className=" poppins-semibold lg:text-2xl text-xl">All PRODUCTS</p>
          <button className="lg:text-xl text-sm" onClick={handleClick}>
            {setOpen ? "+" : "-"}
          </button>
        </div>
        <div className="h-0 lg:w-56 w-44 border border-brown"></div>
        {setOpen && (
          <div>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Lego Robots
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Curriculum Books
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Arduino Robots
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Educational Toys
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Others
            </a>
          </div>
        )}
      </div>
      {/* Shipping */}
      <div className="lg:pt-20 pt-8">
        <div className="flex justify-between">
          <p className="text-bold font-bold lg:text-2xl text-xl">SHIPING</p>
          <button className="lg:text-xl text-sm" onClick={handleClick}>
            {setOpen ? "+" : "-"}
          </button>
        </div>
        <div className="h-0 lg:w-56 w-44 border border-brown"></div>
        {setOpen && (
          <div>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Lego WeDo 2.0
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Lego Mindstorms EV3
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Arduino based Robots
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
          <p className="text-bold font-bold lg:text-2xl text-xl">PRICE</p>
          <button className="lg:text-xl text-sm" onClick={handleClick}>
            {setOpen ? "+" : "-"}
          </button>
        </div>
        <div className="mb-8 border bg-brown border-brown"></div>
        <ShopPriceBar className="mt-4"/>
        <div className="flex space-x-2 justify-center">
          <p className=" text-black p-2 bg-white rounded text-center ">
            $0 - $2000
          </p>
          <button className=" hover:bg-gold p-2 bg-lightblack text-white">
            APPLY
          </button>
        </div>
      </div>
    
  );
};

export default Shopfilter;
