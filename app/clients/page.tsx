import { Metadata } from "next";
import { clients } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Clients",
  description: "Selected hospitality and commercial clients Stone Clear has worked with.",
};

export default function ClientsPage() {
  return (
    <div className="page-shell page-section">
      <div className="max-w-3xl space-y-4">
        <p className="section-label">Clients</p>
        <h1 className="section-title text-balance">Trusted by hotels, venues, retailers and commercial operators.</h1>
        <p className="section-copy">
          The current Stone Clear website lists a long roster of hospitality and commercial clients. This launch page
          keeps the most credible names visible to reinforce trust without carrying over the placeholder copy that
          appeared on the original page.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((client) => (
          <div key={client} className="glass-card rounded-[1.5rem] px-5 py-6 text-sm font-semibold leading-6">
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
