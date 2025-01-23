import React from "react";
// import CustomerOrder from "../../component/shop/customerOrder";
// import CustomerOrder from "../../../component/shop/customerOrder";
import CustomerOrder from "../../../component/shop/customerOrder";
import { useState } from "react";

const Giftbody = ({ onNext }) => {
  const [form, setForm] = useState({
    recipientName: "",
    email: "",
    sendDate: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Gift details submitted successfully!");
  };

  return (
    <div>
      <div className="lg:flex flex-row bg-gray">
        <div className="flex flex-col lg:w-4/5 ">
          {/* left */}
          <div className="w-full">
            {/* Header */}
            <div className="space-y-5 py-8">
              <h1 className="lg:text-4xl text-2xl poppins-bold text-brown px-16">
                Recipient’s Information
              </h1>
            </div>
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50 p-6 max-w-4xl mx-auto rounded-md"
            >
              {/* Recipient Name */}
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
                  htmlFor="email"
                  className="block text-xl poppins-regular  text-brown"
                >
                  Recipient’s Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Send Date */}
              <div>
                <label
                  htmlFor="sendDate"
                  className="block text-xl poppins-regular  text-brown"
                >
                  When do you want to send this gift?
                </label>
                <input
                  type="date"
                  name="sendDate"
                  id="sendDate"
                  value={form.sendDate}
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

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5"
                //   onClick={onNext}
                >
                  Submit
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
        <CustomerOrder onNext={onNext} />
      </div>
    </div>
  );
};

export default Giftbody;
