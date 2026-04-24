import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "../../../components/forms/FormControls";
import { useJobApplicationMutation } from "../../../hooks/useIntake";

const initialApplicationForm = {
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
};

const ApplicationInput = (props) => (
  <FormInput {...props} />
);

const ApplicationTextarea = (props) => (
  <FormTextarea {...props} />
);

const JobApplicationForm = ({ job = null }) => {
  const fileInputRef = useRef(null);
  const jobId = job?._id || "";
  const jobTitle = job?.title || job?.position || "";
  const [form, setForm] = useState(initialApplicationForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const jobApplicationMutation = useJobApplicationMutation();
  const isSubmitting = jobApplicationMutation.isPending;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await jobApplicationMutation.mutateAsync(formData);

      setForm(initialApplicationForm);
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
    <div className="mx-10 my-8 flex flex-col gap-5 lg:px-24">
          <h1 className="text-4xl poppins-bold text-foreground"data-aos="fade-up"  >Job Application</h1>
          <h2 className="text-xl poppins-light text-foreground"data-aos="fade-up"  >
            Submit your details and CV for {jobTitle || "the selected role"}
          </h2>
        </div>
    {!jobId || !jobTitle ? (
      <div className="mx-auto max-w-4xl rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        Open a specific job listing before submitting an application so the role is attached to your CV.
      </div>
    ) : null}
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 bg-background p-6 max-w-4xl mx-auto"
    >
      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApplicationInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
        <ApplicationInput label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
      </div>

      {/* Email */}
      <div className="grid grid-cols-1">
        <ApplicationInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
      </div>

      {/* Phone */}
      <div className="grid grid-cols-1">
        <ApplicationInput label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApplicationInput label="Street Address" name="streetAddress" value={form.streetAddress} onChange={handleChange} placeholder="Street Address" required />
        <ApplicationInput label="City" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
        <ApplicationInput label="State" name="state" value={form.state} onChange={handleChange} placeholder="State" required />
        <ApplicationInput label="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" required />
      </div>

      {/* Experience */}
      <div className="grid grid-cols-1">
        <ApplicationTextarea label="Work Experience" name="workExperience" value={form.workExperience} onChange={handleChange} placeholder="Describe your work experience" required />
      </div>

      {/* Education */}
      <div className="grid grid-cols-1">
        <ApplicationTextarea label="Education" name="education" value={form.education} onChange={handleChange} placeholder="Describe your educational background" required />
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1">
        <ApplicationTextarea label="Skills" name="skills" value={form.skills} onChange={handleChange} placeholder="List your skills" required />
      </div>

      {/* CV Upload */}
      <div className="grid grid-cols-1">
        <div>
          <label htmlFor="cvFile" className="block text-sm text-muted-foreground">
            Upload CV
          </label>
          <FormInput
            type="file"
            name="cvFile"
            label="Upload CV"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <ApplicationTextarea label="Cover Letter" name="coverLetter" value={form.coverLetter} onChange={handleChange} placeholder="Optional cover letter" />
      </div>

      {status.message ? (
        <p
          className={`rounded-md px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {status.message}
        </p>
      ) : null}

      {/* Submit */}
      <div className="flex flex-col mt-6 gap-y-4">
        <Button
          type="submit"
          className="h-auto bg-foreground px-4 py-2 text-background"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
    </>
  );
};

export default JobApplicationForm;
