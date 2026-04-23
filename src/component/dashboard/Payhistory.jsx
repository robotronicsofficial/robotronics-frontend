import React, { useEffect, useState } from "react";
import LeftNav from "./leftNav";
import { useAuth } from "../../contexts/AuthContext";
import { fetchSessionJson } from "../../lib/api";
import { openExternalUrl } from "../../utils/openExternalUrl";

const resolveInvoiceUrl = (payment = {}) =>
  payment.invoiceUrl || payment.invoiceDownloadUrl || payment.downloadUrl || "";

const PayHistory = () => {
  const { currentUser } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayHistory = async () => {
      try {
        if (!currentUser?._id) {
          setInvoices([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError("");
        const result = await fetchSessionJson("/api/getPayments");
        setInvoices(Array.isArray(result) ? result : []);
      } catch (requestError) {
        console.error("Error fetching payments:", requestError);
        setInvoices([]);
        setError(requestError.message || "Failed to fetch payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayHistory();
  }, [currentUser]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20 pt-44 md:pt-2">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-8">My Payment History</h1>
        <p className="mb-6 max-w-3xl text-sm text-gray-600">
          Only backend payment records appear here. Checkout details saved in the public storefront stay in your browser and do not create an invoice until the backend records a payment.
        </p>

        {loading ? (
          <p className="text-gray-600">Loading payment history...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : invoices.length === 0 ? (
          <p className="text-gray-600">No backend payment records were found for this account.</p>
        ) : (
          invoices.map((invoice, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6 border border-gray-200">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mb-3 sm:mb-4">
                {[currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") || "User"}
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full">
                  <div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Payment ID</p>
                    <p className="text-xs sm:text-sm md:text-base">{invoice.paymentId || "Not available"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Invoice ID</p>
                    <p className="text-xs sm:text-sm md:text-base">{invoice.invoiceId || "Not available"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Service</p>
                    <p className="text-xs sm:text-sm md:text-base">{invoice.service || "Not available"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Paid at</p>
                    <p className="text-xs sm:text-sm md:text-base">
                      {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Amount</p>
                    <p className="text-xs sm:text-sm md:text-base">Rs {invoice.amount}/-</p>
                  </div>
                </div>

                <div className="flex sm:items-center justify-end sm:justify-start mt-2 sm:mt-0 sm:pl-4">
                  <button
                    type="button"
                    className={`px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm md:text-base font-medium rounded-lg transition-colors whitespace-nowrap ${
                      resolveInvoiceUrl(invoice)
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!resolveInvoiceUrl(invoice)}
                    onClick={() => {
                      const invoiceUrl = resolveInvoiceUrl(invoice);
                      if (!invoiceUrl || !openExternalUrl(invoiceUrl)) {
                        setError("This payment record does not include a downloadable invoice link.");
                      }
                    }}
                  >
                    {resolveInvoiceUrl(invoice) ? "Open Invoice" : "Invoice Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PayHistory;
