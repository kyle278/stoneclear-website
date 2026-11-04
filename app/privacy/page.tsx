import type { Metadata } from "next";
import { PageIntro } from "@/components/site/UI";
export const metadata: Metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="Your privacy."
        copy="How information from your enquiry is used and how to contact us about it."
      />
      <article className="shell privacy-copy">
        <h2>Contacting Stone Clear</h2>
        <p>
          The enquiry form asks for your service, property type, town or county,
          first and last name, and email address. You can also provide a phone
          number and details about your project. Please avoid including sensitive
          personal information in the project description.
        </p>
        <p>
          These details are used to understand your request, reply to you and
          discuss an assessment, demonstration or quote. Your enquiry is stored
          in Stone Clear’s enquiry system, provided by Ingenium. The receiving
          system also records submission time, source page and technical request
          information. Campaign details may be included when present in the link
          you used to visit the form.
        </p>
        <p>
          Answers stay in browser memory while you move between steps. They are
          sent when you press Send enquiry. Refreshing or leaving the page may
          clear unsent answers; they are not saved in browser storage.
        </p>
        <h2>Email updates</h2>
        <p>
          Email updates are optional and separate from your enquiry. If you opt
          in, your email address and choice are recorded for Stone Clear emails
          about surface care and services. You can decline and still send your
          enquiry. To change your preference, contact info@stoneclear.ie or use
          the unsubscribe option in a marketing email.
        </p>
        <h2>Cookies and tracking</h2>
        <p>
          No marketing analytics, advertising pixels or optional cookies have
          been added to this sample. The website hosting provider may process
          technical request information to deliver and secure the website.
        </p>
        <h2>Questions about your information</h2>
        <p>
          To ask about your enquiry or request access, correction or deletion of
          your information, email info@stoneclear.ie. Include enough information
          to identify the enquiry without sending unnecessary personal details.
        </p>
        <p>
          Privacy notice version: 4 November 2026. Contact:{" "}
          <a href="mailto:info@stoneclear.ie">info@stoneclear.ie</a>.
        </p>
      </article>
    </>
  );
}
