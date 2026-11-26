export interface BatteryProduct {
  id: string;
  name: string;
  tagline: string;
  category: "battery" | "charger";
  voltage: string;
  capacity: string;
  energyWh: string;
  warranty: string;
  cellChemistry: string;
  cycleLife: string;
  connectorType: string;
  weight: string;
  dimensions: string;
  enclosure: string;
  chargingTime: string;
  tag: string;
  description: string;
  features: string[];
  idealForVehicles: string[];
  images: string[];
}

export interface CompanyLocation {
  id: string;
  city: string;
  title: string;
  addressLines: string[];
  fullAddress: string;
  pincode: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
    dms?: string;
  };
  mapsUrl: string;
  embedUrl: string;
  phone?: string;
  email?: string;
  isPrimary?: boolean;
}

export const COMPANY_LOCATIONS: CompanyLocation[] = [
  {
    id: "hyderabad",
    city: "Hyderabad",
    title: "Hyderabad Facility",
    addressLines: [
      "H.No. 4-163, Road No. 7, RTC Colony",
      "Chengicherla, Hyderabad",
      "Telangana – 500092, India",
    ],
    fullAddress: "H.No. 4-163, Road No. 7, RTC Colony, Chengicherla, Hyderabad, Telangana 500092",
    pincode: "500092",
    state: "Telangana",
    country: "India",
    coordinates: {
      lat: 17.41930089,
      lng: 78.60408515,
      dms: "17° 25' 9.48'' N, 78° 36' 14.71'' E",
    },
    mapsUrl: "https://maps.app.goo.gl/uN7SUqCtd2dkZ9968",
    embedUrl: "https://maps.google.com/maps?q=17.41930089,78.60408515&hl=en&z=16&output=embed",
    phone: "+91 88861 60576",
    email: "info@urbanridegreen.com",
    isPrimary: false,
  },
  {
    id: "karimnagar",
    city: "Karimnagar",
    title: "Karimnagar Works",
    addressLines: [
      "Urban Ride Green Motors",
      "Dairy Complex, Padmanagar, Ramnagar",
      "Karimnagar, Telangana – 505001, India",
    ],
    fullAddress: "Urban Ride Green Motors, Dairy Complex, Padmanagar, Ramnagar, Karimnagar, Telangana 505001",
    pincode: "505001",
    state: "Telangana",
    country: "India",
    coordinates: {
      lat: 18.4407447,
      lng: 79.105428,
      dms: "18° 26' 26.68'' N, 79° 06' 19.54'' E",
    },
    mapsUrl: "https://www.google.com/maps/place/Urban+Ride+Green+Motors/@18.4407447,79.105428,17z/data=!3m1!4b1!4m6!3m5!1s0x3bccdf3e36be2e15:0xd64dd3a1d86ca07e!8m2!3d18.4407447!4d79.105428!16s%2Fg%2F11nth474vw",
    embedUrl: "https://maps.google.com/maps?q=18.4407447,79.105428&hl=en&z=16&output=embed",
    phone: "+91 88861 60576",
    email: "info@urbanridegreen.com",
    isPrimary: true,
  },
];

