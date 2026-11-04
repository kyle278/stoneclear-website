import type { Metadata } from "next";
import { clientHistory } from "@/lib/client-data";
import { ClientLogo } from "@/components/site/ClientLogo";
import {
  PageIntro,
  Picture,
  Callout,
  TickList,
  TextLink,
} from "@/components/site/UI";
export const metadata: Metadata = {
  title: "Our clients | Hotels & businesses",
};
export default function Clients() {
  return (
    <>
      <PageIntro
        label="Our clients"
        title={
          <>
            In good
            <br />
            company.
          </>
        }
        copy="From landmark hotels to local businesses, we’ve cared for surfaces in spaces where first impressions matter."
      />
      <section className="shell client-history" aria-label="Clients we’ve worked with">
        <div className="client-history-intro">
          <h2>Hotels & hospitality.</h2>
          <p>Some of the hotels we’ve worked with across Ireland.</p>
        </div>
        <ul className="client-wall">
          {clientHistory.filter((client) => client.category === "hotel").map((client) => (
            <li key={client.name}><ClientLogo client={client} /></li>
          ))}
        </ul>
        <div className="client-history-intro">
          <h2>Business, built on care.</h2>
          <p>Restaurants, retailers and commercial clients.</p>
        </div>
        <ul className="client-wall">
          {clientHistory.filter((client) => client.category === "business").map((client) => (
            <li key={client.name}><ClientLogo client={client} /></li>
          ))}
        </ul>
      </section>
      <section className="shell audience-section section">
        <div className="audience-image">
          <Picture
            name="marble-hall"
            alt="Cream Marfil and black marble restoration by Stone Clear"
          />
        </div>
        <div className="audience-copy">
          <h2>
            From everyday living
            <br />
            to first impressions.
          </h2>
          <p>
            How a surface is used matters as much as how it looks. We assess the
            stone, the condition and the needs of your space before recommending
            treatment.
          </p>
          <TickList
            items={[
              "Homes & residential interiors",
              "Hotels & hospitality spaces",
              "Offices & commercial properties",
              "Cleaning & ongoing maintenance",
            ]}
          />
          <TextLink href="/contact">Discuss your space</TextLink>
        </div>
      </section>
      <Callout />
    </>
  );
}
