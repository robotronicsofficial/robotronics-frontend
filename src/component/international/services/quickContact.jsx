import { useState } from "react";
import img from "../../../assets/images/IServicesQuickContact.svg";

import { useQuickContactRequestMutation } from "../../../hooks/useIntake";

const initialQuickContactForm = {
  name: "",
  email: "",
  course: "",
  phone: "",
  message: "",
};

const QuickContact = () => {
  const quickContactRequestMutation = useQuickContactRequestMutation();
  const [formData, setFormData] = useState(initialQuickContactForm);

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus("Please fill in all required fields.");
      return;
    }

    try {
      await quickContactRequestMutation.mutateAsync(formData);

      setStatus("Message sent successfully!");
      setFormData(initialQuickContactForm);
    } catch (error) {
      setStatus(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-background">
      <div className="flex p-10">
        <div
          className="flex-1 hidden md:block"
          data-aos="fade-up"


        >
          <img src={img} className="" alt="Contact Us Illustration" />
        </div>
        <div
          className="lg:px-32 flex-1"



        >
          <div>
            <h1 className="text-4xl text-left poppins-bold text-foreground">
              Quick Contact
            </h1>
            <p className="text-xl text-wrap poppins-regular text-left">
              Feel free to contact us through Twitter or Facebook if you prefer!
            </p>
          </div>
          <form className="flex flex-col py-5" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border-2 border-border p-3 w-full focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-2 border-border p-3 w-full focus:outline-none"
                required
              />
            </div>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course"
              className="border-2 border-border p-3 w-full focus:outline-none mt-4"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border-2 border-border p-3 w-full focus:outline-none mt-4"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="border-2 border-border p-3 w-full focus:outline-none mt-4"
              required
            />
            <button
              type="submit"
              disabled={quickContactRequestMutation.isPending}
              className="w-full text-background poppins-bold bg-primary font-bold py-3 mt-4"
            >
              {quickContactRequestMutation.isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
          {status && <p className="mt-4 text-red-500">{status}</p>}
        </div>
      </div>

    </div>
  );
};

export default QuickContact;
