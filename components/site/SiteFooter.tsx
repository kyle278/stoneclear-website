import { MotionPreference } from "./MotionPreference";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <Link href="/" className="footer-wordmark">
              Stone Clear
            </Link>
            <p>
              Restore the surface.
              <br />
              Keep the character.
            </p>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/services">Our services</Link>
            <Link href="/services/stone-restoration">Stone restoration</Link>
            <Link href="/gallery">Our work</Link>
            <Link href="/about">About us</Link>
            <Link href="/clients">Homes & businesses</Link>
          </div>
          <div>
            <p className="footer-label">Let’s talk</p>
            <a href="tel:+353877533997">
              087 753 3997 <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="mailto:info@stoneclear.ie">
              info@stoneclear.ie <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <p>
              Based in Carlow.
              <br />
              Caring for surfaces across Ireland.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Stone Clear</span>
          <span>Stone restoration · Polishing · Sealing · Care</span>
          <MotionPreference />
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
