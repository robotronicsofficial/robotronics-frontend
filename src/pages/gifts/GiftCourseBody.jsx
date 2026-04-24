import CustomerOrder from "../../component/shop/customerOrder";
import { useAuth } from "../../contexts/useAuth";
import { BACKEND_BASE_URL } from "../../lib/api";
import { calculateCartSummary } from "../../lib/shopCheckout";
import { COURSE_PATH } from "../../router/paths";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const GiftCourseBody = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart } = useSelector((state) => state.cart);
  const [form, setForm] = useState(() => buildInitialForm(currentUser));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const courseItems = useMemo(
    () => cart.filter((item) => item.itemType === "course"),
    [cart],
  );
  const courseSummary = useMemo(
    () => calculateCartSummary(courseItems),
    [courseItems],
  );

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
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const cartItems = buildGiftCartItems(courseItems);
      if (!cartItems.length) {
        throw new Error("Add at least one course before sending a gift request.");
      }

      const response = await fetch(`${BACKEND_BASE_URL}/api/gift-courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: form.senderName.trim(),
          senderEmail: form.senderEmail.trim(),
          senderPhone: form.senderPhone.trim(),
          recipientName: form.recipientName.trim(),
          recipientEmail: form.recipientEmail.trim(),
          date: form.date,
          message: form.message.trim(),
          cartItems,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit gift course");
      }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray px-4 md:px-0">
      <div className="lg:flex">
        <div className="flex flex-col md:w-4/5">
          <div className="w-full">
            <div className="space-y-5 py-8">
              <h2 className="poppins-bold px-6 text-2xl text-brown md:px-20 md:text-4xl">
                Gift Request Details
              </h2>
            </div>

            {!courseItems.length ? (
              <div className="mx-auto mb-6 max-w-4xl rounded-md bg-white p-5 text-brown">
                <p className="poppins-medium">
                  Choose at least one course before sending a gift request.
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-lg bg-brown px-5 py-3 text-sm font-semibold text-gold"
                  onClick={() => navigate(COURSE_PATH)}
                >
                  Browse Courses
                </button>
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-4xl space-y-6 rounded-md bg-gray-50 p-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="senderName" className="poppins-regular block text-xl text-brown">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    value={form.senderName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="senderEmail" className="poppins-regular block text-xl text-brown">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    id="senderEmail"
                    value={form.senderEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="senderPhone" className="poppins-regular block text-xl text-brown">
                  Your Phone
                </label>
                <input
                  type="tel"
                  name="senderPhone"
                  id="senderPhone"
                  value={form.senderPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="0300 1234567"
                  required
                />
              </div>

              <div>
                <label htmlFor="recipientName" className="poppins-regular block text-xl text-brown">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  id="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Recipient name"
                  required
                />
              </div>

              <div>
                <label htmlFor="recipientEmail" className="poppins-regular block text-xl text-brown">
                  Recipient Email
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  id="recipientEmail"
                  value={form.recipientEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="recipient@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="poppins-regular block text-xl text-brown">
                  Send Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="poppins-regular block text-xl text-brown">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 block h-40 w-full rounded-md border-gray-300 p-3 px-5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Add your message"
                />
              </div>

              {status.message ? (
                <p
                  className={`rounded-md px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="poppins-bold rounded-lg bg-white px-5 py-2 text-sm text-[#807D7E] lg:px-12 lg:text-xl"
                  onClick={() => navigate(COURSE_PATH)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="poppins-bold rounded-lg bg-brown px-5 py-2 text-sm text-white disabled:opacity-60 lg:px-12 lg:text-xl"
                  disabled={isSubmitting || !courseItems.length}
                >
                  {isSubmitting ? "Sending..." : "Send Gift"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="px-1">
          <div className="h-full w-0 border border-brown" />
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
