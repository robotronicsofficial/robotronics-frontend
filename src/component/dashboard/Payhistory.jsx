import React from "react";
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
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
      <div className="w-full md:w-3/4 p-4" >

        <h1 className="text-3xl font-bold mb-4">My Payment History</h1>
        <h3 className="text-xl mb-8">Payment Details </h3>
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow mb-6 border border-gray-200"
          >
            {/* Header with Name */}
            <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">
              {invoice.name}
            </h3>

            {/* Details Row */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
              {/* Left Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm md:text-base text-gray-600">
                <div>
                  <p className="font-medium">Payment ID</p>
                  <p>{invoice.paymentId}</p>
                </div>
                <div>
                  <p className="font-medium">Invoice ID</p>
                  <p>{invoice.invoiceId}</p>
                </div>
                <div>
                  <p className="font-medium">Service</p>
                  <p>{invoice.service}</p>
                </div>
                <div>
                  <p className="font-medium">Paid at</p>
                  <p>{invoice.paidAt}</p>
                </div>
                <div>
                  <p className="font-medium">Amount</p>
                  <p>{invoice.amount}</p>
                </div>
              </div>

              {/* Right Section (Button) */}
              <div className="mt-4 md:mt-0">
                <button className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600">
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
