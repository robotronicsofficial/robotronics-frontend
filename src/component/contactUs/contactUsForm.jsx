import { Mail, MapPin, Phone } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

import { BrandIcon } from "../../components/ui/brand-icons";
import FloatingField from "../../components/forms/FloatingField";
import { useContactRequestMutation } from "../../hooks/useIntake";

const CONTACT_SERVICES = {
  school: [
    "Course Membership",
    "Robotics Curriculum Integration",
    "Teacher Training Program",
    "After-School Robotics Club",
    "STEM Lab Setup Consultation",
    "Competition Preparation",
  ],
  parent: [
    "Course Membership",
    "Weekend Robotics Classes",
    "Holiday Robotics Camps",
    "One-on-One Tutoring",
    "Robotics Kit Purchase Guidance",
    "Competition Registration Assistance",
  ],
};

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
    className={`rounded-xl bg-foreground p-1 shadow-md transition-colors duration-300 ease-out hover:shadow-lg lg:p-3 ${className}`}
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
        <div className="w-full border border-border " data-aos="fade-up"></div>
        <button
          type="button"
          className="border border-border poppins-light p-2 rounded-full px-5"
          data-aos="fade-up"
        >
          Get In Touch
        </button>
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
          <div className="h-4/5 w-0 border border-border" data-aos="fade-up"></div>
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

            <FloatingField
              as="select"
              name="userType"
              id="userType"
              label="I am a..."
              labelClassName="text-lg"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="school">School</option>
              <option value="parent">Parent</option>
            </FloatingField>

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
              <div className="mb-5">
                <label className="block text-sm text-muted-foreground mb-2">
                  Services I'm interested in:
                </label>
                <div className="flex flex-col gap-2">
                  {CONTACT_SERVICES[formData.userType].map((service) => (
                    <div key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`service-${service}`}
                        checked={formData.selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="mr-2"
                      />
                      <label htmlFor={`service-${service}`} className="text-sm">
                        {service}
                      </label>
                    </div>
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
              <button
                type="submit"
                disabled={contactRequestMutation.isPending}
                className="justify-between rounded-md bg-foreground p-2 px-3 text-background poppins-light hover:bg-primary hover:text-foreground"
              >
                {contactRequestMutation.isPending ? "Sending..." : "Send Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="h-0 w-full border border-border" data-aos="fade-up"></div>
      </div>
    </div>
  );
};

export default ContactUsForm;
