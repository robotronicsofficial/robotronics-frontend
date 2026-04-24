import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../contexts/useAuth";
import { openExternalUrl } from "../../utils/openExternalUrl";
import { usePayments } from "../../hooks/useAccount";

const resolveInvoiceUrl = (payment = {}) =>
  payment.invoiceUrl || payment.invoiceDownloadUrl || payment.downloadUrl || "";

const PayHistory = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const {
    data: invoices = [],
    isLoading: loading,
    error: paymentsError,
  } = usePayments(Boolean(currentUser?._id));
  const errorMessage = error || paymentsError?.message || "";

  return (
    <DashboardLayout>
        <h1 className="text-3xl font-bold mb-8">My Payment History</h1>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground-600">
          Only backend payment records appear here. Checkout details saved in the public storefront stay in your browser and do not create an invoice until the backend records a payment.
        </p>

        {loading ? (
          <p className="text-muted-foreground-600">Loading payment history...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : invoices.length === 0 ? (
          <p className="text-muted-foreground-600">No backend payment records were found for this account.</p>
        ) : (
          invoices.map((invoice, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6 border border-border-200">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-muted-foreground-800 mb-3 sm:mb-4">
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
                        : "bg-background-200 text-muted-foreground-500 cursor-not-allowed"
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
    </DashboardLayout>
  );
};

export default PayHistory;
