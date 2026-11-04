"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ComparisonSlider } from "./ComparisonSlider";
export const restorationProjects = [
  {
    id: "crema",
    title: "Crema Marfil",
    material: "Marble",
    copy: "From a dull surface to a reflective finish. Drag across the photographs to explore the difference restoration can make.",
    before: "crema-before",
    after: "crema-after",
    finish: "Polished marble",
  },
  {
    id: "emperador",
    title: "Light Emperador",
    material: "Marble",
    copy: "The depth of the stone, revealed again. Compare the veining and reflection in this Light Emperador floor before and after restoration.",
    before: "emperador-before",
    after: "emperador-after",
    finish: "Polished marble",
  },
  {
    id: "white",
    title: "White marble",
    material: "Marble",
    copy: "A softer finish for natural stone. Take a closer look at this white marble floor, restored with a satin finish.",
    before: "white-before",
    after: "white-after",
    finish: "Satin finish",
  },
  {
    id: "wood",
    title: "Wooden floor",
    material: "Wood",
    copy: "Natural warmth, brought back into focus. See this wooden floor before and after Stone Clear’s restoration work.",
    before: "wood-before",
    after: "wood-after",
    finish: "Wood restoration",
  },
];
export function ResultsViewer({ full = false }: { full?: boolean }) {
  const [project, setProject] = useState(0);
  const [playing, setPlaying] = useState(true);
  const item = restorationProjects[project];
  return (
    <div className={`results-viewer ${full ? "results-full" : ""}`}>
      <div
        className="project-choices"
        role="group"
        aria-label="Choose a restoration project"
      >
        {restorationProjects.slice(0, full ? 4 : 3).map((p, i) => (
          <button
            key={p.id}
            aria-pressed={i === project}
            onClick={() => setProject(i)}
          >
            <span>{p.title}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="result-grid">
        <ComparisonSlider
          key={item.id}
          project={item}
          playing={playing}
          onPause={() => setPlaying(false)}
          onToggle={() => setPlaying((value) => !value)}
        />
        <div className="result-copy">
          <div className="result-title" aria-live="polite">
            <span className="eyebrow">
              {item.material} / {item.finish}
            </span>
            <h3>{item.title}</h3>
          </div>
          <p>{item.copy}</p>
          <p className="photo-note">
            Actual Stone Clear project photographs.
            <br />
            Before and after views may differ in angle.
          </p>
          <Link href={full ? "/contact" : "/gallery"} className="text-link">
            {full ? "Discuss your own surface" : "Explore more transformations"}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
