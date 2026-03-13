import { Metadata } from "next";
import Image from "next/image";
import { galleryItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A selection of Stone Clear restoration and polishing work.",
};

export default function GalleryPage() {
  return (
    <div className="page-shell page-section">
      <div className="max-w-3xl space-y-4">
        <p className="section-label">Gallery</p>
        <h1 className="section-title text-balance">Before-and-after style proof from Stone Clear projects.</h1>
        <p className="section-copy">
          The live site uses gallery-style proof heavily. This page keeps that visual evidence while presenting the work
          with stronger captions and a cleaner browsing experience.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {galleryItems.map((item) => (
          <article key={item.title} className="glass-card overflow-hidden rounded-[2rem]">
            <Image src={item.image} alt={item.title} width={1200} height={900} className="h-80 w-full object-cover" />
            <div className="space-y-3 p-6">
              <p className="section-label">{item.title}</p>
              <p className="section-copy">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
