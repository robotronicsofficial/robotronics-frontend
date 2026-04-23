import CustomerOrder from "../../../component/shop/customerOrder";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { BACKEND_BASE_URL } from "../../../lib/api";
const buildCurrentUserName = (currentUser) => (
  [
    currentUser?.firstName,
    currentUser?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() ||
  currentUser?.name ||
  currentUser?.username ||
  ""
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

const Giftbody = ({ onNext }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart } = useSelector((state) => state.cart);
  const [form, setForm] = useState(() => buildInitialForm(currentUser));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const cartItems = cart
        .filter((item) => item.itemType === "course")
        .map((item) => ({
          itemType: item.itemType || "",
          itemId: item.itemId || "",
          quantity: Number(item.quantity) || 0,
        }))
        .filter((item) => item.itemType && item.itemId && item.quantity > 0);

      if (!cartItems.length) {
        throw new Error("Add at least one course to your cart before sending a gift request.");
      }

      const response = await fetch(
        `${BACKEND_BASE_URL}/api/gift-courses`,
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit gift course");
      }

      setForm(buildInitialForm(currentUser));
      setStatus({
        type: "success",
        message: data.message || "Gift details submitted successfully.",
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
    <div>
      <div className="lg:flex flex-row bg-gray px-4 md:px-0">
        <div className="flex flex-col md:w-4/5 ">
          {/* left */}
          <div className="w-full ">
            {/* Header */}
            <div className="space-y-5 py-8 ">
              <h1 className="md:text-4xl text-2xl poppins-bold text-brown px-6 md:px-20">
                Gift Request Details
              </h1>
            </div>
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50 p-6 max-w-4xl mx-auto rounded-md"
            >
              {/* Recipient Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="senderName"
                    className="block text-xl poppins-regular text-brown"
                  >
                    Your Name:
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    value={form.senderName}
                    onChange={handleChange}
                    className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="senderEmail"
                    className="block text-xl poppins-regular text-brown"
                  >
                    Your Email:
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    id="senderEmail"
                    value={form.senderEmail}
                    onChange={handleChange}
                    className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="senderPhone"
                  className="block text-xl poppins-regular text-brown"
                >
                  Your Phone:
                </label>
                <input
                  type="tel"
                  name="senderPhone"
                  id="senderPhone"
                  value={form.senderPhone}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="0300 1234567"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-xl poppins-regular  text-brown"
                >
                  Recipient’s Name:
                </label>
                <input
                  type="text"
                  name="recipientName"
                  id="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="First Name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="recipientEmail"
                  className="block text-xl poppins-regular  text-brown"
                >
                  Recipient’s Email:
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  id="recipientEmail"
                  value={form.recipientEmail}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Send Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-xl poppins-regular text-brown"
                >
                  Send Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={form.date}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xl poppins-regular text-brown"
                >
                  Your Message (optional):
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full h-40 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Add your message"
                ></textarea>
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

              {/* Submit Button */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="text-center lg:text-xl text-sm poppins-bold text-[#807D7E] bg-white py-2 lg:px-12 px-5 rounded-lg"
                  onClick={() => navigate("/Robogeniushome")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-center lg:text-xl text-sm poppins-bold text-white bg-brown py-2 lg:px-12 px-5 rounded-lg disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Gift"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* line */}
        <div
          className="px-1"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          <div className="h-full w-0 border border-brown"></div>
        </div>
        {/* right */}
        <CustomerOrder onNext={onNext} showContinueButton={false} />
      </div>
    </div>
  );
};

export default Giftbody;
