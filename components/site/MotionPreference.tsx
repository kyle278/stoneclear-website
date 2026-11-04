"use client";
import { useEffect, useState } from "react";
export function MotionPreference() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(query.matches);
      document.documentElement.dataset.motion = query.matches
        ? "reduced"
        : "full";
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return (
    <button
      className="motion-preference"
      aria-pressed={reduced}
      onClick={() => {
        const next = !reduced;
        setReduced(next);
        document.documentElement.dataset.motion = next ? "reduced" : "full";
      }}
    >
      Reduce motion<span aria-hidden="true">{reduced ? "On" : "Off"}</span>
    </button>
  );
}
