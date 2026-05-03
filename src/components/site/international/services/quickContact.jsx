import { useState } from "react";

import img from "@/assets/images/IServicesQuickContact.svg";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    try {
      await quickContactRequestMutation.mutateAsync(formData);
      setStatus({ type: "success", message: "Message sent successfully." });
      setFormData(initialQuickContactForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <section className="bg-background py-16">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="hidden lg:block" data-aos="fade-up">
            <img src={img} alt="" className="w-full" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>Get in touch</Eyebrow>
              <Display size="md">Quick contact.</Display>
              <Text tone="muted">
                Send us a message and we&apos;ll get back to you shortly.
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <FormInput
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course"
              />
              <FormInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                controlClassName="h-32"
                required
              />
              <Button
                type="submit"
                size="marketing"
                disabled={quickContactRequestMutation.isPending}
              >
                {quickContactRequestMutation.isPending ? "Sending…" : "Send message"}
              </Button>
              {status && (
                <Alert variant={status.type === "success" ? "default" : "destructive"}>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuickContact;
