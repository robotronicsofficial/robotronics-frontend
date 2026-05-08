import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import CustomerOrder from "./customerOrder";
import CustomerProduct from "./customerProduct";
import OrderSummaryLine from "./OrderSummaryLine";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import {
  buildShopCheckoutIntentRequest,
  calculateCartSummary,
  clearShopCheckout,
  formatShopCurrency,
  hasCheckoutCustomer,
  hasCheckoutAddress,
  hasCheckoutPayment,
  loadShopCheckout,
} from "@/lib/shopCheckout";
import {
  getCommerceItemKey,
  hasShippableCommerceItems,
} from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { useSubmitShopCheckoutIntentMutation } from "@/hooks/useShopOrders";

const DetailRow = ({ label, value }) => (
  <div className="flex items-start gap-1.5 text-body-sm">
    <Text size="sm" weight="semibold">{label}:</Text>
    <Text size="sm" tone="muted">{value}</Text>
  </div>
);

const ShopShipping = ({ onEditCustomer, onEditPayment }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthLoading } = useAuth();
  const cart = useCartStore(selectCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const checkout = useMemo(() => loadShopCheckout(), []);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [submittedIntent, setSubmittedIntent] = useState(null);
  const submitShopCheckoutIntentMutation = useSubmitShopCheckoutIntentMutation();
  const summary = calculateCartSummary(cart);
  const requiresShipping = submittedIntent
    ? hasShippableCommerceItems(submittedIntent.items)
    : summary.requiresShipping;
  const customerReady = hasCheckoutCustomer(checkout.customer);
  const addressReady = hasCheckoutAddress(checkout.address, { requiresShipping });
  const paymentReady = hasCheckoutPayment(checkout.payment, { requiresShipping });
  const displayItems = submittedIntent?.items || cart;
  const displaySummary = submittedIntent?.pricing || summary;

  const handleEditCustomer = () => {
    if (onEditCustomer) {
      onEditCustomer();
      return;
    }
    navigate({ to: "/CustomerInfo" });
  };

  const handleEditPayment = () => {
    if (onEditPayment) {
      onEditPayment();
      return;
    }
    navigate({ to: "/ShippingService" });
  };

  const handleSubmitCheckoutIntent = async () => {
    if (isAuthLoading) {
      setSubmitStatus({
        type: "info",
        message: "Checking your account. Please try again in a moment.",
      });
      return;
    }

    if (!currentUser) {
      navigate({
        to: "/Login",
        search: { redirect: location.href },
      });
      return;
    }

    if (!customerReady || (requiresShipping && !addressReady)) {
      handleEditCustomer();
      return;
    }

    if (!paymentReady) {
      handleEditPayment();
      return;
    }

    setSubmitStatus({ type: "", message: "" });

    try {
      const data = await submitShopCheckoutIntentMutation.mutateAsync({
        ...buildShopCheckoutIntentRequest({ checkout, cart }),
      });

      setSubmittedIntent(data.checkoutIntent || null);
      setSubmitStatus({
        type: "success",
        message: data.message || "Checkout intent submitted successfully.",
      });
      clearShopCheckout();
      clearCart();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit checkout intent.",
      });
    }
  };

  const customerData = submittedIntent?.customer || {};
  const addressData = submittedIntent?.address || {};
  const paymentData = submittedIntent?.payment || {};

  const customerName =
    customerData.name ||
    `${checkout.customer?.firstName || ""} ${checkout.customer?.lastName || ""}`.trim();
  const customerPhone = customerData.phone || checkout.customer?.phone;
  const street = addressData.streetAddress || checkout.address?.streetAddress;
  const aptSuite = addressData.aptSuite || checkout.address?.aptSuite;
  const city = addressData.city || checkout.address?.city;
  const state = addressData.state || checkout.address?.state;
  const country = addressData.country || checkout.address?.country;
  const postalCode = addressData.postalCode || checkout.address?.postalCode;
  const deliveryInstruction =
    addressData.deliveryInstruction || checkout.address?.deliveryInstruction;
  const shippingService = paymentData.shippingService || checkout.payment?.shippingService;
  const paymentMethod = paymentData.paymentMethod || checkout.payment?.paymentMethod;
  const billingEmail = paymentData.billingEmail || checkout.payment?.billingEmail;
  const accountLast4 = paymentData.accountLast4 || checkout.payment?.accountLast4;
  const expiryMonth = paymentData.expiryMonth || checkout.payment?.expiryMonth;
  const expiryYear = paymentData.expiryYear || checkout.payment?.expiryYear;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={2} className="text-h3">Checkout summary</Heading>
          <Text tone="muted">
            Review the saved customer details, fulfillment requirements, and
            items for this checkout draft.
          </Text>
        </div>

        <Alert>
          <AlertDescription>
            {submittedIntent
              ? "This checkout request has been submitted to Robotronics for follow-up and CRM handling."
              : "Review the saved checkout details, then submit the order request so Robotronics can process it in CRM."}
          </AlertDescription>
        </Alert>

        {submitStatus.message && (
          <Alert variant={submitStatus.type === "success" ? "default" : "destructive"}>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <Heading level={3} className="text-h5">
                    {requiresShipping ? "Delivery details" : "Customer details"}
                  </Heading>
                  <Text size="sm" tone="muted">
                    {requiresShipping
                      ? "Saved customer and delivery details for this order."
                      : "Saved customer details for this digital order."}
                  </Text>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditCustomer}
                >
                  Edit
                </Button>
              </div>

              {customerReady || submittedIntent ? (
                <div className="flex flex-col gap-1.5">
                  {customerName && <Text weight="semibold">{customerName}</Text>}
                  {customerPhone && <Text size="sm" tone="muted">{customerPhone}</Text>}
                  {requiresShipping && (
                    <>
                      {street && <Text size="sm" tone="muted">{street}</Text>}
                      {aptSuite && <Text size="sm" tone="muted">{aptSuite}</Text>}
                      {(city || state || country) && (
                        <Text size="sm" tone="muted">
                          {[city, state, country].filter(Boolean).join(", ")}
                        </Text>
                      )}
                      {postalCode && <Text size="sm" tone="muted">{postalCode}</Text>}
                      {deliveryInstruction && (
                        <DetailRow label="Instruction" value={deliveryInstruction} />
                      )}
                    </>
                  )}
                  {!requiresShipping && (
                    <Text size="sm" tone="muted">
                      No shipping address is required for this order.
                    </Text>
                  )}
                </div>
              ) : (
                <Text size="sm" tone="muted">
                  No customer details are saved yet for this checkout.
                </Text>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <Heading level={3} className="text-h5">Payment details</Heading>
                  <Text size="sm" tone="muted">
                    Saved locally in this browser for the current checkout draft.
                  </Text>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditPayment}
                >
                  Edit
                </Button>
              </div>

              {paymentReady || submittedIntent ? (
                <div className="flex flex-col gap-1.5">
                  {requiresShipping && shippingService && (
                    <DetailRow label="Shipping service" value={shippingService} />
                  )}
                  {paymentMethod && (
                    <DetailRow label="Payment method" value={paymentMethod} />
                  )}
                  {billingEmail && (
                    <DetailRow label="Billing email" value={billingEmail} />
                  )}
                  {accountLast4 && (
                    <DetailRow label="Account ending" value={`•••• ${accountLast4}`} />
                  )}
                  {expiryMonth && expiryYear && (
                    <DetailRow label="Expiry" value={`${expiryMonth}/${expiryYear}`} />
                  )}
                </div>
              ) : (
                <Text size="sm" tone="muted">
                  No local payment details are saved yet for this checkout.
                </Text>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Heading level={3} className="text-h4">Order items</Heading>
            <Text size="sm" tone="muted">
              These items are currently in your cart and included in the checkout summary.
            </Text>
          </div>

          <div className="flex flex-col gap-3">
            {displayItems.length > 0 ? (
              displayItems.map((product) => (
                <Card key={getCommerceItemKey(product)} className="p-0">
                  <CardContent className="p-4">
                    <CustomerProduct
                      title={product.name}
                      item={product.quantity}
                      price={formatShopCurrency(product.price ?? product.unitPrice)}
                      priceLabel=""
                      imageClassName="object-cover h-20 w-24"
                      image={resolveBackendAssetUrl(
                        product?.image || product?.images?.[0],
                        "https://via.placeholder.com/300x200",
                      )}
                    />
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent>
                  <Text size="sm" tone="muted">Your cart is empty.</Text>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-3">
            <Heading level={3} className="text-h5">Totals</Heading>
            <OrderSummaryLine
              label="Subtotal"
              value={formatShopCurrency(displaySummary.subtotal)}
              labelClassName="text-body-sm text-muted-foreground"
              valueClassName="text-body font-medium"
            />
            <OrderSummaryLine
              label="Discount (10%)"
              value={`- ${formatShopCurrency(displaySummary.discount)}`}
              labelClassName="text-body-sm text-muted-foreground"
              valueClassName="text-body-sm"
            />
            <OrderSummaryLine
              label="Shipping"
              value={formatShopCurrency(displaySummary.shipping)}
              labelClassName="text-body-sm text-muted-foreground"
              valueClassName="text-body-sm"
            />
            <div className="border-t border-border pt-3">
              <OrderSummaryLine
                label="Total"
                value={formatShopCurrency(displaySummary.total)}
                labelClassName="text-body-sm text-muted-foreground"
                valueClassName="text-h5 font-semibold text-primary"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:sticky lg:top-24 lg:self-start">
        <CardContent className="p-0">
          <CustomerOrder
            onNext={handleSubmitCheckoutIntent}
            buttonDisabled={
              submitShopCheckoutIntentMutation.isPending || Boolean(submittedIntent)
            }
            buttonLabel={
              submittedIntent
                ? "Order request submitted"
                : submitShopCheckoutIntentMutation.isPending
                  ? "Submitting…"
                  : paymentReady
                    ? "Submit order request"
                    : "Add payment details"
            }
            itemsOverride={displayItems}
            summaryOverride={displaySummary}
          />
        </CardContent>
      </Card>
    </div>
  );
};

ShopShipping.propTypes = {
  onEditCustomer: PropTypes.func,
  onEditPayment: PropTypes.func,
};

export default ShopShipping;
