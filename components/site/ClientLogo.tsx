import Image from "next/image";
import type { Client } from "@/lib/client-data";

export function ClientLogo({ client }: { client: Client }) {
  return (
    <figure className={`client-mark${client.logo ? "" : " client-mark-text"}`}>
      {client.logo && (
        <Image
          src={`/assets/clients/${client.logo}`}
          width={240}
          height={100}
          alt=""
          className={`client-logo${client.logo === "right-price-tiles.webp" ? " client-logo-tonal" : ""}`}
          loading="lazy"
          unoptimized
        />
      )}
      <figcaption>
        <span>{client.name}</span>
        {client.note && <small>{client.note}</small>}
      </figcaption>
    </figure>
  );
}
