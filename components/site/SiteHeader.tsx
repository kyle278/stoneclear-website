"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Phone } from "lucide-react";
const nav = [
  { href: "/services", label: "Our services" },
  { href: "/gallery", label: "Our work" },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <div className="topline">
        <div className="shell">
          <span>Specialist stone restoration & care</span>
          <span>Carlow · Dublin · Kildare · Across Ireland</span>
          <a href="tel:+353877533997">
            <Phone size={12} aria-hidden="true" /> 087 753 3997
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="shell nav-shell">
          <Link
            href="/"
            aria-label="Stone Clear home"
            className="brand"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/assets/stone-clear-logo.svg"
              width={648}
              height={269}
              alt="Stone Clear"
              priority
              unoptimized
            />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={path.startsWith(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link className="button button-small header-cta" href="/contact">
            Let’s talk about your floor{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={path.startsWith(n.href) ? "page" : undefined}
            >
              {n.label}
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
          <a href="tel:+353877533997">
            Call 087 753 3997 <Phone size={20} aria-hidden="true" />
          </a>
        </nav>
      </header>
    </>
  );
}
