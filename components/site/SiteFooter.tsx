import { Instagram, Mail, Phone } from "lucide-react";
import { email, navigation, phonePrimary, phoneSecondary } from "@/lib/site-data";
import { TrackedLink } from "@/components/site/TrackedLink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-forest text-white">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="section-label text-[#d4b386]">Stone Clear</p>
          <h2 className="max-w-xl font-serif text-4xl leading-none text-balance">
            Restoration work that helps premium surfaces look cared for again.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-white/70">
            Stone Clear serves residential, hospitality and commercial clients across Ireland with polishing,
            sealing, maintenance and exterior cleaning services.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">Explore</h3>
          <div className="grid gap-3 text-sm">
            {navigation.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                eventType="nav_click"
                tracking={{ location: "footer", label: item.label }}
                className="transition hover:text-[#d4b386]"
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">Contact</h3>
          <a href={`tel:${phonePrimary.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-[#d4b386]" />
            <span>{phonePrimary}</span>
          </a>
          <a href={`tel:${phoneSecondary.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-[#d4b386]" />
            <span>{phoneSecondary}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-[#d4b386]" />
            <span>{email}</span>
          </a>
          <a
            href="https://instagram.com/stoneclear.ie"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sm"
          >
            <Instagram className="h-4 w-4 text-[#d4b386]" />
            <span>@stoneclear.ie</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
