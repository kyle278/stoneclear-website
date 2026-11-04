export const PORTAL_ORIGIN = "https://portal.ingeniumconsulting.net";
export const PORTAL_SITE_ID = "0006b20c-d36e-4d2a-95f5-0a36516ab952";
export const PORTAL_FORM_ID = "795474db-b1e4-46c8-ad06-fb9ec8e31578";
export const SITE_ORIGIN = "https://stoneclear-website.vercel.app";
export const PRIVACY_VERSION = "2026-11-04";
export const services = [
  { id: "stone", title: "Stone restoration" },
  { id: "cleaning", title: "Cleaning & care" },
  { id: "exteriors", title: "Windows & exteriors" },
  { id: "floors", title: "Other flooring" },
  { id: "unsure", title: "I’m not sure" },
] as const;
export const properties = [
  { id: "home", title: "My home" },
  { id: "hotel", title: "Hotel & hospitality" },
  { id: "business", title: "Business & other" },
] as const;
export type Enquiry = {
  service: string; property_type: string; location: string; message: string;
  first_name: string; last_name: string; email: string; phone: string;
  privacy_consent: boolean; email_marketing_consent: boolean;
};
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export const emptyEnquiry: Enquiry = {
  service: "", property_type: "", location: "", message: "", first_name: "",
  last_name: "", email: "", phone: "", privacy_consent: false, email_marketing_consent: false,
};
export const stepFields: (keyof Enquiry)[][] = [
  ["service"], ["property_type"], ["location", "message"],
  ["first_name", "last_name", "email", "phone"],
  ["privacy_consent", "email_marketing_consent"],
];
export function validateEnquiry(input: Record<string, unknown>) {
  const text = (key: string) => typeof input[key] === "string" ? input[key].trim() : "";
  const fields: Enquiry = {
    service: text("service"), property_type: text("property_type"), location: text("location"), message: text("message"),
    first_name: text("first_name"), last_name: text("last_name"), email: text("email").toLowerCase(), phone: text("phone"),
    privacy_consent: input.privacy_consent === true, email_marketing_consent: input.email_marketing_consent === true,
  };
  const errors: EnquiryErrors = {};
  if (!services.some(s => s.id === fields.service)) errors.service = "Choose a service, or select ‘I’m not sure’.";
  if (!properties.some(p => p.id === fields.property_type)) errors.property_type = "Choose the type of property.";
  if (!fields.location || fields.location.length > 120) errors.location = "Enter your town or county, using up to 120 characters.";
  if (fields.message.length > 2000) errors.message = "Keep your project details to 2,000 characters.";
  if (!fields.first_name || fields.first_name.length > 100) errors.first_name = "Enter your first name, using up to 100 characters.";
  if (!fields.last_name || fields.last_name.length > 100) errors.last_name = "Enter your last name, using up to 100 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) errors.email = "Enter a valid email address so we can reply.";
  if (fields.phone && (!/^[+\d\s().-]+$/.test(fields.phone) || !/^\d{7,20}$/.test(fields.phone.replace(/\D/g, "")) || fields.phone.length > 40)) errors.phone = "Enter a valid phone number, including your country code if outside Ireland.";
  if (!fields.privacy_consent) errors.privacy_consent = "Please acknowledge the Privacy Policy before sending.";
  return { fields, errors };
}
export function errorsForStep(step: number, fields: Enquiry): EnquiryErrors {
  return Object.fromEntries(Object.entries(validateEnquiry(fields).errors).filter(([key]) => stepFields[step].includes(key as keyof Enquiry)));
}
