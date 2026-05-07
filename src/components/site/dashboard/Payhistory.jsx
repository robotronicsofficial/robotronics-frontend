import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { usePayments } from "@/hooks/useAccount";
import { useFormatMoney } from "@/utils/formatPrice";

const resolveInvoiceUrl = (payment = {}) =>
  payment.invoiceUrl || payment.invoiceDownloadUrl || payment.downloadUrl || "";

const InvoiceField = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-caption uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <span className="text-body-sm font-medium text-foreground">{value || "—"}</span>
  </div>
);

const InvoiceCard = ({ invoice, fullName, onUnavailable }) => {
  const invoiceUrl = resolveInvoiceUrl(invoice);
  const formatMoney = useFormatMoney();
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <Text size="sm" weight="semibold" className="text-foreground">
            {fullName}
          </Text>
          <Text size="sm" weight="semibold" className="text-foreground">
            {formatMoney(invoice.amount)}
          </Text>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <InvoiceField label="Payment ID" value={invoice.paymentId} />
          <InvoiceField label="Invoice ID" value={invoice.invoiceId} />
          <InvoiceField label="Service" value={invoice.service} />
          <InvoiceField
            label="Paid"
            value={invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : null}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant={invoiceUrl ? "default" : "ghost"}
            disabled={!invoiceUrl}
            onClick={() => {
              if (!invoiceUrl || !openExternalUrl(invoiceUrl)) {
                onUnavailable();
              }
            }}
          >
            {invoiceUrl ? "Open invoice" : "Invoice unavailable"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PayHistory = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const {
    data: invoices = [],
    isLoading,
    error: paymentsError,
  } = usePayments(Boolean(currentUser?._id));
  const errorMessage = error || paymentsError?.message || "";
  const fullName =
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") || "Account holder";

  return (
    <DashboardLayout contentClassName="px-6">
      {isLoading ? (
        <Text tone="muted">Loading payment history…</Text>
      ) : errorMessage ? (
        <Alert variant="destructive" className="max-w-xl">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent>
            <Text tone="muted">
              No payments yet. Once you subscribe or buy something, your receipts show up here.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {invoices.map((invoice, index) => (
            <InvoiceCard
              key={invoice.paymentId || invoice.invoiceId || index}
              invoice={invoice}
              fullName={fullName}
              onUnavailable={() =>
                setError("This payment record does not include a downloadable invoice link.")
              }
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default PayHistory;
