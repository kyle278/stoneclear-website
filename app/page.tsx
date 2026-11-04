import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HomeSections } from "@/components/site/HomeSections";
import { Picture } from "@/components/site/UI";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Natural stone. Expertly restored.
          </p>
          <h1>
            The beauty
            <br />
            is still there.
          </h1>
          <p className="hero-description">
            Bring it back with specialist stone restoration,
            <br className="desktop-break" /> polishing and care. For homes and
            businesses
            <br className="desktop-break" /> across Ireland.
          </p>
          <Link className="button" href="/contact">
            Arrange a free demonstration{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <a href="#restoration" className="hero-down">
            <ArrowDown size={17} aria-hidden="true" /> Discover the difference
          </a>
        </div>
        <div className="hero-visual">
          <Picture
            name="carrara"
            alt="Stone Clear’s restored White Carrara and Light Emperador marble floor"
            priority
          />
          <div className="image-caption">
            <span>White Carrara & Light Emperador</span>
            <span>Restored by Stone Clear</span>
          </div>
          <span className="vertical-caption">
            Original character. Renewed finish.
          </span>
        </div>
        <div className="hero-note">
          <span className="small-cross">+</span>
          <p>
            A floor worth keeping.
            <br />
            <strong>A finish worth restoring.</strong>
          </p>
          <Link
            href="/gallery"
            aria-label="Explore Stone Clear’s restoration gallery"
          >
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
      <div className="materials-strip">
        <div className="shell">
          <span>Specialist care for</span>
          <p>
            Marble <i /> Limestone <i /> Terrazzo <i /> Granite <i /> Travertine{" "}
            <i /> Slate
          </p>
        </div>
      </div>
      <section className="section shell" id="restoration">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The difference is in the detail</span>
            <h2>
              Your stone.
              <br />A fresh perspective.
            </h2>
          </div>
          <p>
            Years of wear don’t have to be the end of a beautiful floor. Explore
            the possibilities of restoration.
          </p>
        </div>
      </section>
      <HomeSections />
    </>
  );
}
