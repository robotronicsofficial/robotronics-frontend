import React from 'react'
// import Header from "../../../component/header";
import Header from '../../../component/header';
// import CartsStep from "../../../component/shop/steps.jsx/cartsStep";
// import Robogeniuscustomercart from "./Robogeniuscustomercart";
// import Robogeniuscustomercart from '../RogoGeniusRegister/Robogeniuscustomercart';
// import Robogeniuspaymentcustomercart from './Robogeniuspaymentcustomercart';
import Robogeniuspaymentcustomercart from './Robogeniuspaymentcustomercart';

const Robogeniuspaymentcart = () => {
  return (
    <div>
      <div className="shopCarthero" id="shopCarthero">
      <div className="p-5">
        <Header />
      </div>
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <p className="text-brown font-bold text-wrap lg:text-4xl text-2xl poppins-bold text-center self-center ">
            Payment Process
          </p>
          <p className="text-brown text-sm text-wrap text-center poppins-semibold self-center mt-4 text-light opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className="self-center"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          {/* <Robogeniuscustomercart /> */}
          <Robogeniuspaymentcustomercart/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Robogeniuspaymentcart


