"use client";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, CheckCircle2, CircleHelp, Droplets, Hotel, House, Layers, Paintbrush } from "lucide-react";
import { emptyEnquiry, errorsForStep, PRIVACY_VERSION, properties, services, stepFields, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";

const stages = ["Service", "Space", "Project", "Your details", "Send"];
const serviceIcons = [Layers, Droplets, House, Paintbrush, CircleHelp];
const propertyIcons = [House, Hotel, Building2];
export function EnquiryForm({ preset = "" }: { preset?: string }) {
  const [answers, setAnswers] = useState<Enquiry>({ ...emptyEnquiry, service: services.some(s => s.id === preset) ? preset : "" });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [receipt, setReceipt] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const frame = useRef<HTMLFormElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const activeStep = useRef(0);
  const lastActivation = useRef(-Infinity);
  const navigated = useRef(false);
  const inFlight = useRef(false);
  const submissionId = useRef<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  useEffect(() => {
    window.history.replaceState({ ...window.history.state, stoneClearEnquiryStep: 0 }, "");
    const back = (event: PopStateEvent) => {
      const target = event.state?.stoneClearEnquiryStep;
      if (typeof target === "number" && target >= 0 && target < stages.length) {
        activeStep.current = target; navigated.current = true;
        setStep(target); setErrors({}); setFailure("");
      }
    };
    window.addEventListener("popstate", back);
    return () => window.removeEventListener("popstate", back);
  }, []);
  useEffect(() => {
    document.title = receipt ? "Enquiry received | Stone Clear" : `${stages[step]} — enquiry | Stone Clear`;
    if (!navigated.current) return;
    heading.current?.focus({ preventScroll: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduced";
    frame.current?.scrollIntoView({ block: "start", behavior: reduced ? "instant" : "smooth" });
  }, [step, receipt]);
  function update<K extends keyof Enquiry>(key: K, value: Enquiry[K]) {
    if (inFlight.current) return;
    setAnswers(previous => ({ ...previous, [key]: value })); submissionId.current = null;
  }
  function go(target: number) {
    activeStep.current = target; navigated.current = true;
    setStep(target); setErrors({}); setFailure("");
    window.history.pushState({ ...window.history.state, stoneClearEnquiryStep: target }, "", "#enquiry");
  }
  function choose(event: MouseEvent<HTMLButtonElement>, origin: number, key: "service" | "property_type", value: string) {
    if (origin !== activeStep.current || event.detail > 1 || event.timeStamp - lastActivation.current < 350) return;
    lastActivation.current = event.timeStamp; update(key, value); go(origin + 1);
  }
  function showErrors(next: EnquiryErrors) {
    setErrors(next); requestAnimationFrame(() => errorSummary.current?.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || receipt) return;
    const local = errorsForStep(step, answers);
    if (Object.keys(local).length) { showErrors(local); return; }
    if (step < 4) { go(step + 1); return; }
    const validation = validateEnquiry(answers);
    if (Object.keys(validation.errors).length) {
      go(stepFields.findIndex(keys => keys.some(key => validation.errors[key]))); showErrors(validation.errors); return;
    }
    inFlight.current = true; setSending(true); setFailure(""); setErrors({});
    submissionId.current ??= crypto.randomUUID();
    const url = new URL(window.location.href);
    const tracking = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].flatMap(key => {
      const value = url.searchParams.get(key); return value ? [[key, value.slice(0, 200)]] : [];
    }));
    try {
      const response = await fetch("/api/portal-form-submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ submission_id: submissionId.current, fields: validation.fields, honeypot: honeypot.current?.value || "", tracking, privacy_notice_version: PRIVACY_VERSION }) });
      const result = await response.json();
      if (!response.ok || result.ok !== true || typeof result.submission_id !== "string") {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || "We couldn’t confirm your enquiry. Your answers are still here. Please try again or call 087 753 3997.");
      }
      setReceipt(result.submission_id);
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Your enquiry could not be sent. Your answers are still here. Please try again.");
      requestAnimationFrame(() => errorSummary.current?.focus());
    } finally { inFlight.current = false; setSending(false); }
  }
  function input(key: "location" | "first_name" | "last_name" | "email" | "phone", label: string, options: { type?: string; autoComplete?: string; optional?: boolean; maxLength?: number } = {}) {
    return <div className="enquiry-field">
      <label htmlFor={`enquiry-${key}`}>{label} {options.optional && <span>(optional)</span>}</label>
      <input id={`enquiry-${key}`} name={key} type={options.type || "text"} autoComplete={options.autoComplete} required={!options.optional} maxLength={options.maxLength || 100} value={answers[key]} onChange={event => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} />
      {errors[key] && <p className="field-error" id={`error-${key}`}>{errors[key]}</p>}
    </div>;
  }
  return <form id="enquiry" className="enquiry-form" ref={frame} action="/api/portal-form-submit" method="post" data-ingenium-submit="portal" data-form-slug="contact" noValidate onSubmit={submit} aria-label="Stone Clear enquiry">
    <div className="enquiry-honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Leave this field empty</label><input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} /></div>
    {Object.entries(answers).filter(([key]) => !stepFields[step].includes(key as keyof Enquiry)).map(([key, value]) => <input type="hidden" name={key} value={String(value)} key={key} />)}
    <input type="hidden" name="privacy_notice_version" value={PRIVACY_VERSION} />
    {receipt ? <div className="enquiry-success">
      <CheckCircle2 size={40} strokeWidth={1.4} aria-hidden="true" /><h2 ref={heading} tabIndex={-1}>Your enquiry is in.</h2>
      <p>Thank you, {answers.first_name}. Your enquiry has been received. Stone Clear can reply by email to discuss your surface and the next step.</p>
      <p className="enquiry-reference">Reference: {receipt}</p>
      <a className="text-link" href="/gallery">Explore our restoration work <ArrowUpRight size={18} aria-hidden="true" /></a>
    </div> : <>
      <div className="enquiry-progress"><span>Step {step + 1} of {stages.length}</span><span>{stages[step]}</span></div>
      <progress value={step + 1} max={stages.length} aria-label={`Enquiry progress: step ${step + 1} of ${stages.length}`} />
      <div className="enquiry-step" key={step}>
        <h2 ref={heading} tabIndex={-1}>{["What needs a little care?", "What kind of space?", "Tell us about your project.", "How can we reach you?", "Ready when you are."][step]}</h2>
        <p className="enquiry-hint">{["Choose one to continue. We’ll ask for your email before you send.", "Choose one to continue. We’ll tailor the conversation to your space.", "Your town or county helps us plan a visit. No full address needed.", "We’ll use your email to reply about your enquiry. Phone is optional.", "Please read our privacy notice. Email updates are entirely optional."][step]}</p>
        {(Object.keys(errors).length > 0 || failure) && <div className="enquiry-error" ref={errorSummary} tabIndex={-1} role="alert">{failure || "Please check the highlighted information below."}</div>}
        {(step === 0 || step === 1) && <div className="enquiry-choices" role="group" aria-label={step === 0 ? "Choose a service" : "Choose a property type"}>
          {(step === 0 ? services : properties).map((option, index) => {
            const Icon = (step === 0 ? serviceIcons : propertyIcons)[index]; const selected = answers[step === 0 ? "service" : "property_type"] === option.id;
            return <button type="button" key={option.id} data-selected={selected} onClick={event => choose(event, step, step === 0 ? "service" : "property_type", option.id)} onKeyDown={event => { if (event.repeat) event.preventDefault(); }}><Icon size={25} strokeWidth={1.5} aria-hidden="true" /><span>{option.title}{selected && <small>Selected · continue</small>}</span>{selected ? <Check size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</button>;
          })}
        </div>}
        {step === 2 && <div className="enquiry-fields">
          {input("location", "Town or county", { autoComplete: "address-level2", maxLength: 120 })}
          <div className="enquiry-field"><label htmlFor="enquiry-message">What would you like to improve? <span>(optional)</span></label><textarea id="enquiry-message" name="message" rows={4} maxLength={2000} value={answers.message} onChange={event => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message" : "message-help"} /><p id="message-help" className="field-hint">The surface, any wear or damage, and an approximate area if you know it.</p>{errors.message && <p id="error-message" className="field-error">{errors.message}</p>}</div>
        </div>}
        {step === 3 && <div className="enquiry-fields"><div className="enquiry-name-row">{input("first_name", "First name", { autoComplete: "given-name" })}{input("last_name", "Last name", { autoComplete: "family-name" })}</div>{input("email", "Email", { type: "email", autoComplete: "email", maxLength: 254 })}{input("phone", "Phone", { type: "tel", autoComplete: "tel", optional: true, maxLength: 40 })}</div>}
        {step === 4 && <div className="enquiry-consents">
          <div className="enquiry-consent privacy-card"><label htmlFor="enquiry-privacy"><input id="enquiry-privacy" type="checkbox" name="privacy_consent" required disabled={sending} checked={answers.privacy_consent} onChange={event => update("privacy_consent", event.target.checked)} aria-invalid={Boolean(errors.privacy_consent)} aria-describedby={errors.privacy_consent ? "error-privacy_consent" : undefined} /><span><strong>Privacy Policy <small>Required</small></strong><span>I’ve read how my details are used to respond to this enquiry.</span></span></label><a href="/privacy" target="_blank" rel="noopener noreferrer">Read the Privacy Policy <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
          {errors.privacy_consent && <p id="error-privacy_consent" className="field-error">{errors.privacy_consent}</p>}
          <div className="enquiry-consent"><label htmlFor="enquiry-marketing"><input id="enquiry-marketing" type="checkbox" name="email_marketing_consent" disabled={sending} checked={answers.email_marketing_consent} onChange={event => update("email_marketing_consent", event.target.checked)} /><span><strong>Email updates <small>Optional</small></strong><span>I’d like occasional Stone Clear emails about surface care and services. I can unsubscribe at any time.</span></span></label></div>
        </div>}
      </div>
      <div className="enquiry-navigation">{step > 0 ? <button className="enquiry-back" type="button" onClick={() => { if (!sending) window.history.back(); }} disabled={sending}><ArrowLeft size={17} aria-hidden="true" />Back</button> : <span className="enquiry-start-note">A few details. A better starting point.</span>}{step >= 2 && <button className="button" type="submit" disabled={sending}>{sending ? "Sending enquiry…" : step === 4 ? "Send enquiry" : "Continue"}<ArrowRight size={18} aria-hidden="true" /></button>}</div>
      {sending && <p className="enquiry-send-status" role="status">Sending your enquiry. Please keep this page open.</p>}
    </>}
  </form>;
}
