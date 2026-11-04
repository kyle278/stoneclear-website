"use client";

import Image from "next/image";
import { MoveHorizontal, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type ComparisonProject = {
  id: string;
  title: string;
  before: string;
  after: string;
};

export function ComparisonSlider({
  project,
  playing,
  onPause,
  onToggle,
}: {
  project: ComparisonProject;
  playing: boolean;
  onPause: () => void;
  onToggle: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const position = useRef(50);
  const interacting = useRef(false);
  const dragging = useRef(false);
  const direction = useRef(1);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState({ before: false, after: false });
  const helpId = useId();

  const paint = useCallback((value: number) => {
    const next = Math.max(0, Math.min(100, value));
    position.current = next;
    stage.current?.style.setProperty("--comparison-reveal", `${next}%`);
    if (range.current) {
      range.current.value = String(Math.round(next));
      range.current.setAttribute(
        "aria-valuetext",
        `${Math.round(next)}% before image, ${100 - Math.round(next)}% after image`,
      );
    }
  }, []);

  function takeControl() {
    interacting.current = true;
    onPause();
  }

  function pointTo(clientX: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (rect?.width) paint(((clientX - rect.left) / rect.width) * 100);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () =>
      setReduced(
        media.matches || document.documentElement.dataset.motion === "reduced",
      );
    const syncVisibility = () => setTabVisible(!document.hidden);
    const mutation = new MutationObserver(syncMotion);
    mutation.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const intersection = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (stage.current) intersection.observe(stage.current);
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    syncMotion();
    syncVisibility();
    return () => {
      mutation.disconnect();
      intersection.disconnect();
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      !playing ||
      reduced ||
      !inView ||
      !tabVisible ||
      !loaded.before ||
      !loaded.after
    )
      return;
    interacting.current = false;
    let frame: number;
    let start: number | null = null;
    let from = position.current;
    let to = direction.current > 0 ? 85 : 15;
    const sweep = (now: number) => {
      if (interacting.current) return;
      start ??= now;
      const progress = Math.min((now - start) / 4000, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      paint(from + (to - from) * eased);
      if (progress === 1) {
        from = to;
        direction.current *= -1;
        to = direction.current > 0 ? 85 : 15;
        start = now;
      }
      frame = requestAnimationFrame(sweep);
    };
    frame = requestAnimationFrame(sweep);
    return () => cancelAnimationFrame(frame);
  }, [
    playing,
    reduced,
    inView,
    tabVisible,
    loaded.before,
    loaded.after,
    paint,
  ]);

  const surface = `${project.title}${project.id === "wood" ? "" : " floor"}`;

  return (
    <div className="result-photo">
      <div
        ref={stage}
        className={`result-picture result-${project.id} comparison-stage`}
      >
        <div className="comparison-layer">
          <Image
            src={`/assets/${project.after}.webp`}
            alt={`${surface} after Stone Clear restoration`}
            fill
            sizes="(max-width: 700px) 100vw, 65vw"
            unoptimized
            onLoad={() => setLoaded((state) => ({ ...state, after: true }))}
          />
        </div>
        <div className="comparison-layer comparison-before">
          <Image
            src={`/assets/${project.before}.webp`}
            alt={`${surface} before Stone Clear restoration`}
            fill
            sizes="(max-width: 700px) 100vw, 65vw"
            unoptimized
            onLoad={() => setLoaded((state) => ({ ...state, before: true }))}
          />
        </div>
        <span
          className="comparison-label comparison-label-before"
          aria-hidden="true"
        >
          Before
        </span>
        <span
          className="comparison-label comparison-label-after"
          aria-hidden="true"
        >
          After
        </span>
        <span className="comparison-divider" aria-hidden="true">
          <span>
            <MoveHorizontal size={23} strokeWidth={1.7} />
          </span>
        </span>
        <input
          ref={range}
          className="comparison-range"
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="50"
          aria-label={`Before and after comparison for ${project.title}`}
          aria-describedby={helpId}
          aria-valuetext="50% before image, 50% after image"
          onFocus={takeControl}
          onKeyDown={takeControl}
          onChange={(event) => {
            takeControl();
            paint(Number(event.target.value));
          }}
          onPointerDown={(event) => {
            event.preventDefault();
            takeControl();
            dragging.current = true;
            event.currentTarget.focus();
            event.currentTarget.setPointerCapture(event.pointerId);
            pointTo(event.clientX);
          }}
          onPointerMove={(event) => {
            if (dragging.current) pointTo(event.clientX);
          }}
          onPointerUp={(event) => {
            dragging.current = false;
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onLostPointerCapture={() => {
            dragging.current = false;
          }}
        />
      </div>
      <div className="comparison-toolbar">
        <p id={helpId}>Drag to reveal. Use arrow keys to fine-tune.</p>
        {reduced ? (
          <span className="comparison-motion-note">Motion reduced</span>
        ) : (
          <button
            className="comparison-play"
            onClick={onToggle}
            aria-label={
              playing
                ? "Pause comparison animation"
                : "Play comparison animation"
            }
          >
            {playing ? (
              <Pause size={14} aria-hidden="true" />
            ) : (
              <Play size={14} aria-hidden="true" />
            )}
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </div>
    </div>
  );
}
