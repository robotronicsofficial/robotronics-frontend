import { Mail, MapPin, Phone } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

import { BrandIcon } from "../../components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FormSelect } from "../../components/forms/FormControls";
import FloatingField from "../../components/forms/FloatingField";
import { useContactRequestMutation } from "../../hooks/useIntake";

const CONTACT_SERVICES = {
  school: [
    "Learning Subscription",
    "Robotics Curriculum Integration",
    "Teacher Training Program",
    "After-School Robotics Club",
    "STEM Lab Setup Consultation",
    "Competition Preparation",
  ],
  parent: [
    "Learning Subscription",
    "Weekend Robotics Classes",
    "Holiday Robotics Camps",
    "One-on-One Tutoring",
    "Robotics Kit Purchase Guidance",
    "Competition Registration Assistance",
  ],
};

const CONTACT_USER_TYPES = [
  { value: "school", label: "School" },
  { value: "parent", label: "Parent" },
];

const CONTACT_METHODS = [
  { Icon: Phone, label: "+92 309-422-4016" },
  { Icon: Mail, label: "info@robotronics.com" },
  {
    Icon: MapPin,
    label: "Alexandru Ioan Cuza Street, Nr. 14, Gullberg 3, Lahore - Pakistan",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/robotronicspakistan/",
    brand: "facebook",
    className: "hover:bg-info",
  },
  {
    href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
    brand: "youtube",
    className: "hover:bg-destructive",
  },
  {
    href: "https://www.instagram.com/robotronicspk/?hl=en",
    brand: "instagram",
    className: "hover:bg-accent/80",
  },
  {
    href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
    brand: "linkedin",
    className: "hover:bg-info",
  },
  {
    href: "https://wa.me/message/TKZZPIE2A34UM1",
    brand: "whatsapp",
    className: "hover:bg-success",
  },
];

const ContactMethod = ({ Icon, label }) => (
  <div className="flex gap-2">
    <div className="rounded-full p-2">
      <Icon className="text-foreground" />
    </div>
    <p className="self-center text-wrap text-2xl poppins-light">{label}</p>
  </div>
);

ContactMethod.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const SocialLink = ({ brand, className, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`rounded-xl border border-border bg-foreground p-1 transition-colors duration-300 ease-out lg:p-3 ${className}`}
  >
    <BrandIcon brand={brand} className="text-background" />
  </a>
);

SocialLink.propTypes = {
  brand: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const ContactUsForm = () => {
  const contactRequestMutation = useContactRequestMutation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    userType: "",
    schoolName: "",
    address: "",
    city: "",
    message: "",
    selectedServices: [],
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "userType" && { selectedServices: [] }),
    });
  };

  const handleServiceToggle = (service) => {
    setFormData((prevData) => {
      const newSelectedServices = prevData.selectedServices.includes(service)
        ? prevData.selectedServices.filter((s) => s !== service)
        : [...prevData.selectedServices, service];
      
      return {
        ...prevData,
        selectedServices: newSelectedServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await contactRequestMutation.mutateAsync(formData);

      setStatus(result?.message || "Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        userType: "",
        schoolName: "",
        address: "",
        city: "",
        message: "",
        selectedServices: [],
      });
    } catch (submitError) {
      setStatus(`Error: ${submitError.message || "An error occurred while sending the message."}`);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-background p-8 lg:p-20">
      <div className="flex flex-col gap-10">
        <Separator data-aos="fade-up" />
        <Button
          type="button"
          variant="outline"
          className="h-auto rounded-full px-5 p-2 poppins-light"
          data-aos="fade-up"
        >
          Get In Touch
        </Button>
      </div>

      <div className="justify-between lg:flex">
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-10">
            <h1 className="text-5xl poppins-bold text-foreground" data-aos="fade-up">Contact Us</h1>
            <p className="text-xl poppins-light text-wrap" data-aos="fade-up">
              Get in touch with us today to start your Robotics journey...
            </p>
          </div>

          <div className="flex flex-col gap-2 py-5" data-aos="fade-up">
            {CONTACT_METHODS.map((method) => (
              <ContactMethod key={method.label} {...method} />
            ))}
          </div>

          <div className="flex gap-2 p-5 py-8 lg:gap-5 lg:py-20">
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div>
          <Separator orientation="vertical" className="h-4/5" data-aos="fade-up" />
        </div>

        <div className="lg:w-1/2 p-5">
          <form onSubmit={handleSubmit} className="w-full">
            <FloatingField
              type="text"
              name="name"
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FloatingField
              type="tel"
              name="phone"
              id="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <FloatingField
              type="email"
              name="email"
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FloatingField
              type="text"
              name="city"
              id="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <FormSelect
              name="userType"
              label="I am a..."
              value={formData.userType}
              onChange={handleChange}
              options={CONTACT_USER_TYPES}
              required
            />

            {formData.userType === "school" && (
              <FloatingField
                type="text"
                name="schoolName"
                id="schoolName"
                label="School Name"
                value={formData.schoolName}
                onChange={handleChange}
                required
              />
            )}

            <FloatingField
              type="text"
              name="address"
              id="address"
              label={formData.userType === "school" ? "School Address" : "Your Address"}
              value={formData.address}
              onChange={handleChange}
              required
            />

            {formData.userType && (
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-sm text-muted-foreground">
                  Services I'm interested in:
                </Label>
                <div className="flex flex-col gap-2">
                  {CONTACT_SERVICES[formData.userType].map((service) => (
                    <Label
                      key={service}
                      htmlFor={`service-${service}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        id={`service-${service}`}
                        checked={formData.selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      {service}
                    </Label>
                  ))}
                </div>
              </div>
            )}

            <FloatingField
              as="textarea"
              name="message"
              id="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            {status && (
              <div
                className={`mb-5 rounded p-3 ${
                  status.includes("Error") ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                }`}
              >
                {status}
              </div>
            )}

            <div className="text-end p-5" data-aos="fade-up">
              <Button
                type="submit"
                disabled={contactRequestMutation.isPending}
                className="h-auto justify-between rounded-md bg-foreground p-2 px-3 text-background poppins-light hover:bg-primary hover:text-foreground"
              >
                {contactRequestMutation.isPending ? "Sending..." : "Send Now"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <Separator data-aos="fade-up" />
      </div>
    </div>
  );
};

export default ContactUsForm;
