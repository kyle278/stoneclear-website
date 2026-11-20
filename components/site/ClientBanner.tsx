"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { logoClients } from "@/lib/client-data";
import { ClientLogo } from "./ClientLogo";
import { TextLink } from "./UI";

export function ClientBanner() {
  const rail = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      const next = media.matches || document.documentElement.dataset.motion === "reduced";
      if (!next) element.scrollLeft = 0;
      setReduced(next);
    };
    const syncVisibility = () => setVisible(!document.hidden);
    const motion = new MutationObserver(syncMotion);
    motion.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const intersection = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    intersection.observe(element);
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    syncMotion();
    syncVisibility();
    let cancelled = false;
    Promise.all(Array.from(element.querySelectorAll("img"), img =>
      img.decode().catch(() => undefined),
    )).then(() => { if (!cancelled) setLoaded(true); });
    const update = () => {
      setEdges({
        start: element.scrollLeft < 2,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(element);
    if (element.firstElementChild) resize.observe(element.firstElementChild);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      motion.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      element.removeEventListener("scroll", update);
      cancelled = true;
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
            {reduced ? <div className="client-rail-controls">
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
            </div> : <button
              className="client-motion-toggle"
              type="button"
              aria-label={playing ? "Pause client logo animation" : "Play client logo animation"}
              aria-controls="client-logo-rail"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? "Pause logos" : "Play logos"}
            </button>}
          </div>
        </div>
        <div
          id="client-logo-rail"
          className="client-logo-window"
          ref={rail}
          data-reduced={reduced}
          style={{ "--client-count": logoClients.length } as CSSProperties}
          tabIndex={reduced ? 0 : undefined}
          role="region"
          aria-label={reduced ? "Client logos. Scroll horizontally to explore." : "Client logos"}
        >
          <div className="client-logo-track" data-playing={playing && !reduced && inView && visible && loaded}>
            <ul className="client-logo-group">
              {logoClients.map((client) => (
                <li key={client.name}><ClientLogo client={client} loading="eager" /></li>
              ))}
            </ul>
            <ul className="client-logo-group client-logo-copy" aria-hidden="true">
              {logoClients.map((client) => (
                <li key={client.name}><ClientLogo client={client} loading="eager" /></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
