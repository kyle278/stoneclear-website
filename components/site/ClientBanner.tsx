"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { logoClients } from "@/lib/client-data";
import { ClientLogo } from "./ClientLogo";
import { TextLink } from "./UI";

export function ClientBanner() {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      setEdges({
        start: element.scrollLeft < 2,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "reduced";
    element.scrollBy({
      left: direction * element.clientWidth * 0.85,
      behavior: reduced ? "instant" : "smooth",
    });
  }

  return (
    <section className="client-banner" aria-labelledby="client-banner-title">
      <div className="shell">
        <div className="client-banner-heading">
          <div>
            <h2 id="client-banner-title">In good company.</h2>
            <p>Hotels & businesses we’ve worked with.</p>
          </div>
          <div className="client-banner-actions">
            <TextLink href="/clients">Meet our clients</TextLink>
            <div className="client-rail-controls">
              <button
                type="button"
                aria-label="Previous client logos"
                aria-controls="client-logo-rail"
                disabled={edges.start}
                onClick={() => move(-1)}
              >
                <ArrowLeft size={19} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next client logos"
                aria-controls="client-logo-rail"
                disabled={edges.end}
                onClick={() => move(1)}
              >
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <ul
          id="client-logo-rail"
          className="client-logo-rail"
          ref={rail}
          tabIndex={0}
          aria-label="Client logos. Scroll horizontally to explore."
        >
          {logoClients.map((client) => (
            <li key={client.name}><ClientLogo client={client} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
