import { Mail, MapPin, Phone } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

import { BrandIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { FormSelect } from "@/components/forms/FormControls";
import FloatingField from "@/components/forms/FloatingField";
import {
  useContactOptionsQuery,
  useContactRequestMutation,
} from "@/hooks/useIntake";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SOCIAL_LINKS,
} from "@/lib/brandContact";
import { cn } from "@/lib/utils";

const buildGiftIntro = (plan, cycle) => {
  const cycleLabel = cycle === "annual" ? "annual" : cycle === "monthly" ? "monthly" : "";
  const planText = plan ? `the ${plan} plan` : "a learning plan";
  const cycleSuffix = cycleLabel ? ` (${cycleLabel} billing)` : "";
  return `Hi — I'd like to gift ${planText}${cycleSuffix}. Please tell me how to set this up and what details you'll need from me.`;
};

const CONTACT_METHODS = [
  { Icon: Phone, label: "Phone", value: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
  { Icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  {
    Icon: MapPin,
    label: "Office",
    value: CONTACT_ADDRESS,
  },
];

const ContactMethod = ({ Icon, label, value, href }) => {
  const content = (
    <>
      <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-caption uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-body-sm font-medium text-foreground">{value}</span>
      </div>
    </>
  );

  return href ? (
    <a href={href} className="flex items-center gap-3 transition-colors hover:text-primary">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  );
};

ContactMethod.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
};

const SocialLink = ({ brand, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
  >
    <BrandIcon brand={brand} />
  </a>
);

SocialLink.propTypes = {
  brand: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  userType: "",
  schoolName: "",
  address: "",
  city: "",
  message: "",
  selectedServiceCodes: [],
};

const ContactUsForm = () => {
  const contactOptionsQuery = useContactOptionsQuery();
  const contactRequestMutation = useContactRequestMutation();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const search = useSearch({ strict: false });

  useEffect(() => {
    if (search?.topic !== "gift") return;
    setFormData((prev) =>
      prev.message
        ? prev
        : {
            ...prev,
            userType: prev.userType || "parent",
            message: buildGiftIntro(search.plan, search.cycle),
          },
    );
  }, [search?.topic, search?.plan, search?.cycle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "userType" && { selectedServiceCodes: [] }),
    }));
  };

  const handleServiceToggle = (serviceCode) => {
    setFormData((prev) => ({
      ...prev,
      selectedServiceCodes: prev.selectedServiceCodes.includes(serviceCode)
        ? prev.selectedServiceCodes.filter((code) => code !== serviceCode)
        : [...prev.selectedServiceCodes, serviceCode],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await contactRequestMutation.mutateAsync(formData);
      setStatus({ kind: "success", message: result?.message || "Message sent. We'll be in touch shortly." });
      setFormData(INITIAL_FORM);
    } catch (submitError) {
      setStatus({
        kind: "error",
        message: submitError.message || "Something went wrong while sending your message.",
      });
    }
  };

  const contactOptions = contactOptionsQuery.data;
  const userTypeOptions = contactOptions?.userTypes ?? [];
  const serviceOptions = formData.userType
    ? contactOptions?.serviceOptions?.[formData.userType] ?? []
    : [];

  return (
    <section className="bg-background py-20 md:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Get in touch</Eyebrow>
              <Heading level={2} className="text-display-md">
                Tell us what you need.
              </Heading>
              <Text tone="muted">
                Schools, parents, partners — drop a note and we&apos;ll route it to the right person within a business day.
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              {CONTACT_METHODS.map((method) => (
                <ContactMethod key={method.label} {...method} />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-caption uppercase tracking-wide text-muted-foreground">
                Follow along
              </span>
              <ul className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.brand}>
                    <SocialLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-4">
              <FloatingField type="text" name="name" id="name" label="Name" value={formData.name} onChange={handleChange} autoComplete="name" required />
              <FloatingField type="email" name="email" id="email" label="Email" value={formData.email} onChange={handleChange} autoComplete="email" required />
              <FloatingField type="tel" name="phone" id="phone" label="Phone" value={formData.phone} onChange={handleChange} autoComplete="tel" required />
              <FloatingField type="text" name="city" id="city" label="City" value={formData.city} onChange={handleChange} autoComplete="address-level2" required />
            </div>

            <FormSelect
              name="userType"
              label="I am a..."
              value={formData.userType}
              onChange={handleChange}
              options={userTypeOptions}
              disabled={contactOptionsQuery.isLoading || contactOptionsQuery.isError}
              required
            />

            {formData.userType === "school" && (
              <FloatingField type="text" name="schoolName" id="schoolName" label="School name" value={formData.schoolName} onChange={handleChange} autoComplete="organization" required />
            )}

            <FloatingField
              type="text"
              name="address"
              id="address"
              label={formData.userType === "school" ? "School address" : "Your address"}
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />

            {formData.userType && (
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <Label className="text-caption uppercase tracking-wide text-muted-foreground">
                  Services I&apos;m interested in
                </Label>
                {contactOptionsQuery.isLoading ? (
                  <Text tone="muted">Loading service options…</Text>
                ) : contactOptionsQuery.isError ? (
                  <Text tone="muted">Service options are unavailable.</Text>
                ) : (
                  <div className="flex flex-col gap-2">
                    {serviceOptions.map((service) => (
                      <Label
                        key={service.code}
                        htmlFor={`service-${formData.userType}-${service.code}`}
                        className="flex items-center gap-2 text-body-sm font-normal"
                      >
                        <Checkbox
                          id={`service-${formData.userType}-${service.code}`}
                          checked={formData.selectedServiceCodes.includes(service.code)}
                          onCheckedChange={() => handleServiceToggle(service.code)}
                        />
                        {service.label}
                      </Label>
                    ))}
                  </div>
                )}
              </div>
            )}

            <FloatingField as="textarea" name="message" id="message" label="Message" value={formData.message} onChange={handleChange} required />

            {status && (
              <div
                role={status.kind === "error" ? "alert" : "status"}
                className={cn(
                  "rounded-lg border px-4 py-3 text-body-sm",
                  status.kind === "error"
                    ? "border-destructive/40 bg-destructive/10 text-destructive"
                    : "border-success/40 bg-success/10 text-success",
                )}
              >
                {status.message}
              </div>
            )}

            <Button
              type="submit"
              size="marketing"
              className="w-full"
              disabled={
                contactRequestMutation.isPending ||
                contactOptionsQuery.isLoading ||
                contactOptionsQuery.isError
              }
            >
              {contactRequestMutation.isPending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsForm;
