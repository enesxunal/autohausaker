import type { Vehicle } from "@/lib/types";

const now = new Date().toISOString();

export const SEED_VEHICLES: Vehicle[] = [
  {
    id: "1",
    slug: "ferrari-488-gtb-2019",
    brand: "Ferrari",
    model: "488 GTB",
    title: "Ferrari 488 GTB",
    year: 2019,
    mileage: 28500,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 189900,
    status: "available",
    description_de:
      "Atemberaubender Ferrari 488 GTB in Rosso Corsa. Vollständige Servicehistorie, deutsche Zulassung. Vermitteltes Premium-Fahrzeug — sofort verfügbar.",
    description_en:
      "Stunning Ferrari 488 GTB in Rosso Corsa. Full service history, German registration. Premium vehicle from our stock — available immediately.",
    description_tr:
      "Rosso Corsa renginde muhteşem Ferrari 488 GTB. Tam servis geçmişi, Alman plakalı. Stoklarımızdan premium araç — hemen teslim.",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7a56aaa85057?w=1200&q=80",
      "https://images.unsplash.com/photo-1619767886555-ef0697657a10?w=1200&q=80",
    ],
    featured: true,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "2",
    slug: "porsche-911-carrera-s-2021",
    brand: "Porsche",
    model: "911 Carrera S",
    title: "Porsche 911 Carrera S",
    year: 2021,
    mileage: 15200,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 124900,
    status: "available",
    description_de:
      "Porsche 911 Carrera S mit Sport Chrono Paket, LED-Matrix-Scheinwerfer und Bose Soundsystem. Gepflegter Zustand.",
    description_en:
      "Porsche 911 Carrera S with Sport Chrono package, LED matrix headlights and Bose sound system. Well maintained.",
    description_tr:
      "Sport Chrono paketi, LED matrix farlar ve Bose ses sistemi ile Porsche 911 Carrera S. Bakımlı durumda.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    ],
    featured: true,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "3",
    slug: "mercedes-amg-gt-63-s-2022",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    title: "Mercedes-AMG GT 63 S 4MATIC+",
    year: 2022,
    mileage: 22100,
    transmission: "automatic",
    fuel_type: "petrol",
    price: null,
    status: "available",
    description_de:
      "Mercedes-AMG GT 63 S — 639 PS, V8 Biturbo. Vollausstattung mit AMG Performance Sitzen. Preis auf Anfrage.",
    description_en:
      "Mercedes-AMG GT 63 S — 639 HP, V8 biturbo. Fully equipped with AMG Performance seats. Price on request.",
    description_tr:
      "Mercedes-AMG GT 63 S — 639 BG, V8 biturbo. AMG Performance koltuklarla tam donanım. Fiyat için iletişime geçin.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    ],
    featured: true,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "4",
    slug: "bmw-m4-competition-2023",
    brand: "BMW",
    model: "M4 Competition",
    title: "BMW M4 Competition xDrive",
    year: 2023,
    mileage: 8900,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 89900,
    status: "in_transit",
    description_de:
      "BMW M4 Competition xDrive — vermittelter Import unterwegs. Erwartete Ankunft in 8–12 Wochen. Jetzt reservieren!",
    description_en:
      "BMW M4 Competition xDrive — import in transit. Expected arrival in 8–12 weeks. Reserve now!",
    description_tr:
      "BMW M4 Competition xDrive — ithalat sürecinde. Tahmini varış 8–12 hafta. Şimdi rezerve edin!",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80",
    ],
    featured: true,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "5",
    slug: "lamborghini-huracan-evo-2020",
    brand: "Lamborghini",
    model: "Huracán EVO",
    title: "Lamborghini Huracán EVO",
    year: 2020,
    mileage: 12400,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 219900,
    status: "available",
    description_de:
      "Lamborghini Huracán EVO in Bianco Monocerus. Lift-System, Carbon-Paket innen. Traumzustand.",
    description_en:
      "Lamborghini Huracán EVO in Bianco Monocerus. Lift system, carbon interior package. Dream condition.",
    description_tr:
      "Bianco Monocerus renginde Lamborghini Huracán EVO. Lift sistemi, karbon iç paket. Hayal gibi durumda.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    ],
    featured: false,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "6",
    slug: "genesis-gv80-2023",
    brand: "Genesis",
    model: "GV80",
    title: "Genesis GV80 3.5T AWD",
    year: 2023,
    mileage: 18500,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 64900,
    status: "in_transit",
    description_de:
      "Genesis GV80 — Premium-SUV zur Vermittlung per Import. Volle Ausstattung, Nappa-Leder, Head-up-Display.",
    description_en:
      "Genesis GV80 — premium SUV available for import. Full equipment, Nappa leather, head-up display.",
    description_tr:
      "Genesis GV80 — ithalat için premium SUV. Tam donanım, Nappa deri, head-up display.",
    images: [
      "https://images.unsplash.com/photo-1619767886555-ef0697657a10?w=1200&q=80",
    ],
    featured: false,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "7",
    slug: "audi-rs6-avant-2021",
    brand: "Audi",
    model: "RS6 Avant",
    title: "Audi RS6 Avant performance",
    year: 2021,
    mileage: 31200,
    transmission: "automatic",
    fuel_type: "petrol",
    price: 98900,
    status: "available",
    description_de:
      "Audi RS6 Avant performance — 600 PS, Carbon-Optik, Matrix-LED. Der perfekte Alltags-Sportwagen.",
    description_en:
      "Audi RS6 Avant performance — 600 HP, carbon optics, matrix LED. The perfect everyday sports car.",
    description_tr:
      "Audi RS6 Avant performance — 600 BG, karbon optik, matrix LED. Mükemmel günlük spor araba.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
    ],
    featured: false,
    published: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "8",
    slug: "bentley-continental-gt-2018",
    brand: "Bentley",
    model: "Continental GT",
    title: "Bentley Continental GT V8",
    year: 2018,
    mileage: 45600,
    transmission: "automatic",
    fuel_type: "petrol",
    price: null,
    status: "available",
    description_de:
      "Bentley Continental GT V8 — Luxus pur. Mulliner-Paket, Massage-Sitze. Vermitteltes Exklusivfahrzeug.",
    description_en:
      "Bentley Continental GT V8 — pure luxury. Mulliner package, massage seats. Exclusive offer.",
    description_tr:
      "Bentley Continental GT V8 — saf lüks. Mulliner paketi, masaj koltukları. Özel teklif.",
    images: [
      "https://images.unsplash.com/photo-1563720360172-25639b117fbf?w=1200&q=80",
    ],
    featured: false,
    published: true,
    created_at: now,
    updated_at: now,
  },
];
