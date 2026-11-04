import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Picture, Callout, TickList } from "@/components/site/UI";
export const metadata: Metadata = { title: "Our services" };
const services = [
  {
    id: "stone",
    name: "Stone cleaning & restoration",
    intro: "Bring the natural character back.",
    copy: "Specialist treatment for marble, limestone, granite, travertine, slate and terrazzo. We look at the material and condition before recommending how to clean, restore and protect it.",
    items: [
      "Deep cleaning & stain treatment",
      "Scratch & etch restoration",
      "Diamond polishing & sealing",
      "Grout cleaning & repair",
    ],
    image: "carrara",
    alt: "Restored White Carrara and Light Emperador floor",
    href: "/services/stone-restoration",
    link: "Explore stone restoration",
  },
  {
    id: "cleaning",
    name: "Cleaning & maintenance",
    intro: "Keep your space looking its best.",
    copy: "Domestic and commercial cleaning that supports the life of your surfaces. From routine care to a deeper clean, discuss a maintenance approach for your home, hotel or workplace.",
    items: [
      "Domestic & commercial cleaning",
      "Floor care & ongoing maintenance",
      "Carpet & upholstery cleaning",
      "Surface-specific care advice",
    ],
    image: "mixed-marble",
    alt: "Mixed cream marble floor from Stone Clear’s project gallery",
    href: "/contact?service=cleaning",
    link: "Discuss cleaning & maintenance",
  },
  {
    id: "exteriors",
    name: "Windows & power washing",
    intro: "A brighter first impression.",
    copy: "Window cleaning and exterior care for homes and businesses. Talk to us about glass, building facades, driveways, patios and outdoor surfaces that need attention.",
    items: [
      "Window cleaning",
      "Reach-and-wash cleaning",
      "Patios & driveways",
      "Building exteriors",
    ],
    image: null,
    alt: "",
    href: "/contact?service=exteriors",
    link: "Discuss windows & exteriors",
  },
  {
    id: "floors",
    name: "Epoxy & wooden floors",
    intro: "The right finish for the way you use it.",
    copy: "Epoxy floor coatings for working environments, alongside wooden floor restoration and refinishing. We can also discuss anti-slip treatment as part of a surface assessment.",
    items: [
      "Epoxy flooring",
      "Commercial & garage floors",
      "Wooden floor restoration",
      "Anti-slip treatment enquiries",
    ],
    image: "wood-after",
    alt: "Wooden floor after Stone Clear restoration",
    href: "/contact?service=floors",
    link: "Discuss your flooring",
  },
];
export default function Services() {
  return (
    <>
      <PageIntro
        label="Our services"
        title={
          <>
            Restoration.
            <br />
            Protection. Care.
          </>
        }
        copy="From natural stone to the wider space around it. Explore specialist restoration and cleaning services for homes and businesses across Ireland."
      />
      <div className="shell">
        <nav className="service-jumps" aria-label="Service categories">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.name}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
      <div className="shell service-details">
        {services.map((s, i) => (
          <section
            className={`service-detail ${!s.image ? "service-detail-text" : ""}`}
            id={s.id}
            key={s.id}
          >
            <div className="service-detail-copy">
              <span className="service-number">0{i + 1} / Our services</span>
              <h2>{s.name}</h2>
              <h3>{s.intro}</h3>
              <p>{s.copy}</p>
              <TickList items={s.items} />
              <Link href={s.href} className="text-link">
                {s.link}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            {s.image ? (
              <div>
                <Picture name={s.image} alt={s.alt} />
                <span className="image-caption">
                  From Stone Clear’s restoration projects
                </span>
              </div>
            ) : (
              <div className="exterior-typography">
                <span>
                  Clear glass.
                  <br />
                  Fresh exteriors.
                  <br />A cared-for space.
                </span>
                <ArrowUpRight size={54} strokeWidth={1} aria-hidden="true" />
              </div>
            )}
          </section>
        ))}
      </div>
      <Callout />
    </>
  );
}
