"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Layers,
  Droplets,
  House,
  Paintbrush,
  Phone,
  Mail,
  Check,
} from "lucide-react";
const options = [
  {
    id: "stone",
    title: "Stone restoration",
    icon: Layers,
    tip: "Tell us the stone type, what’s changed and the finish you have in mind.",
  },
  {
    id: "cleaning",
    title: "Cleaning & care",
    icon: Droplets,
    tip: "Tell us which surfaces need care and whether it’s a one-off clean or ongoing maintenance.",
  },
  {
    id: "exteriors",
    title: "Windows & exteriors",
    icon: House,
    tip: "Tell us about the windows or outdoor area, the property type and your location.",
  },
  {
    id: "floors",
    title: "Other flooring",
    icon: Paintbrush,
    tip: "Tell us whether you need epoxy flooring, wooden floor restoration, carpet or upholstery cleaning.",
  },
];
export function ContactOptions({ preset = "" }: { preset?: string }) {
  const [selected, setSelected] = useState(
    options.some((o) => o.id === preset) ? preset : "",
  );
  const item = options.find((o) => o.id === selected);
  const subject = `Stone Clear enquiry${item ? ` — ${item.title}` : ""}`;
  const body = `Hello Stone Clear,\n\nI’d like to discuss ${item ? item.title.toLowerCase() : "a project"}.\n\nLocation: \nSurface / approximate area: \nWhat I’d like help with: \n\nThank you`;
  return (
    <div className="contact-selector">
      <fieldset>
        <legend>What would you like help with?</legend>
        <p className="selector-hint">
          Choose a service to help start the conversation. This is optional.
        </p>
        <div className="contact-options">
          {options.map((o) => (
            <label key={o.id} className={selected === o.id ? "selected" : ""}>
              <input
                type="radio"
                name="service"
                value={o.id}
                checked={selected === o.id}
                onChange={() => setSelected(o.id)}
              />
              <o.icon size={25} strokeWidth={1.4} aria-hidden="true" />
              <span>{o.title}</span>
              <span className="option-check" aria-hidden="true">
                {selected === o.id ? (
                  <Check size={14} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="contact-result">
        <h3>
          {item
            ? `Let’s talk ${item.title.toLowerCase()}.`
            : "Let’s talk about your surface."}
        </h3>
        <p aria-live="polite">
          {item
            ? item.tip
            : "Tell us what you’d like to improve, the type of surface and where you’re based."}{" "}
          Photos are helpful if you have them.
        </p>
        <div className="contact-actions">
          <a
            className="button"
            href={`mailto:info@stoneclear.ie?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          >
            <Mail size={18} aria-hidden="true" />
            Start an email
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="button button-outline" href="tel:+353877533997">
            <Phone size={17} aria-hidden="true" />
            Call Stone Clear
          </a>
        </div>
        <p className="contact-disclosure">
          Email opens your own email app. Nothing is sent until you send it. You
          can also email info@stoneclear.ie directly.
        </p>
      </div>
    </div>
  );
}
