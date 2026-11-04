import type { Metadata } from "next";
import {
  PageIntro,
  Picture,
  Callout,
  Process,
  TickList,
  TextLink,
} from "@/components/site/UI";
import { ResultsViewer } from "@/components/site/ResultsViewer";
export const metadata: Metadata = { title: "Stone restoration & polishing" };
const questions = [
  {
    q: "Can my stone be restored instead of replaced?",
    a: "That starts with an assessment. The type of stone, its condition and the depth of damage all matter. A free demonstration can help you see what restoration could achieve on your own surface.",
  },
  {
    q: "Do you work in homes and commercial properties?",
    a: "Yes. Stone Clear works with homes, hotels, offices and other commercial spaces. Tell us how the area is used so we can discuss a suitable approach.",
  },
  {
    q: "Is every stone finished to a high shine?",
    a: "No. Different stones and spaces call for different finishes. Our gallery includes both polished marble and a satin white-marble finish. We’ll discuss the options for your surface during assessment.",
  },
  {
    q: "What do you need to prepare a quote?",
    a: "Start with the material, the approximate area, where the property is and what you’d like to improve. Photos are useful if you have them. We’ll discuss whether a site assessment is needed.",
  },
  {
    q: "Which areas do you cover?",
    a: "Based in Carlow, Stone Clear serves Dublin, Kildare and locations across Ireland. Contact us with your location and the work you have in mind.",
  },
];
export default function Stone() {
  return (
    <>
      <PageIntro
        label="Stone restoration"
        title={
          <>
            Bring your stone
            <br />
            back to life.
          </>
        }
        copy="Dullness, scratches and years of wear can hide a beautiful surface. Our specialist restoration brings the stone itself back into view."
      />
      <div className="shell restoration-lead">
        <Picture
          name="marble-hall"
          alt="Restored Cream Marfil marble with black marble border"
          priority
        />
        <div className="image-caption">
          <span>Cream Marfil & black marble</span>
          <span>Stone Clear project</span>
        </div>
      </div>
      <section className="section shell treatment-grid">
        <div>
          <span className="eyebrow">
            Understand the surface. Choose the treatment.
          </span>
          <h2>
            More than
            <br />a surface clean.
          </h2>
          <p>
            Stone restoration works with the material you already have. We
            assess the floor, explain the treatment and help you understand the
            finish before work begins.
          </p>
          <TextLink href="/contact?service=stone">
            Arrange a free demonstration
          </TextLink>
        </div>
        <div className="treatments">
          {[
            {
              n: "Clean & repair",
              c: "Deep cleaning, stain treatment and attention to grout lines help prepare the surface. We assess any tile repairs or re-grouting needed.",
            },
            {
              n: "Restore & polish",
              c: "Diamond polishing and restoration address scratches, etching and dull areas, revealing the natural character of the stone.",
            },
            {
              n: "Seal & maintain",
              c: "Sealing and the right day-to-day care help protect the restored finish. We’ll discuss maintenance for the material and the way you use it.",
            },
          ].map((t) => (
            <article key={t.n}>
              <h3>{t.n}</h3>
              <p>{t.c}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="material-section">
        <div className="shell material-grid">
          <h2>
            Different stone.
            <br />
            Considered care.
          </h2>
          <div>
            <p>
              From marble hallways to limestone floors and terrazzo, the
              starting point is always the material.
            </p>
            <TickList
              items={[
                "Marble & limestone",
                "Granite & travertine",
                "Terrazzo & slate",
                "Ceramic & natural stone surfaces",
              ]}
            />
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <h2>
            See the surface.
            <br />
            See the difference.
          </h2>
          <p>
            Real photographs from our restoration gallery. Choose a material and
            drag to reveal the before and after views.
          </p>
        </div>
        <ResultsViewer />
      </section>
      <Process />
      <section className="section shell faq-section">
        <div>
          <span className="eyebrow">Before you get in touch</span>
          <h2>
            A few things
            <br />
            you may be wondering.
          </h2>
        </div>
        <div className="faq-list">
          {questions.map((q) => (
            <details key={q.q}>
              <summary>
                {q.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Callout />
    </>
  );
}
