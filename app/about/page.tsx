import { Metadata } from "next";
import Image from "next/image";
import { materialList } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "About Stone Clear and the restoration approach behind the business.",
};

export default function AboutPage() {
  return (
    <div className="page-shell page-section">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <p className="section-label">About Stone Clear</p>
          <h1 className="section-title text-balance">More than two decades restoring surfaces for homes, hotels and businesses.</h1>
          <p className="section-copy">
            The existing website describes Stone Clear as a team that loves cleaning and restoring, has worked with
            clients for more than 20 years, and values long-term customer relationships. This page keeps that core
            positioning while presenting it with more polished language and layout.
          </p>
          <p className="section-copy">
            Stone Clear focuses on practical restoration work that extends the life of stone, tile and hard surfaces,
            improves the finish and helps avoid premature replacement.
          </p>
        </div>

        <div className="glass-card overflow-hidden rounded-[2rem] p-3">
          <Image
            src="/stoneclear/hero-polish.jpg"
            alt="Stone Clear restoration work"
            width={1200}
            height={900}
            className="h-full min-h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>

      <section className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-[2rem] p-6">
          <p className="section-label">Why clients call</p>
          <h2 className="mt-3 font-serif text-3xl leading-none">Free demonstrations, honest guidance and specialist treatment plans.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Stone Clear’s live site repeatedly highlights free demonstrations and consultation-led work. That remains a
            key differentiator in this rebuild because it lowers risk for the client before a full job begins.
          </p>
        </div>

        <div className="glass-card rounded-[2rem] p-6">
          <p className="section-label">Materials</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {materialList.map((item) => (
              <span key={item} className="rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
