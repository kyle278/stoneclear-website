import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/site/UI";
import { EnquiryForm } from "@/components/site/EnquiryForm";
export const metadata: Metadata = { title: "Contact & free demonstration" };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <>
      <PageIntro
        label="Contact"
        title={
          <>
            Let’s see the
            <br />
            possibilities.
          </>
        }
        copy="A free demonstration and quote is a good place to start. Tell us a little about your surface and we’ll discuss the next step."
      />
      <section className="shell contact-grid">
        <aside className="contact-sidebar">
          <div>
            <Phone size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>Give us a call</span>
            <a href="tel:+353877533997">
              087 753 3997
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div>
            <Mail size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>Send us an email</span>
            <a href="mailto:info@stoneclear.ie">
              info@stoneclear.ie
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div>
            <MapPin size={20} strokeWidth={1.4} aria-hidden="true" />
            <span>Where we work</span>
            <p>
              Based in Carlow.
              <br />
              Dublin, Kildare & across Ireland.
            </p>
          </div>
          <div className="contact-note">
            <span className="small-cross">+</span>
            <p>
              You don’t need to know the name of your stone. Tell us what you’d
              like to improve and we’ll start there.
            </p>
          </div>
        </aside>
        <EnquiryForm preset={service} />
      </section>
      <section className="contact-next">
        <div className="shell">
          <h2>What happens next?</h2>
          <div>
            <p>
              <strong>We’ll discuss your surface.</strong>
              <br />
              The material, its condition, your location and what you’d like to
              improve.
            </p>
            <p>
              <strong>Then, a closer look.</strong>
              <br />
              We can discuss an assessment and a free demonstration before
              quoting for the work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
