import type { Metadata } from "next";
import { PageIntro } from "@/components/site/UI";
export const metadata: Metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="Your privacy."
        copy="Information about the contact tools on this website sample."
      />
      <article className="shell privacy-copy">
        <h2>Contacting Stone Clear</h2>
        <p>
          This website does not collect enquiry details through a submission
          form. The service selector works in your browser memory. It does not
          save your selection when you refresh or send it to a lead system.
        </p>
        <p>
          The email button opens your own email application with a suggested
          message. You can edit it and decide whether to send it to
          info@stoneclear.ie. A telephone link opens your calling application.
          Normal email and phone services apply when you choose to contact the
          business.
        </p>
        <h2>Cookies and tracking</h2>
        <p>
          No marketing analytics, advertising pixels or optional cookies have
          been added to this sample. The website hosting provider may process
          technical request information to deliver and secure the website.
        </p>
        <h2>About this sample</h2>
        <p>
          This is a website concept for Stone Clear. A business-approved privacy
          notice and a suitable receiving system are required before activating
          an enquiry form or marketing communications.
        </p>
        <p>
          For questions about contacting Stone Clear, email{" "}
          <a href="mailto:info@stoneclear.ie">info@stoneclear.ie</a>.
        </p>
      </article>
    </>
  );
}
