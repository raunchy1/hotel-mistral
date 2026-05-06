// Hotel Mistral — dati reali
window.HOTEL = {
  name: "Hotel Mistral",
  city: "Alghero",
  region: "Sardegna",
  rating: 8.2,
  ratingLabel: "Ottimo",
  reviewCount: 412,
  stars: 3,
  rooms: 25,
  floors: 3,
  fromPrice: 79,
};

window.ROOMS = [
  {
    id: "matrimoniale-balcone",
    name: "Matrimoniale con Balcone",
    short: "Con balcone",
    price: 94,
    guests: 2,
    size: 14,
    beds: "1 letto matrimoniale",
    view: "Vista giardino o cortile",
    desc: "La camera più richiesta. Un balcone privato, finestre che si aprono sulla quiete del giardino, e quello che serve per dormire bene. Niente di più.",
    amenities: ["Balcone privato", "Aria condizionata", "Bagno privato", "WiFi gratuito", "TV", "Frigorifero", "Cassaforte", "Scrivania", "Bollitore"],
    available: 2,
    badge: "Ultima disponibilità",
  },
  {
    id: "doppia",
    name: "Doppia con Letti Singoli",
    short: "Letti separati",
    price: 86,
    guests: 2,
    size: 13,
    beds: "2 letti singoli",
    view: "Vista interna",
    desc: "Pensata per chi viaggia in coppia o tra amici. Stessi spazi, stessa cura, due letti separati.",
    amenities: ["Aria condizionata", "Bagno privato", "WiFi gratuito", "TV", "Frigorifero", "Cassaforte", "Scrivania", "Bollitore"],
    available: 4,
    badge: "Ottima scelta",
  },
  {
    id: "singola",
    name: "Singola",
    short: "Per uno",
    price: 72,
    guests: 1,
    size: 9,
    beds: "1 letto singolo",
    view: "Vista interna",
    desc: "Compatta, luminosa, essenziale. La scelta giusta per chi viaggia solo e non vuole sprecare nulla.",
    amenities: ["Aria condizionata", "Bagno privato", "WiFi gratuito", "TV", "Frigorifero", "Cassaforte", "Scrivania"],
    available: 3,
    badge: null,
  },
];

window.SERVICES = [
  { label: "WiFi gratuito", note: "in tutto l'hotel" },
  { label: "Parcheggio privato", note: "gratuito, 12 posti" },
  { label: "Aria condizionata", note: "in ogni camera" },
  { label: "Bar", note: "aperto 7—23" },
  { label: "Giardino", note: "con veranda" },
  { label: "Colazione", note: "€10 opzionale" },
  { label: "Sala biliardo", note: "a disposizione" },
  { label: "Concierge", note: "su richiesta" },
];

window.DISTANCES = [
  { km: "700", unit: "m", place: "Spiaggia di Maria Pia", meta: "10 min a piedi" },
  { km: "2.5", unit: "km", place: "Centro storico di Alghero", meta: "8 min in auto" },
  { km: "6", unit: "km", place: "Aeroporto di Alghero", meta: "12 min in auto" },
  { km: "15", unit: "km", place: "Grotte di Nettuno", meta: "25 min in auto" },
];

window.REVIEWS = [
  {
    quote: "Camera pulitissima, personale gentile e una posizione perfetta per chi vuole stare vicino al mare senza rinunciare al centro. Torneremo.",
    author: "Marco e Giulia",
    origin: "Milano",
    when: "Settembre 2025",
    score: 9.0,
  },
  {
    quote: "L'ho scelto per il prezzo, l'ho amato per l'accoglienza. La signora alla reception ci ha consigliato i posti migliori per cena.",
    author: "Sophie L.",
    origin: "Lyon",
    when: "Luglio 2025",
    score: 8.6,
  },
  {
    quote: "Tutto semplice e funzionante. La colazione in veranda al mattino vale ogni euro speso.",
    author: "Andrea P.",
    origin: "Bologna",
    when: "Giugno 2025",
    score: 8.4,
  },
];

window.HIGHLIGHTS = [
  { score: "9.4", label: "Pulizia", note: "Recensito 312 volte" },
  { score: "9.1", label: "Personale", note: "Recensito 287 volte" },
  { score: "8.8", label: "Rapporto qualità-prezzo", note: "Recensito 264 volte" },
];