export const COMPANY_INFO = {
  brandName: "RAYO",
  brandSubtitle: "Powered by Urban Ride",
  parentCompany: "Urban Ride",
  registeredName: "Urban Ride Green Motors",
  tagline: "RAYO Batteries — Powered by Urban Ride",
  slogan: "Ride Electric • Ride Green",
  phone: "8886160576",
  formattedPhone: "+91 88861 60576",
  email: "info@urbanridegreen.com",
  salesEmail: "sales@urbanridegreen.com",
  dealerEmail: "dealers@urbanridegreen.com",
  websiteUrl: "https://rayo.urbanridegreen.com",
  parentWebsiteUrl:
    process.env.NEXT_PUBLIC_URBAN_RIDE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.urbanridegreen.com"),
  address: "Hyderabad & Karimnagar, Telangana, India",
  primaryAddress: "Urban Ride Green Motors, Dairy Complex, Padmanagar, Ramnagar, Karimnagar, Telangana 505001",
  secondaryAddress: "H.No. 4-163, Road No. 7, RTC Colony, Chengicherla, Hyderabad, Telangana 500092",
  locations: COMPANY_LOCATIONS,
  operatingHours: "Monday – Saturday: 9:00 AM – 7:30 PM IST",
  description:
    "RAYO by Urban Ride Green Motors supplies Lithium-Ion battery packs (48V, 60V, 72V) and companion chargers primarily for EV bikes, electric two-wheelers, and commercial mobility.",
  story:
    "RAYO was introduced by Urban Ride Green Motors to provide dependable lithium battery solutions primarily for EV bikes and electric two-wheelers. Designed with durable metal enclosures, Anderson connectors, and built-in BMS protection for day-to-day riding.",
  certifications: [
    "Automotive Lithium-Ion Cell Architecture",
    "Integrated Battery Management System (BMS)",
    "Powder-Coated Metal Enclosure",
    "Anderson SB50 Connector Plug",
  ],
  brandingAssets: {
    shieldLogo: "/images/branding/urban-ride-shield.png",
    rayoBadge: "/images/branding/rayo-badge.jpg",
    heroBanner: "/images/branding/rayo-hero-banner.jpg",
  },
  legalDisclaimer:
    "This website, including all images, technical specifications, and descriptions, is provided solely for display and informational purposes. Specifications, pricing, and availability are subject to change without notice. Please contact our team directly via telephone at +91 88861 60576 for confirmed technical details, commercial quotes, and official orders.",
  copyright: "© 2026 RAYO Batteries by Urban Ride Green Motors. All Rights Reserved.",
};

