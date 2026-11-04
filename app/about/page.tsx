import type { Metadata } from "next";
import {
  PageIntro,
  Picture,
  Callout,
  Process,
  TextLink,
} from "@/components/site/UI";
export const metadata: Metadata = { title: "About Stone Clear" };
export default function About() {
  return (
    <>
      <PageIntro
        label="About us"
        title={
          <>
            Good stone.
            <br />
            In careful hands.
          </>
        }
        copy="Stone Clear is a specialist in natural stone restoration, marble polishing and floor care. Based in Carlow, working with homes and businesses across Ireland."
      />
      <section className="shell about-feature">
        <Picture
          name="carrara"
          alt="Stone Clear’s White Carrara and Light Emperador restoration"
          priority
        />
        <div className="about-story">
          <span className="eyebrow">
            Restoring surfaces. Preserving character.
          </span>
          <h2>
            See the potential
            <br />
            in what’s already there.
          </h2>
          <p>
            Natural stone has a character that’s difficult to replace. Over
            time, everyday use can leave it dull, scratched or marked. Our work
            is about bringing that character back.
          </p>
          <p>
            Stone Clear combines specialist equipment, diamond polishing
            techniques and practical floor-care experience to clean, restore,
            seal and maintain stone surfaces.
          </p>
          <p>
            From a hallway at home to a hotel lobby, we start by understanding
            the surface and the space around it.
          </p>
          <TextLink href="/gallery">Take a look at our work</TextLink>
        </div>
      </section>
      <section className="section shell values-grid">
        <div>
          <span className="eyebrow">How we work</span>
          <h2>
            Considered from
            <br />
            the first visit.
          </h2>
        </div>
        <div>
          <article>
            <h3>The material comes first.</h3>
            <p>
              Different stone needs different care. Assessment helps us choose
              an approach that suits your surface.
            </p>
          </article>
          <article>
            <h3>See it for yourself.</h3>
            <p>
              A free demonstration gives you a chance to see the possibilities
              before deciding on the work.
            </p>
          </article>
          <article>
            <h3>Care beyond the finish.</h3>
            <p>
              Restoration is one part of the story. We also offer cleaning and
              maintenance to care for the surface over time.
            </p>
          </article>
        </div>
      </section>
      <section className="coverage-section">
        <div className="shell coverage-grid">
          <span className="eyebrow">
            Rooted in Carlow. Working across Ireland.
          </span>
          <h2>
            Carlow.
            <br />
            Dublin. Kildare.
            <br />
            And further afield.
          </h2>
          <div>
            <p>
              Tell us where you are and what needs attention. We work with
              residential and commercial clients across Ireland.
            </p>
            <TextLink href="/contact">Discuss your location & project</TextLink>
          </div>
        </div>
      </section>
      <Process />
      <Callout />
    </>
  );
}
