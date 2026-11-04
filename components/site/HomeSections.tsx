import { Callout, Picture, Process, TextLink } from "./UI";
import { ResultsViewer } from "./ResultsViewer";
import { ImageMotion } from "./ImageMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function HomeSections() {
  return (
    <>
      <ImageMotion />
      <section className="shell results-home">
        <ResultsViewer />
      </section>
      <section className="section service-index">
        <div className="shell service-index-grid">
          <div>
            <span className="eyebrow">Restoration is just the beginning</span>
            <h2>
              Care for the
              <br />
              whole space.
            </h2>
            <p>
              Specialist restoration. Everyday maintenance. The right care for
              the surfaces you live and work with.
            </p>
            <TextLink href="/services">Discover all our services</TextLink>
          </div>
          <div className="service-rows">
            {[
              {
                n: "Stone restoration",
                c: "Cleaning, polishing, sealing & repair",
                href: "/services/stone-restoration",
              },
              {
                n: "Cleaning & maintenance",
                c: "Homes, hotels & commercial spaces",
                href: "/services#cleaning",
              },
              {
                n: "Windows & exteriors",
                c: "Window cleaning & power washing",
                href: "/services#exteriors",
              },
              {
                n: "Epoxy & other floors",
                c: "Epoxy coatings, wood & carpet care",
                href: "/services#floors",
              },
            ].map((s) => (
              <Link href={s.href} key={s.n}>
                <div>
                  <h3>{s.n}</h3>
                  <span>{s.c}</span>
                </div>
                <ArrowUpRight size={25} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell audience-section" data-reveal>
        <div className="audience-image">
          <Picture
            name="marble-hall"
            alt="Cream Marfil and black marble floor restored by Stone Clear"
          />
          <span className="image-caption">
            Cream Marfil & black marble · Stone Clear project
          </span>
        </div>
        <div className="audience-copy">
          <span className="eyebrow">From your home to your business</span>
          <h2>
            Every space
            <br />
            deserves care.
          </h2>
          <div className="audience-item">
            <h3>At home</h3>
            <p>
              The hallway you walk through every day. The kitchen floor you
              chose for a reason. Bring the character of your home’s surfaces
              back into focus.
            </p>
          </div>
          <div className="audience-item">
            <h3>At work</h3>
            <p>
              From hotel lobbies to busy commercial floors, make the right first
              impression with specialist restoration and ongoing maintenance.
            </p>
          </div>
          <TextLink href="/about">Get to know Stone Clear</TextLink>
        </div>
      </section>
      <Process />
      <Callout />
    </>
  );
}
