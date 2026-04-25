import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/useAuth";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { usePayments } from "@/hooks/useAccount";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          This is your payment history. New payments appear within a few minutes after completion.
        </p>

        {loading ? (
          <p className="text-muted-foreground">Loading payment history...</p>
        ) : errorMessage ? (
          <Alert variant="destructive" className="max-w-xl">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : invoices.length === 0 ? (
          <p className="text-muted-foreground">
            No payments yet. Once you subscribe or buy something, your receipts show up here.
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {invoices.map((invoice, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col gap-4 sm:gap-6">
                  <h3 className="text-base font-semibold text-muted-foreground sm:text-lg md:text-xl">
                    {[currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") || "User"}
                  </h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:grid-cols-5">
                      <div>
                        <p className="text-xs font-medium sm:text-sm md:text-base">Payment ID</p>
                        <p className="text-xs sm:text-sm md:text-base">{invoice.paymentId || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium sm:text-sm md:text-base">Invoice ID</p>
                        <p className="text-xs sm:text-sm md:text-base">{invoice.invoiceId || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium sm:text-sm md:text-base">Service</p>
                        <p className="text-xs sm:text-sm md:text-base">{invoice.service || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium sm:text-sm md:text-base">Paid at</p>
                        <p className="text-xs sm:text-sm md:text-base">
                          {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : "Not available"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium sm:text-sm md:text-base">Amount</p>
                        <p className="text-xs sm:text-sm md:text-base">Rs {invoice.amount}/-</p>
                      </div>
                    </div>

                    <div className="flex justify-end sm:items-center sm:justify-start sm:pl-4">
                      <Button
                        type="button"
	                        className={`whitespace-nowrap rounded-lg px-4 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-6 sm:py-2 sm:text-sm md:text-base ${
	                          resolveInvoiceUrl(invoice)
	                            ? "bg-primary text-primary-foreground hover:bg-accent hover:text-background"
	                            : "bg-muted text-muted-foreground cursor-not-allowed"
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
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </DashboardLayout>
  );
};

export default PayHistory;