export const RAYO_PRODUCTS: BatteryProduct[] = [
  {
    id: "rayo-60v-40ah",
    name: "RAYO 60V 40Ah Lithium-Ion Battery",
    tagline: "High-Performance Battery for EV Bikes",
    category: "battery",
    voltage: "60V",
    capacity: "40Ah (2,400Wh)",
    energyWh: "2.4 kWh",
    warranty: "Standard Warranty",
    cellChemistry: "Lithium-Ion",
    cycleLife: "Lithium-Ion Cells",
    connectorType: "Anderson SB50 Connector Plug",
    weight: "~17.5 kg",
    dimensions: "340mm × 210mm × 260mm",
    enclosure: "Powder-Coated Steel with Stainless Steel Handle",
    chargingTime: "3 – 4 Hours",
    tag: "Popular EV Bike Battery",
    description:
      "60V 40Ah Lithium-Ion battery pack designed primarily for EV bikes, electric motorcycles, and high-speed commuter scooters. Built with a powder-coated metal casing, folding handle, heavy-duty Anderson SB50 connector, and integrated BMS protection.",
    features: [
      "Optimized for high-speed EV bikes and commuter two-wheelers",
      "Durable powder-coated steel casing with folding handle",
      "Standard heavy-duty Anderson SB50 disconnect plug",
      "Integrated BMS for overcharge, over-discharge, and short-circuit protection",
      "Low self-discharge rate for dependable everyday riding",
    ],
    idealForVehicles: [
      "EV Bikes & Electric Motorcycles (60V)",
      "High-Speed Commuter EV Scooters",
      "Delivery Two-Wheelers",
      "Passenger E-Rickshaws",
    ],
    images: [
      "/images/products/rayo-60v-battery.jpg",
    ],
  },
  {
    id: "rayo-48v-32ah",
    name: "RAYO 48V 32Ah / 40Ah Lithium-Ion Battery",
    tagline: "Compact Battery for EV Bikes & Scooters",
    category: "battery",
    voltage: "48V",
    capacity: "32Ah / 40Ah",
    energyWh: "1.54 – 1.92 kWh",
    warranty: "Standard Warranty",
    cellChemistry: "Lithium-Ion",
    cycleLife: "Lithium-Ion Cells",
    connectorType: "Anderson Terminal Connector",
    weight: "~14.2 kg",
    dimensions: "310mm × 190mm × 240mm",
    enclosure: "Sealed Metal Enclosure with Corner Bumpers",
    chargingTime: "2.5 – 3.5 Hours",
    tag: "Drop-In Replacement",
    description:
      "48V Lithium-Ion battery pack for city EV bikes, electric scooters, and delivery two-wheelers. Lightweight alternative to conventional heavy battery setups.",
    features: [
      "Ideal power source for standard 48V EV bikes and scooters",
      "Direct replacement for traditional 48V lead-acid setups",
      "Significantly lighter than conventional battery packs",
      "Steady voltage output during daily urban riding",
      "Compact metal enclosure with protective bumpers",
    ],
    idealForVehicles: [
      "City EV Bikes & Scooters (48V)",
      "Courier & Delivery Two-Wheelers",
      "Light Commuter E-Bikes",
    ],
    images: [
      "/images/products/rayo-48v-battery.jpg",
    ],
  },
  {
    id: "rayo-72v-40ah",
    name: "RAYO 72V 40Ah Heavy Duty EV Battery",
    tagline: "High-Power 72V Battery for Performance EV Bikes",
    category: "battery",
    voltage: "72V",
    capacity: "40Ah (2,880Wh)",
    energyWh: "2.88 kWh",
    warranty: "Standard Warranty",
    cellChemistry: "Lithium-Ion",
    cycleLife: "Lithium-Ion Cells",
    connectorType: "High-Current Anderson Connector",
    weight: "~21.0 kg",
    dimensions: "360mm × 220mm × 270mm",
    enclosure: "Reinforced Steel Enclosure with Dual Latches",
    chargingTime: "3.5 – 4.5 Hours",
    tag: "High Torque & Speed",
    description:
      "72V 40Ah Lithium-Ion battery pack built for high-performance EV bikes, electric motorcycles, and heavy-duty commercial vehicles needing sustained high power.",
    features: [
      "High power output for performance EV bikes and acceleration",
      "Heavy-duty Anderson disconnect plug",
      "Reinforced steel enclosure with carrying handles",
      "Internal BMS for thermal and electrical safety",
    ],
    idealForVehicles: [
      "High-Speed Performance EV Bikes",
      "Electric Motorcycles (72V)",
      "Commercial EV Cargo Loaders",
    ],
    images: [
      "/images/products/rayo-72v-battery.jpg",
    ],
  },
  {
    id: "rayo-smart-charger",
    name: "RAYO Multi-Voltage Fast Charger",
    tagline: "Multi-Voltage Charger (48V / 60V / 72V)",
    category: "charger",
    voltage: "Input: 150V – 260V AC | Output: 48V / 60V / 72V",
    capacity: "Selectable Current: 6A, 10A, 15A, 20A",
    energyWh: "High-Efficiency Charging",
    warranty: "Standard Warranty",
    cellChemistry: "Switch-Mode Power Supply",
    cycleLife: "Continuous Duty",
    connectorType: "Standard AC Input Plug & Anderson Battery Output",
    weight: "~2.8 kg",
    dimensions: "240mm × 130mm × 95mm",
    enclosure: "Powder-Coated Steel Chassis with Rear Cooling Fan",
    chargingTime: "Optimized Multi-Stage Charging",
    tag: "Fast Charger",
    description:
      "Official companion charger supporting 48V, 60V, and 72V lithium battery packs. Equipped with an internal cooling fan, automatic voltage cutoff, and Anderson connector output.",
    features: [
      "Wide AC input range (150V - 260V) for stable charging",
      "Rear cooling fan with steel finger guard for heat dissipation",
      "Protection against short circuits and reverse polarity",
      "Clear LED indicators showing charging status",
      "Heavy-duty output cables with Anderson connector",
    ],
    idealForVehicles: [
      "All RAYO 48V, 60V, and 72V Battery Packs",
      "Depot & Garage Charging",
      "Standard Electric Vehicle Charging Points",
    ],
    images: [
      "/images/products/rayo-fast-charger.jpg",
    ],
  },
];
