// import React from "react";
import LeftNav from "./leftNav";

const PayHistory = () => {
  const invoices = [
    {
      name: "Hamza Noor",
      paymentId: "8980252445",
      invoiceId: "8980252445",
      service: "RoboGenius Program",
      paidAt: "2022-07-24",
      amount: "Rs 5000/-",
    },
    {
      name: "Hammad Ghazanfar",
      paymentId: "8980252445",
      invoiceId: "8980252445",
      service: "RoboGenius Program",
      paidAt: "2022-06-24",
      amount: "Rs 5000/-",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
      <div className="w-full md:w-3/4 p-4" >

        <h1 className="text-3xl font-bold mb-8">My Payment History</h1>
        {/* <h3 className="text-xl mb-8">Payment Details </h3> */}
        {invoices.map((invoice, index) => (
  <div
    key={index}
    className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6 border border-gray-200"
  >
    {/* Header with Name */}
    <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mb-3 sm:mb-4">
      {invoice.name}
    </h3>

    {/* Details Row */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Left Section - Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full">
        <div className="break-words">
          <p className="font-medium text-xs sm:text-sm md:text-base">Payment ID</p>
          <p className="text-xs sm:text-sm md:text-base">{invoice.paymentId}</p>
        </div>
        <div className="break-words">
          <p className="font-medium text-xs sm:text-sm md:text-base">Invoice ID</p>
          <p className="text-xs sm:text-sm md:text-base">{invoice.invoiceId}</p>
        </div>
        <div className="break-words">
          <p className="font-medium text-xs sm:text-sm md:text-base">Service</p>
          <p className="text-xs sm:text-sm md:text-base">{invoice.service}</p>
        </div>
        <div className="break-words">
          <p className="font-medium text-xs sm:text-sm md:text-base">Paid at</p>
          <p className="text-xs sm:text-sm md:text-base">{invoice.paidAt}</p>
        </div>
        <div className="break-words">
          <p className="font-medium text-xs sm:text-sm md:text-base">Amount</p>
          <p className="text-xs sm:text-sm md:text-base">{invoice.amount}</p>
        </div>
      </div>

      {/* Right Section (Button) - Now properly aligned */}
      <div className="flex sm:items-center justify-end sm:justify-start mt-2 sm:mt-0 sm:pl-4">
        <button className="px-4 sm:px-6 py-1 sm:py-2 bg-orange-500 text-white text-xs sm:text-sm md:text-base font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
          Download Invoice
        </button>
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default PayHistory;
