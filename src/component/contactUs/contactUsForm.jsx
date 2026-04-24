import {
  FaPhoneAlt,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { TfiEmail } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";

import FloatingField from "../../components/forms/FloatingField";
import { sendJson } from "../../lib/api";

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
  { Icon: FaPhoneAlt, label: "+92 309-422-4016" },
  { Icon: TfiEmail, label: "info@robotronics.com" },
  {
    Icon: FaLocationDot,
    label: "Alexandru Ioan Cuza Street, Nr. 14, Gullberg 3, Lahore - Pakistan",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/robotronicspakistan/",
    Icon: FaFacebook,
    className: "hover:bg-blue-800",
  },
  {
    href: "https://www.youtube.com/channel/UCx_R7IwRAVvphBpI0DCvCXw",
    Icon: FaYoutube,
    className: "hover:bg-red-600",
  },
  {
    href: "https://www.instagram.com/robotronicspk/?hl=en",
    Icon: FaInstagram,
    className: "hover:bg-pink-600",
  },
  {
    href: "https://www.linkedin.com/company/robotronicspakistan/posts/?feedView=all",
    Icon: FaLinkedin,
    className: "hover:bg-blue-600",
  },
  {
    href: "https://wa.me/message/TKZZPIE2A34UM1",
    Icon: FaWhatsapp,
    className: "hover:bg-green-500",
  },
];

const ContactMethod = ({ Icon, label }) => (
  <div className="flex gap-2">
    <div className="rounded-full p-2">
      <Icon className="text-brown" />
    </div>
    <p className="self-center text-wrap text-2xl poppins-light">{label}</p>
  </div>
);

ContactMethod.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const SocialLink = ({ Icon, className, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`rounded-xl bg-brown p-1 shadow-md transition-colors duration-300 ease-out hover:shadow-lg lg:p-3 ${className}`}
  >
    <Icon className="text-white" />
  </a>
);

SocialLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const ContactUsForm = () => {
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
      const result = await sendJson("/contact", {
        method: "POST",
        body: formData,
      });

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
        <div className="w-full border border-lin " data-aos="fade-up"></div>
        <button
          type="button"
          className="border border-lightbrown poppins-light p-2 rounded-full px-5"
          data-aos="fade-up"
        >
          Get In Touch
        </button>
      </div>

      <div className="justify-between lg:flex">
        <div className="lg:w-2/3">
          <div className="flex flex-col gap-10">
            <h1 className="text-5xl poppins-bold text-brown" data-aos="fade-up">Contact Us</h1>
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
          <div className="h-4/5 w-0 border border-lin" data-aos="fade-up"></div>
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
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
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
                  status.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {status}
              </div>
            )}

            <div className="text-end p-5" data-aos="fade-up">
              <button
                type="submit"
                className="justify-between rounded-md bg-brown p-2 px-3 text-white poppins-light hover:bg-yellow hover:text-brown"
              >
                Send Now
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="h-0 w-full border border-lin" data-aos="fade-up"></div>
      </div>
    </div>
  );
};

export default ContactUsForm;
