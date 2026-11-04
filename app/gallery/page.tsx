import type { Metadata } from "next";
import { PageIntro, Picture, Callout, TextLink } from "@/components/site/UI";
import { ResultsViewer } from "@/components/site/ResultsViewer";
export const metadata: Metadata = { title: "Restoration gallery" };
export default function Gallery() {
  return (
    <>
      <PageIntro
        label="Our work"
        title={
          <>
            The difference.
            <br />
            In plain sight.
          </>
        }
        copy="Real surfaces. Real restoration. Explore photographs from Stone Clear’s restoration projects, from polished marble to restored wooden floors."
      />
      <section className="shell gallery-viewer">
        <ResultsViewer full />
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A closer look at the finish</span>
            <h2>Character, revealed.</h2>
          </div>
          <p>
            Natural variation is what makes stone worth keeping. A selection of
            finished surfaces from our project gallery.
          </p>
        </div>
        <div className="gallery-grid">
          {[
            {
              n: "carrara",
              t: "White Carrara & Light Emperador",
              c: "Natural marble inlay",
            },
            {
              n: "marble-hall",
              t: "Cream Marfil & black marble",
              c: "Polished marble floor",
            },
            { n: "marfil", t: "Crema Marfil", c: "Restored marble" },
            {
              n: "marfil-tiles",
              t: "Crema Marfil tiles",
              c: "Polished finish",
            },
          ].map((p, i) => (
            <figure key={p.n}>
              <Picture name={p.n} alt={p.t + " restored by Stone Clear"} />
              <figcaption>
                <span>
                  <strong>{p.t}</strong>
                  <small>{p.c}</small>
                </span>
                <span className="gallery-ref">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-bottom">
          <p>Wondering what’s possible for your own surface?</p>
          <TextLink href="/contact">Let’s take a closer look</TextLink>
        </div>
      </section>
      <Callout />
    </>
  );
}
