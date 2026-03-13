import { Metadata } from "next";
import { Instagram, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { email, phonePrimary, phoneSecondary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Stone Clear to arrange a free demonstration and quote.",
};

export default function ContactPage() {
  return (
    <div className="page-shell page-section grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div className="space-y-5">
        <p className="section-label">Contact</p>
        <h1 className="section-title text-balance">Book a service request or quote.</h1>
        <p className="section-copy">
          The live site’s main conversion path is a contact form for demonstrations and quotes. This page keeps that
          same goal, but supports it with clearer contact options and a more focused form layout.
        </p>

        <div className="grid gap-3">
          <a href={`tel:${phonePrimary.replace(/\s+/g, "")}`} className="glass-card flex items-center gap-4 rounded-[1.5rem] p-4">
            <Phone className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Primary line</div>
              <div className="font-medium">{phonePrimary}</div>
            </div>
          </a>
          <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="glass-card flex items-center gap-4 rounded-[1.5rem] p-4">
            <Phone className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Secondary line</div>
              <div className="font-medium">{phoneSecondary}</div>
            </div>
          </a>
          <a href={`mailto:${email}`} className="glass-card flex items-center gap-4 rounded-[1.5rem] p-4">
            <Mail className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Email</div>
              <div className="font-medium">{email}</div>
            </div>
          </a>
          <a
            href="https://instagram.com/stoneclear.ie"
            target="_blank"
            rel="noreferrer"
            className="glass-card flex items-center gap-4 rounded-[1.5rem] p-4"
          >
            <Instagram className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Instagram</div>
              <div className="font-medium">@stoneclear.ie</div>
            </div>
          </a>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
