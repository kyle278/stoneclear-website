// Historical clients published by Stone Clear; provenance: notes/CLIENTS.md.
// A missing logo is deliberately represented by a name, never an invented mark.
export type Client = {
  name: string;
  logo?: string;
  note?: string;
  category: "hotel" | "business";
};

export const clientHistory: Client[] = [
  { name: "The Shelbourne", logo: "shelbourne.svg", category: "hotel" },
  { name: "InterContinental Dublin", logo: "intercontinental.webp", category: "hotel" },
  { name: "Powerscourt Hotel", logo: "powerscourt.webp", category: "hotel" },
  { name: "The K Club", logo: "k-club.svg", category: "hotel" },
  { name: "The College Green Hotel", logo: "college-green.svg", note: "Formerly The Westin Dublin", category: "hotel" },
  { name: "Druids Glen Hotel & Golf Resort", logo: "druids-glen.svg", category: "hotel" },
  { name: "The Morgan Hotel", logo: "morgan.webp", category: "hotel" },
  { name: "Aloft Dublin City", logo: "aloft.webp", category: "hotel" },
  { name: "The Clarence", logo: "clarence.webp", category: "hotel" },
  { name: "Limerick Strand Hotel", logo: "strand.svg", category: "hotel" },
  { name: "Hilton Dublin", logo: "hilton.webp", category: "hotel" },
  { name: "Killashee Hotel", logo: "killashee.svg", category: "hotel" },
  { name: "Athlone Springs Hotel", logo: "athlone-springs.svg", category: "hotel" },
  { name: "Toyota Naas", logo: "toyota-naas.webp", category: "business" },
  { name: "Junction 14 Mayfield", logo: "junction14.webp", category: "business" },
  { name: "Right Price Tiles, Carlow", logo: "right-price-tiles.webp", category: "business" },
  { name: "Roly’s Bistro", logo: "rolys.svg", category: "business" },
  { name: "The Springhill, Carlow", logo: "springhill.webp", category: "business" },
  { name: "Amusement City Casino", logo: "amusement-city.webp", category: "business" },
  { name: "Playland Casino, Dublin", logo: "playland.webp", category: "business" },
  { name: "Hilton Garden Inn Dublin", category: "hotel" },
  { name: "Patton Interiors", category: "business" },
  { name: "Indian Spice, Greystones", category: "business" },
  { name: "EEW, Carlow", category: "business" },
  { name: "NSBS, Ireland", category: "business" },
];

export const logoClients = clientHistory.filter(
  (client): client is Client & { logo: string } => Boolean(client.logo),
);
