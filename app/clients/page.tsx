import type { Metadata } from "next";
import {
  PageIntro,
  Picture,
  Callout,
  TickList,
  TextLink,
} from "@/components/site/UI";
export const metadata: Metadata = {
  title: "Homes, hotels & commercial spaces",
};
export default function Clients() {
  return (
    <>
      <PageIntro
        label="Homes & businesses"
        title={
          <>
            Care that fits
            <br />
            your space.
          </>
        }
        copy="Specialist restoration and cleaning for private homes, hotels, offices and commercial properties across Ireland."
      />
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
