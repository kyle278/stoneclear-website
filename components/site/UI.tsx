import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
export function Picture({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`picture ${className}`}>
      <Image
        src={`/assets/${name}.webp`}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, 70vw"
        priority={priority}
        unoptimized
      />
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={21} aria-hidden="true" />
    </Link>
  );
}
export function Callout() {
  return (
    <section className="callout">
      <div className="shell callout-grid">
        <div>
          <span className="eyebrow">
            A better finish starts with a conversation
          </span>
          <h2>
            See what your
            <br />
            surface could be.
          </h2>
        </div>
        <div>
          <p>
            Arrange a free demonstration and quote.
            <br />
            Let’s take a closer look at your stone.
          </p>
          <Link className="button button-light" href="/contact">
            Talk to Stone Clear <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <a className="callout-phone" href="tel:+353877533997">
            Or call 087 753 3997
          </a>
        </div>
      </div>
    </section>
  );
}
export function PageIntro({
  label,
  title,
  copy,
}: {
  label: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <section className="page-intro shell">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <div className="intro-grid">
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section shell process-section">
      <div className="section-heading">
        <h2>
          Good work begins
          <br />
          with a closer look.
        </h2>
        <p>
          Every surface is different.
          <br />
          Our approach starts with yours.
        </p>
      </div>
      <div className="process-grid">
        {[
          {
            t: "Understand your surface",
            c: "We assess the material, its condition and the way you use the space. Scratches, dullness, staining and grout all tell part of the story.",
          },
          {
            t: "See the possibilities",
            c: "A free demonstration lets you see the difference on your own surface. We explain the work and provide a quote before you decide.",
          },
          {
            t: "Restore, protect, care",
            c: "From cleaning and restoration to polishing and sealing, the treatment suits your stone. We’ll explain how to care for the finish afterwards.",
          },
        ].map((s, i) => (
          <article key={s.t}>
            <span className="step-number">
              0{i + 1}
              <ArrowDownRight size={24} aria-hidden="true" />
            </span>
            <h3>{s.t}</h3>
            <p>{s.c}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function TickList({ items }: { items: string[] }) {
  return (
    <ul className="tick-list">
      {items.map((t) => (
        <li key={t}>
          <Check size={17} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}
