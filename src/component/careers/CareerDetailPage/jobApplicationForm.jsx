import { useRef, useState } from "react";

import { BACKEND_BASE_URL } from "../../../lib/api";
const JobApplicationForm = ({ job = null }) => {
  const fileInputRef = useRef(null);
  const jobId = job?._id || "";
  const jobTitle = job?.title || job?.position || "";
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    education: "",
    workExperience: "",
    skills: "",
    cvFile: null,
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (!jobId || !jobTitle) {
        throw new Error("Please apply from a specific job listing.");
      }

      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("jobTitle", jobTitle);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("streetAddress", form.streetAddress);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("postalCode", form.postalCode);
      formData.append("education", form.education);
      formData.append("workExperience", form.workExperience);
      formData.append("skills", form.skills);
      formData.append("coverLetter", form.coverLetter);

      if (form.cvFile) {
        formData.append("cvFile", form.cvFile);
      }

      const response = await fetch(`${BACKEND_BASE_URL}/cvForm`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to submit application");
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        education: "",
        workExperience: "",
        skills: "",
        cvFile: null,
        coverLetter: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatus({
        type: "success",
        message: data.message || "Application submitted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to submit application.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; 
    setForm((prevForm) => ({
      ...prevForm,
      cvFile: file, 
    }));
  };

  return (
    <>
    <div className="space-y-5 mx-10 my-8 lg:px-24"  >
          <h1 className="text-4xl poppins-bold text-brown"data-aos="fade-up"  >Job Application</h1>
          <h2 className="text-xl poppins-light text-brown"data-aos="fade-up"  >
            Submit your details and CV for {jobTitle || "the selected role"}
          </h2>
        </div>
    {!jobId || !jobTitle ? (
      <div className="mx-auto max-w-4xl rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Open a specific job listing before submitting an application so the role is attached to your CV.
      </div>
    ) : null}
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-background p-6 max-w-4xl mx-auto"
    >
      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Email Address"
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="streetAddress" className="block text-sm text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            id="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Street Address"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={form.city}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="City"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm text-gray-700">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={form.state}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="State"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="p-3 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Postal Code"
            required
          />
        </div>
      </div>

      {/* Experience */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="workExperience" className="block text-sm text-gray-700">
            Work Experience
          </label>
          <textarea
            name="workExperience"
            id="workExperience"
            value={form.workExperience}
            onChange={handleChange}
            className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Describe your work experience"
            required
          ></textarea>
        </div>
      </div>

      {/* Education */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="education" className="block text-sm text-gray-700">
            Education
          </label>
          <textarea
            name="education"
            id="education"
            value={form.education}
            onChange={handleChange}
            className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Describe your educational background"
            required
          ></textarea>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="skills" className="block text-sm text-gray-700">
            Skills
          </label>
          <textarea
            name="skills"
            id="skills"
            value={form.skills}
            onChange={handleChange}
            className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="List your skills"
            required
          ></textarea>
        </div>
      </div>

      {/* CV Upload */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="cvFile" className="block text-sm text-gray-700">
            Upload CV
          </label>
          <input
            type="file"
            name="cvFile"
            id="cvFile"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="coverLetter" className="block text-sm text-gray-700">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Optional cover letter"
          ></textarea>
        </div>
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

      {/* Submit */}
      <div className="mt-6 space-y-4">
        <button
          type="submit"
          className="bg-brown text-white py-2 px-4 rounded-md shadow-sm hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
    </>
  );
};

export default JobApplicationForm;
