"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navigation, phonePrimary } from "@/lib/site-data";
import { trackPortalEvent } from "@/lib/portal";
import { TrackedLink } from "@/components/site/TrackedLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/stoneclear/logo.png" alt="Stone Clear" width={168} height={54} priority />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              eventType="nav_click"
              tracking={{ location: "header", label: item.label }}
              className="text-sm font-semibold tracking-[0.16em] uppercase text-foreground/80 transition hover:text-accent"
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
            className="button-secondary"
            onClick={() => trackPortalEvent("phone_click", { location: "header", label: phonePrimary })}
          >
            <Phone className="h-4 w-4" />
            {phonePrimary}
          </a>
          <TrackedLink href="/contact" className="button-primary" tracking={{ location: "header", label: "Book a quote" }}>
            Book a quote
          </TrackedLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            setOpen((current) => !current);
            trackPortalEvent("nav_click", { location: "mobile_toggle", label: open ? "close_menu" : "open_menu" });
          }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="page-shell flex flex-col gap-3 py-4">
            {navigation.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                eventType="nav_click"
                tracking={{ location: "mobile_menu", label: item.label }}
                className="rounded-2xl border border-line bg-white/50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </TrackedLink>
            ))}
            <a
              href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
              className="button-secondary"
              onClick={() => trackPortalEvent("phone_click", { location: "mobile_menu", label: phonePrimary })}
            >
              <Phone className="h-4 w-4" />
              {phonePrimary}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
