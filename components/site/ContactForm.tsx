"use client";

import { useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { getTrackingSnapshot, trackPortalEvent } from "@/lib/portal";

type ContactFormProps = {
  title?: string;
  compact?: boolean;
};

const initialState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm({ title = "Book your free demonstration and quote", compact = false }: ContactFormProps) {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof typeof initialState, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const tracking = getTrackingSnapshot();
        const response = await fetch("/api/portal-form-submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formSlug: "contact",
            fields: {
              name: values.name,
              phone: values.phone,
              email: values.email,
              message: values.message,
            },
            tracking,
          }),
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(payload?.error ?? "Form submission failed.");
        }

        trackPortalEvent("form_submit", {
          form_slug: "contact",
          form_id: "contact",
          page_type: compact ? "embedded" : "contact",
        });
        setStatus("success");
        setValues(initialState);
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="glass-card rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 space-y-3">
        <p className="section-label">Contact Form</p>
        <h3 className="font-serif text-3xl leading-none">{title}</h3>
        <p className="section-copy">
          Tell us about the surface, the issue and the location. Stone Clear will follow up to arrange a demonstration
          and estimate.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input
              required
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-2xl border border-line bg-white/90 px-4 py-3 outline-none transition focus:border-accent"
              name="name"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Phone
            <input
              required
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded-2xl border border-line bg-white/90 px-4 py-3 outline-none transition focus:border-accent"
              name="phone"
              type="tel"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            required
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-line bg-white/90 px-4 py-3 outline-none transition focus:border-accent"
            name="email"
            type="email"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Message
          <textarea
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-36 rounded-2xl border border-line bg-white/90 px-4 py-3 outline-none transition focus:border-accent"
            name="message"
          />
        </label>

        <button type="submit" className="button-primary w-full sm:w-fit" disabled={isPending}>
          {isPending ? "Sending..." : "Request a quote"}
          <ArrowRight className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <p className="rounded-2xl bg-forest px-4 py-3 text-sm text-white">
            Thank you. Stone Clear will get back to you as soon as possible.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage ?? "There was an error sending your message. Please try again later."}
          </p>
        ) : null}
      </form>
    </div>
  );
}
