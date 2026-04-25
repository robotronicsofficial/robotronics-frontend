import { useState } from "react";
import img from "@/assets/images/IServicesQuickContact.svg";

import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/forms/FormControls";
import { useQuickContactRequestMutation } from "@/hooks/useIntake";

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
              <FormInput name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <FormInput
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course"
              className="mt-4"
            />
            <FormInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mt-4"
              required
            />
            <FormTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="mt-4"
              required
            />
            <Button
              type="submit"
              disabled={quickContactRequestMutation.isPending}
              className="mt-4 h-auto w-full bg-primary py-3 text-background poppins-bold"
            >
              {quickContactRequestMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
          {status && <p className="mt-4 text-destructive">{status}</p>}
        </div>
      </div>

    </div>
  );
};

export default QuickContact;
