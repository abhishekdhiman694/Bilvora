"use client";

import { useId, useRef, useState } from "react";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000+",
  "Not sure yet",
];

const SERVICE_OPTIONS = services.map((service) => service.title);

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  estimatedBudget: string;
  projectDetails: string;
};

const initialState: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  serviceRequired: "",
  estimatedBudget: "",
  projectDetails: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function fieldClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-charcoal-2 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint",
    "focus:ring-2 focus:ring-electric-soft/25",
    hasError
      ? "border-destructive/60 focus:border-destructive/60"
      : "border-hairline focus:border-electric-soft/50",
  );
}

export function ContactForm({ className }: { className?: string }) {
  const formIdPrefix = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstErrorRef = useRef<HTMLElement | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): Partial<Record<keyof FormState, string>> {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Enter your full name.";
    if (!values.companyName.trim()) next.companyName = "Enter your company name.";
    if (!values.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!values.serviceRequired) next.serviceRequired = "Select a service.";
    if (!values.estimatedBudget) next.estimatedBudget = "Select an estimated budget.";
    if (!values.projectDetails.trim() || values.projectDetails.trim().length < 10) {
      next.projectDetails = "Tell us a little more about the project (10+ characters).";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (status === "submitting" || status === "success") return;

    // Honeypot: if filled, silently pretend success without submitting.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstErrorKey = Object.keys(nextErrors)[0] as keyof FormState | undefined;
    if (firstErrorKey) {
      const el = document.getElementById(`${formIdPrefix}-${firstErrorKey}`);
      el?.focus();
      firstErrorRef.current = el;
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project inquiry — ${values.companyName}`,
          from_name: "Bilvora Technologies Website",
          full_name: values.fullName,
          company_name: values.companyName,
          email: values.email,
          phone: values.phone || "Not provided",
          service_required: values.serviceRequired,
          estimated_budget: values.estimatedBudget,
          project_details: values.projectDetails,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("conversion", {
        type: "contact_form_submit",
        service: values.serviceRequired,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  }

  function reset() {
    setValues(initialState);
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-3xl border border-hairline bg-charcoal-2 p-10 text-center",
          className,
        )}
      >
        <CheckCircle2 className="size-10 text-electric-soft" aria-hidden />
        <div>
          <p className="text-xl font-medium text-ink">Message sent successfully.</p>
          <p className="mt-2 max-w-sm text-balance text-sm leading-relaxed text-ink-muted">
            Thank you! Your message has been sent successfully. We&apos;ll contact you
            within 24 hours.
          </p>
        </div>
        <PremiumButton onClick={reset} variant="secondary" icon={false} size="default">
          Send another message
        </PremiumButton>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
    >
      {/* Honeypot — hidden from sighted users, left open for bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`${formIdPrefix}-botcheck`}>Leave this field empty</label>
        <input
          ref={honeypotRef}
          id={`${formIdPrefix}-botcheck`}
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formIdPrefix}-fullName`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Full name
          </label>
          <input
            id={`${formIdPrefix}-fullName`}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formIdPrefix}-fullName-error` : undefined}
            className={fieldClasses(Boolean(errors.fullName))}
            placeholder="Jordan Lee"
          />
          {errors.fullName ? (
            <p id={`${formIdPrefix}-fullName-error`} className="mt-1.5 text-xs text-destructive">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formIdPrefix}-companyName`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Company name
          </label>
          <input
            id={`${formIdPrefix}-companyName`}
            name="companyName"
            type="text"
            autoComplete="organization"
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? `${formIdPrefix}-companyName-error` : undefined}
            className={fieldClasses(Boolean(errors.companyName))}
            placeholder="Acme Inc."
          />
          {errors.companyName ? (
            <p id={`${formIdPrefix}-companyName-error`} className="mt-1.5 text-xs text-destructive">
              {errors.companyName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formIdPrefix}-email`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Email
          </label>
          <input
            id={`${formIdPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formIdPrefix}-email-error` : undefined}
            className={fieldClasses(Boolean(errors.email))}
            placeholder="jordan@acme.com"
          />
          {errors.email ? (
            <p id={`${formIdPrefix}-email-error`} className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formIdPrefix}-phone`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Phone <span className="normal-case text-ink-faint/70">(optional)</span>
          </label>
          <input
            id={`${formIdPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClasses(false)}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label htmlFor={`${formIdPrefix}-serviceRequired`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Service required
          </label>
          <select
            id={`${formIdPrefix}-serviceRequired`}
            name="serviceRequired"
            value={values.serviceRequired}
            onChange={(e) => update("serviceRequired", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.serviceRequired)}
            aria-describedby={errors.serviceRequired ? `${formIdPrefix}-serviceRequired-error` : undefined}
            className={cn(fieldClasses(Boolean(errors.serviceRequired)), "appearance-none")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.serviceRequired ? (
            <p id={`${formIdPrefix}-serviceRequired-error`} className="mt-1.5 text-xs text-destructive">
              {errors.serviceRequired}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formIdPrefix}-estimatedBudget`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
            Estimated budget
          </label>
          <select
            id={`${formIdPrefix}-estimatedBudget`}
            name="estimatedBudget"
            value={values.estimatedBudget}
            onChange={(e) => update("estimatedBudget", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.estimatedBudget)}
            aria-describedby={errors.estimatedBudget ? `${formIdPrefix}-estimatedBudget-error` : undefined}
            className={cn(fieldClasses(Boolean(errors.estimatedBudget)), "appearance-none")}
          >
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.estimatedBudget ? (
            <p id={`${formIdPrefix}-estimatedBudget-error`} className="mt-1.5 text-xs text-destructive">
              {errors.estimatedBudget}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={`${formIdPrefix}-projectDetails`} className="mb-2 block text-xs uppercase tracking-[0.18em] text-ink-faint">
          Project details
        </label>
        <textarea
          id={`${formIdPrefix}-projectDetails`}
          name="projectDetails"
          rows={5}
          value={values.projectDetails}
          onChange={(e) => update("projectDetails", e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.projectDetails)}
          aria-describedby={errors.projectDetails ? `${formIdPrefix}-projectDetails-error` : undefined}
          className={cn(fieldClasses(Boolean(errors.projectDetails)), "resize-none")}
          placeholder="What are you building, and what does success look like?"
        />
        {errors.projectDetails ? (
          <p id={`${formIdPrefix}-projectDetails-error`} className="mt-1.5 text-xs text-destructive">
            {errors.projectDetails}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <PremiumButton
        type="submit"
        size="lg"
        icon={false}
        disabled={status === "submitting"}
        className="w-full disabled:opacity-60 sm:w-fit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </PremiumButton>
    </form>
  );
}
