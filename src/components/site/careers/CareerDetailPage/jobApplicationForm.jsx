import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/forms/FormControls";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/typography";
import { useJobApplicationMutation } from "@/hooks/useIntake";
import { cn } from "@/lib/utils";

const INITIAL_FORM = {
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

const JobApplicationForm = ({ job = null }) => {
  const fileInputRef = useRef(null);
  const jobId = job?._id || "";
  const jobTitle = job?.title || job?.position || "";
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "", message: "" });
  const jobApplicationMutation = useJobApplicationMutation();
  const isSubmitting = jobApplicationMutation.isPending;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, cvFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!jobId || !jobTitle) {
      setStatus({ type: "error", message: "Please apply from a specific job listing." });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("jobTitle", jobTitle);
      Object.entries(form).forEach(([key, value]) => {
        if (key === "cvFile") return;
        formData.append(key, value);
      });
      if (form.cvFile) {
        formData.append("cvFile", form.cvFile);
      }

      const data = await jobApplicationMutation.mutateAsync(formData);
      setForm(INITIAL_FORM);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setStatus({
        type: "success",
        message: data.message || "Application submitted. We'll be in touch.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to submit application.",
      });
    }
  };

  if (!jobId || !jobTitle) {
    return (
      <Text className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-destructive">
        Open a specific job listing before submitting an application so the role is attached to your CV.
      </Text>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
        <FormInput label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
        <FormInput label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
      </div>

      <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
      <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} required />

      <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
        <FormInput label="Street address" name="streetAddress" value={form.streetAddress} onChange={handleChange} required />
        <FormInput label="City" name="city" value={form.city} onChange={handleChange} required />
        <FormInput label="State" name="state" value={form.state} onChange={handleChange} required />
        <FormInput label="Postal code" name="postalCode" value={form.postalCode} onChange={handleChange} required />
      </div>

      <FormTextarea label="Work experience" name="workExperience" value={form.workExperience} onChange={handleChange} required />
      <FormTextarea label="Education" name="education" value={form.education} onChange={handleChange} required />
      <FormTextarea label="Skills" name="skills" value={form.skills} onChange={handleChange} required />

      <FormInput
        label="CV (PDF or Word)"
        type="file"
        name="cvFile"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx"
        required
      />

      <FormTextarea
        label="Cover letter"
        name="coverLetter"
        value={form.coverLetter}
        onChange={handleChange}
        placeholder="Optional — what should we know that's not on your CV?"
      />

      {status.message && (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={cn(
            "rounded-lg border px-4 py-3 text-body-sm",
            status.type === "success"
              ? "border-success/40 bg-success/10 text-success"
              : "border-destructive/40 bg-destructive/10 text-destructive",
          )}
        >
          {status.message}
        </p>
      )}

      <Button type="submit" size="marketing" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner />
            Submitting…
          </>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
};

JobApplicationForm.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    position: PropTypes.string,
  }),
};

export default JobApplicationForm;
