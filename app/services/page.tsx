import { Metadata } from "next";
import { services } from "@/lib/site-data";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Services",
  description: "Stone Clear services for restoration, maintenance, exterior cleaning and epoxy floor finishes.",
};

export default function ServicesPage() {
  return (
    <div className="page-shell page-section">
      <div className="max-w-3xl space-y-4">
        <p className="section-label">Services</p>
        <h1 className="section-title text-balance">Cleaning, restoration, polishing, maintenance and protective finishes.</h1>
        <p className="section-copy">
          The current Stone Clear website lists four core service areas. This launch keeps those intact and presents
          them in a clearer premium structure for residential, hospitality and commercial enquiries.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {services.map((service) => (
          <section key={service.slug} id={service.slug} className="glass-card rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="section-label">{service.name}</p>
                <h2 className="mt-3 font-serif text-4xl leading-none">{service.name}</h2>
              </div>
              <div className="space-y-4">
                <p className="section-copy">{service.summary}</p>
                <ul className="grid gap-3 text-sm leading-7 text-muted">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <ContactForm compact />
      </div>
    </div>
  );
}
