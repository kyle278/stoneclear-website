import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { TrackedLink } from "@/components/site/TrackedLink";
import {
  galleryItems,
  heroStats,
  materialList,
  pageSummary,
  phonePrimary,
  processSteps,
  services,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="page-shell page-section grid gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-7">
          <p className="section-label">Stone Restoration Across Ireland</p>
          <h1 className="section-title max-w-3xl text-balance">{pageSummary.homeTitle}</h1>
          <p className="section-copy max-w-2xl text-pretty">{pageSummary.homeCopy}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink href="/contact" className="button-primary" tracking={{ location: "hero", label: "Book a quote" }}>
              Book a free quote
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <a href={`tel:${phonePrimary.replace(/\s+/g, "")}`} className="button-secondary">
              <Phone className="h-4 w-4" />
              Call {phonePrimary}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="glass-card rounded-[1.5rem] p-4">
                <div className="font-serif text-3xl">{item.value}</div>
                <p className="mt-2 text-sm leading-6 text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -translate-y-4 translate-x-4 rounded-[2rem] bg-forest/10 blur-3xl" />
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-3">
            <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <Image
                src="/stoneclear/hero-floor.jpg"
                alt="Restored stone flooring by Stone Clear"
                width={1200}
                height={900}
                className="h-full min-h-[420px] w-full rounded-[1.4rem] object-cover"
                priority
              />
              <div className="grid gap-3">
                <Image
                  src="/stoneclear/stone-detail.jpg"
                  alt="Detailed stone and tile cleaning"
                  width={900}
                  height={900}
                  className="h-[205px] w-full rounded-[1.4rem] object-cover"
                />
                <div className="rounded-[1.4rem] bg-forest p-6 text-white">
                  <p className="section-label text-[#d4b386]">Trusted surfaces</p>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    Marble, granite, limestone, terrazzo, porcelain, quarry tiles and epoxy flooring restored with a
                    cleaner, brighter and better-protected finish.
                  </p>
                </div>
                <Image
                  src="/stoneclear/project-1.jpg"
                  alt="Stone floor restoration project"
                  width={900}
                  height={900}
                  className="h-[205px] w-full rounded-[1.4rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section soft-grid border-y border-line/70 bg-surface/70">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-label">What We Restore</p>
            <h2 className="section-title max-w-xl text-balance">Specialist care for valuable surfaces that should not be replaced too quickly.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {materialList.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-line bg-white/70 px-4 py-3 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="section-label">Services</p>
            <h2 className="section-title max-w-2xl text-balance">Restoration, maintenance and cleaning services built around surface longevity.</h2>
          </div>
          <TrackedLink href="/services" className="button-secondary" tracking={{ location: "services_section", label: "View all services" }}>
            View all services
          </TrackedLink>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.slug} className="glass-card rounded-[2rem] p-6">
              <p className="section-label">{service.name}</p>
              <p className="mt-4 text-lg leading-8 text-foreground">{service.summary}</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell page-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="section-label">How It Works</p>
          <h2 className="section-title max-w-xl text-balance">A clearer route from worn surfaces to a finish you feel confident showing off.</h2>
        </div>
        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="glass-card grid gap-4 rounded-[1.75rem] p-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">{index + 1}</div>
              <div>
                <h3 className="font-serif text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section border-y border-line/70 bg-forest text-white">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-label text-[#d4b386]">Before & After Work</p>
            <h2 className="section-title max-w-xl text-balance">Proof-led work for hotels, commercial spaces and private homes.</h2>
            <p className="max-w-xl text-sm leading-7 text-white/70">
              The current Stone Clear website leans heavily on before-and-after results. This rebuild keeps that proof
              front and center, but presents it with clearer structure and stronger calls to action.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {galleryItems.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                <Image src={item.image} alt={item.title} width={900} height={700} className="h-64 w-full object-cover" />
                <div className="space-y-2 p-5">
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <p className="section-label">Get A Quote</p>
          <h2 className="section-title max-w-xl text-balance">Tell us what needs restoring and we will arrange the next step.</h2>
          <p className="section-copy max-w-xl">
            Stone Clear’s main conversion goal is a booked service request or quote. The form below mirrors the live
            website’s public contact form and submits directly into Ingenium Portal.
          </p>
        </div>
        <ContactForm compact />
      </section>
    </>
  );
}
