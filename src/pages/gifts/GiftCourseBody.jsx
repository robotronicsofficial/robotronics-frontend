import CustomerOrder from "@/components/site/shop/customerOrder";
import { useAuth } from "../../contexts/useAuth";
import { useGiftCourseRequestMutation } from "../../hooks/useIntake";
import { calculateCartSummary } from "../../lib/shopCheckout";
import { COURSE_PATH } from "../../router/paths";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { selectCart, useCartStore } from "../../stores/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormTextarea } from "@/components/forms/FormControls";

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
  const courseSummary = useMemo(
    () => calculateCartSummary(courseItems),
    [courseItems],
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
    <div className="bg-background px-4 md:px-0">
      <div className="lg:flex">
        <div className="flex flex-col md:w-4/5">
          <div className="w-full">
            <div className="flex flex-col gap-y-5 py-8">
              <h2 className="poppins-bold px-6 text-2xl text-foreground md:px-20 md:text-4xl">
                Gift Request Details
              </h2>
            </div>

            {!courseItems.length ? (
              <Card className="mx-auto mb-6 max-w-4xl rounded-md">
                <CardContent className="p-5">
                <p className="poppins-medium">
                  Choose at least one course before sending a gift request.
                </p>
                <Button
                  type="button"
                  className="mt-4 h-auto rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-primary"
                  onClick={() => navigate({ to: COURSE_PATH })}
                >
                  Browse Courses
                </Button>
                </CardContent>
              </Card>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-4xl flex-col gap-6 rounded-md bg-muted p-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput label="Your Name" name="senderName" value={form.senderName} onChange={handleChange} placeholder="Your name" required />

                <FormInput label="Your Email" type="email" name="senderEmail" value={form.senderEmail} onChange={handleChange} placeholder="you@example.com" required />
              </div>

              <FormInput label="Your Phone" type="tel" name="senderPhone" value={form.senderPhone} onChange={handleChange} placeholder="0300 1234567" required />

              <FormInput label="Recipient Name" name="recipientName" value={form.recipientName} onChange={handleChange} placeholder="Recipient name" required />

              <FormInput label="Recipient Email" type="email" name="recipientEmail" value={form.recipientEmail} onChange={handleChange} placeholder="recipient@example.com" required />

              <FormInput label="Send Date" type="date" name="date" value={form.date} onChange={handleChange} required />

              <FormTextarea label="Your Message" name="message" value={form.message} onChange={handleChange} placeholder="Add your message" controlClassName="h-40" />

              {status.message ? (
                <p
                  className={`rounded-md px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto rounded-lg bg-card px-5 py-2 text-sm text-muted-foreground poppins-bold lg:px-12 lg:text-xl"
                  onClick={() => navigate({ to: COURSE_PATH })}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-auto rounded-lg bg-foreground px-5 py-2 text-sm text-background poppins-bold lg:px-12 lg:text-xl"
                  disabled={isSubmitting || !courseItems.length}
                >
                  {isSubmitting ? "Sending..." : "Send Gift"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="px-1">
          <Separator orientation="vertical" className="bg-foreground" />
        </div>
        <CustomerOrder
          itemsOverride={courseItems}
          summaryOverride={courseSummary}
          showContinueButton={false}
        />
      </div>
    </div>
  );
};

export default GiftCourseBody;
