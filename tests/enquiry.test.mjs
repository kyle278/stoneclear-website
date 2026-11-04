import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyEnquiry, errorsForStep, validateEnquiry } from "../lib/enquiry.ts";

const valid = {
  ...emptyEnquiry, service: "stone", property_type: "home", location: "Carlow",
  first_name: "É", last_name: "O’Neill de Silva", email: " A.TEST@EXAMPLE.COM ", privacy_consent: true,
};
test("an emailed enquiry needs no phone or marketing opt-in; names stay separate", () => {
  const result = validateEnquiry(valid);
  assert.deepEqual(result.errors, {});
  assert.equal(result.fields.first_name, "É");
  assert.equal(result.fields.last_name, "O’Neill de Silva");
  assert.equal(result.fields.email, "a.test@example.com");
  assert.equal(result.fields.phone, "");
  assert.equal(result.fields.email_marketing_consent, false);
});
test("marketing never substitutes for affirmative privacy acknowledgement", () => {
  assert.ok(validateEnquiry({ ...valid, privacy_consent: false, email_marketing_consent: true }).errors.privacy_consent);
  assert.ok(validateEnquiry({ ...valid, privacy_consent: "true" }).errors.privacy_consent);
  assert.deepEqual(validateEnquiry({ ...valid, email_marketing_consent: true }).errors, {});
});
test("email is required and an optional supplied phone must be usable", () => {
  assert.ok(validateEnquiry({ ...valid, email: "", phone: "087 123 4567" }).errors.email);
  assert.ok(validateEnquiry({ ...valid, email: "bad@", phone: "hello" }).errors.phone);
  assert.deepEqual(validateEnquiry({ ...valid, phone: "+353 (87) 123-4567" }).errors, {});
});
test("unknown choices, long free text and object-shaped input are rejected", () => {
  const errors = validateEnquiry({ ...valid, service: "fabricated", property_type: "invalid", location: {}, message: "a".repeat(2001) }).errors;
  for (const key of ["service", "property_type", "location", "message"]) assert.ok(errors[key]);
});
test("step validation checks only relevant fields; unknown payload keys are excluded", () => {
  assert.deepEqual(errorsForStep(0, { ...emptyEnquiry, service: "unsure" }), {});
  assert.deepEqual(Object.keys(errorsForStep(3, emptyEnquiry)), ["first_name", "last_name", "email"]);
  assert.equal("organisation_id" in validateEnquiry({ ...valid, organisation_id: "untrusted" }).fields, false);
});
