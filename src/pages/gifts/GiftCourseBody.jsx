import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import CustomerOrder from "@/components/site/shop/customerOrder";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { FormInput, FormTextarea } from "@/components/forms/FormControls";
import { useAuth } from "../../contexts/useAuth";
import { useGiftCourseRequestMutation } from "../../hooks/useIntake";
import { COURSE_PATH } from "../../router/paths";
import { selectCart, useCartStore } from "../../stores/cartStore";

const buildCurrentUserName = (currentUser) => (
  [
    currentUser?.firstName,
    currentUser?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim()
  || currentUser?.name
  || currentUser?.username
  || ""
);

const buildInitialForm = (currentUser = null) => ({
  senderName: buildCurrentUserName(currentUser),
  senderEmail: currentUser?.email || "",
  senderPhone: currentUser?.phone || "",
  recipientName: "",
  recipientEmail: "",
  date: new Date().toISOString().split("T")[0],
  message: "",
});

const buildGiftCartItems = (items) => (
  items
    .filter((item) => item.itemType === "course")
    .map((item) => ({
      itemType: item.itemType || "",
      itemId: item.itemId || "",
      quantity: Number(item.quantity) || 0,
    }))
    .filter((item) => item.itemType && item.itemId && item.quantity > 0)
);

const buildGiftCoursePayload = (form, cartItems) => ({
  senderName: form.senderName.trim(),
  senderEmail: form.senderEmail.trim(),
  senderPhone: form.senderPhone.trim(),
  recipientName: form.recipientName.trim(),
  recipientEmail: form.recipientEmail.trim(),
  date: form.date,
  message: form.message.trim(),
  cartItems,
});

const GiftCourseBody = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const cart = useCartStore(selectCart);
  const [form, setForm] = useState(() => buildInitialForm(currentUser));
  const [status, setStatus] = useState({ type: "", message: "" });
  const giftCourseRequestMutation = useGiftCourseRequestMutation();
  const courseItems = useMemo(
    () => cart.filter((item) => item.itemType === "course"),
    [cart],
  );
  const isSubmitting = giftCourseRequestMutation.isPending;

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      senderName: prevForm.senderName || buildCurrentUserName(currentUser),
      senderEmail: prevForm.senderEmail || currentUser.email || "",
      senderPhone: prevForm.senderPhone || currentUser.phone || "",
    }));
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const cartItems = buildGiftCartItems(courseItems);
      if (!cartItems.length) {
        throw new Error("Add at least one course before sending a gift request.");
      }

      const data = await giftCourseRequestMutation.mutateAsync(
        buildGiftCoursePayload(form, cartItems),
      );

      setForm(buildInitialForm(currentUser));
      setStatus({
        type: "success",
        message: data.message || "Gift request submitted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to submit gift course.",
      });
    }
  };

  return (
    <Container size="wide" className="pb-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <Heading level={2} className="text-h2">Gift request details</Heading>

          {!courseItems.length && (
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <Text tone="muted">
                  Choose at least one course before sending a gift request.
                </Text>
                <Button
                  type="button"
                  onClick={() => navigate({ to: COURSE_PATH })}
                >
                  Browse courses
                </Button>
              </CardContent>
            </Card>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                label="Your name"
                name="senderName"
                value={form.senderName}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <FormInput
                label="Your email"
                type="email"
                name="senderEmail"
                value={form.senderEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <FormInput
              label="Your phone"
              type="tel"
              name="senderPhone"
              value={form.senderPhone}
              onChange={handleChange}
              placeholder="0300 1234567"
              required
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                label="Recipient name"
                name="recipientName"
                value={form.recipientName}
                onChange={handleChange}
                placeholder="Recipient name"
                required
              />
              <FormInput
                label="Recipient email"
                type="email"
                name="recipientEmail"
                value={form.recipientEmail}
                onChange={handleChange}
                placeholder="recipient@example.com"
                required
              />
            </div>

            <FormInput
              label="Send date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <FormTextarea
              label="Your message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Add your message"
              controlClassName="h-40"
            />

            {status.message && (
              <Alert variant={status.type === "success" ? "default" : "destructive"}>
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: COURSE_PATH })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !courseItems.length}
              >
                {isSubmitting ? "Sending…" : "Send gift"}
              </Button>
            </div>
          </form>
        </div>

        <CustomerOrder
          itemsOverride={courseItems}
          showContinueButton={false}
        />
      </div>
    </Container>
  );
};

export default GiftCourseBody;
