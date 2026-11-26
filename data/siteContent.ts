export interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
}

export interface RangeSummaryItem {
  voltage: string;
  desc: string;
  highlightColor: string;
}

export interface FilterTabOption {
  key: "all" | "battery" | "charger";
  label: string;
}

export interface TrustHighlight {
  title: string;
  description: string;
  icon: string;
}

export const SITE_METADATA = {
  home: {
    title: "RAYO Batteries by Urban Ride - High-Performance Lithium-Ion EV Batteries",
    description:
      "RAYO by Urban Ride Green Motors supplies dependable Lithium-Ion batteries (48V, 60V, 72V) and fast chargers primarily for EV bikes, electric two-wheelers, and commercial fleets. Reliable Power, Every Ride.",
    keywords: [
      "RAYO Batteries",
      "Urban Ride Green Motors",
      "EV Bikes Battery",
      "Electric Bike Lithium Battery",
      "EV Two-Wheeler Battery",
      "Lithium Ion EV Battery",
      "Electric Scooter Battery 60V",
      "48V 32Ah Lithium Battery",
      "72V 40Ah EV Battery",
      "EV Battery Charger 60V 72V",
      "Urban Ride EV",
      "Lithium Battery Pack",
    ],
  },
  products: {
    title: "RAYO EV Batteries & Smart Chargers (48V, 60V, 72V)",
    description:
      "Explore official RAYO Lithium-Ion battery packs and multi-voltage chargers engineered for EV bikes, electric scooters, e-rickshaws, and delivery fleets.",
    keywords: [
      "RAYO 60V 40Ah Battery",
      "RAYO 48V Battery",
      "RAYO 72V Battery",
      "EV Fast Charger",
      "Lithium Battery Catalog",
    ],
  },
  about: {
    title: "About Us | RAYO Batteries by Urban Ride Green Motors",
    description:
      "Discover the engineering philosophy, quality testing, and manufacturing commitments behind RAYO Lithium-Ion EV batteries in Telangana, India.",
    keywords: [
      "About RAYO Batteries",
      "Urban Ride Green Motors Manufacturing",
      "Telangana EV Battery Assembly",
      "EV Battery Quality Standards",
    ],
  },
  contact: {
    title: "Contact Us & Dealership Inquiries | RAYO Batteries",
    description:
      "Get in touch with Urban Ride Green Motors for RAYO battery specifications, custom fleet orders, regional dealership opportunities, and hotline support.",
    keywords: [
      "Contact RAYO Batteries",
      "Urban Ride Green Motors Contact",
      "EV Battery Dealership Telangana",
      "Battery Hotline India",
    ],
  },
};

export const HOME_CONTENT = {
  hero: {
    tagline: "Powered by Urban Ride • 48V • 60V • 72V",
    titlePrefix: "Reliable Power for",
    titleHighlight: "EV Bikes",
    description:
      "Engineered primarily for EV bikes, high-speed e-scooters, and commuter two-wheelers, with models also powering e-rickshaws and commercial loaders. Built with durable powder-coated steel casings, carry handles, heavy-duty Anderson SB50 connectors, and integrated BMS protection.",
    badges: [
      { label: "Lithium-Ion Cells", icon: "BatteryCharging" },
      { label: "Integrated BMS", icon: "Cpu" },
      { label: "Anderson Plug", icon: "Zap" },
    ],
    ctaWhatsApp: "Inquire on WhatsApp",
    ctaCallPrefix: "Call:",
    ctaExplore: "Explore Products",
    trustSubtext: "RAYO Batteries • Powered by Urban Ride Green Motors",
    cardBadge: "Lithium-Ion Pack",
    cardConnectorLabel: "Connector:",
    cardConnectorValue: "Anderson SB50 Plug",
    cardUseLabel: "Primary Use:",
    cardUseValue: "EV Bikes & Scooters",
  },
  valueProps: [
    {
      title: "Lithium-Ion Technology",
      desc: "Provides steady current delivery and longer service life compared to traditional lead-acid batteries.",
      icon: "BatteryCharging",
    },
    {
      title: "Efficient Charging",
      desc: "Recharges efficiently with companion multi-voltage chargers to minimize vehicle downtime.",
      icon: "Zap",
    },
    {
      title: "Durable Metal Enclosure",
      desc: "Powder-coated steel casing with a folding carry handle protects internal cells from everyday road shocks.",
      icon: "Layers",
    },
    {
      title: "Integrated BMS Protection",
      desc: "Built-in protection circuitry safeguards cells against overcharging, deep discharge, and short circuits.",
      icon: "ShieldCheck",
    },
  ],
  showcaseHeader: {
    badge: "Product Lineup",
    title: "Lithium-Ion Batteries & Multi-Voltage Chargers",
    description:
      "Designed for consistent power delivery, easy handling with standard Anderson plugs, and everyday electric mobility.",
  },
  chargerSpotlight: {
    badge: "Companion Charger",
    title: "RAYO Multi-Voltage Fast Charger (48V / 60V / 72V)",
    description:
      "Accepts 150V–260V AC inputs to handle everyday voltage variations. Equipped with selectable current feeds and an active cooling fan for reliable heat dissipation.",
    coolingFanBadge: "Rear Cooling Fan",
    specs: [
      { label: "Voltage Support:", value: "48V, 60V, 72V", color: "text-lime-400" },
      { label: "Current Options:", value: "6A to 20A", color: "text-white" },
      { label: "Connector:", value: "Anderson Output", color: "text-emerald-400" },
    ],
    ctaWhatsApp: "Inquire for Charger",
    ctaDetails: "View Details",
  },
  rangeSummary: {
    items: [
      { voltage: "48V Packs", desc: "For commuter EV bikes & scooters", highlightColor: "text-stone-900 dark:text-white" },
      { voltage: "60V Packs", desc: "For high-speed EV bikes & e-rickshaws", highlightColor: "text-lime-600 dark:text-lime-400" },
      { voltage: "72V Packs", desc: "For performance EV bikes & loaders", highlightColor: "text-stone-900 dark:text-white" },
      { voltage: "Fast Chargers", desc: "Multi-voltage with cooling fans", highlightColor: "text-emerald-600 dark:text-emerald-400" },
    ],
  },
  bottomCta: {
    badge: "Powered by Urban Ride Green Motors",
    title: "Looking for Reliable EV Batteries?",
    description:
      "Connect directly with our sales desk at Urban Ride Green Motors for specifications, pricing, and availability.",
    ctaWhatsAppPrefix: "Chat on WhatsApp:",
    ctaCall: "Call Us Direct",
  },
};

export const WHY_RAYO_CONTENT = {
  badge: "The Engineering Advantage",
  title: "Why EV Owners & Commercial Fleets Choose RAYO",
  description:
    "Every battery pack bearing the RAYO badge is built to uncompromising automotive benchmarks. Here is how our engineering outlasts generic market alternatives:",
  trustPills: [
    "Lithium-Ion Architecture",
    "Integrated BMS Protection",
    "Anderson Connectors",
  ],
  pillars: [
    {
      id: "bms",
      title: "Intelligent Smart BMS Architecture",
      desc: "Microsecond-speed active monitoring of every cell. Safeguards against overcharge, deep discharge, high-current spikes, short-circuits, and cell imbalance.",
      icon: "Cpu",
    },
    {
      id: "thermal",
      title: "Indian Summer Thermal Management",
      desc: "Calibrated for severe ambient climates from -10°C to +55°C. Multi-point thermal sensors shut down heat build-up before it can cause thermal runaway.",
      icon: "Thermometer",
    },
    {
      id: "enclosure",
      title: "Impact-Resistant Heavy Metal Enclosure",
      desc: "Powder-coated dual-tone casing with stainless steel foldable carry handles and shock-dampened cell potting to absorb severe pothole vibrations.",
      icon: "Layers",
    },
    {
      id: "charging",
      title: "Efficient Lithium Charging",
      desc: "Lithium cells maintain dependable voltage output during daily use. Supports efficient recharge cycles with compatible chargers.",
      icon: "BatteryCharging",
    },
    {
      id: "anderson",
      title: "Heavy-Duty Anderson Disconnects",
      desc: "Original silver-plated copper Anderson power terminals with fire-retardant sleeves guarantee minimal contact resistance and zero spark hazard.",
      icon: "Zap",
    },
    {
      id: "urban-ride",
      title: "Powered by Urban Ride Green Motors",
      desc: "Direct manufacturer backing, genuine spare parts, regional service hubs in Telangana, and dedicated technical support by Urban Ride Green Motors.",
      icon: "Award",
    },
  ],
};

export const URBAN_RIDE_POSTER_CONTENT = {
  badge: "Parent Manufacturer • Powered by Urban Ride",
  title: "RAYO Batteries — Powered by Urban Ride",
  description:
    "Engineered by Urban Ride Green Motors to power our EV Bikes, electric scooters, and commercial fleets across India.",
  portalLinkText: "Visit Urban Ride Portal",
  bannerAlt: "Urban Ride EV Bikes & Scooters Powered by RAYO",
  integrationBadge: "Official OEM Battery Integration",
  bannerTitle: "Powering Urban Ride EV Bikes & Electric Scooters Across India",
  taglines: [
    "Powerful Performance",
    "Long Lasting Battery",
    "Eco Friendly Ride",
    "Trusted Reliability",
  ],
  ctaPacks: "Explore Compatible Packs",
  ctaOem: "Inquire OEM",
};

export const PRODUCTS_PAGE_CONTENT = {
  hero: {
    badge: "Powered by Urban Ride • 48V • 60V • 72V Lineup",
    title: "RAYO EV Batteries & Multi-Voltage Chargers",
    description:
      "Lithium-Ion battery packs and smart chargers engineered primarily for EV bikes, electric two-wheelers, and commercial fleets. Built with durable metal casings, heavy-duty Anderson disconnects, and integrated BMS protection.",
    ctaWhatsApp: "Get Instant Price Quote",
    ctaCallPrefix: "Call",
  },
  showcase: {
    title: "Available Product Models",
    description: "Select between complete lithium battery packs and smart fast chargers.",
    filterTabs: [
      { key: "all", label: "All Products" },
      { key: "battery", label: "Batteries (48V/60V/72V)" },
      { key: "charger", label: "Smart Chargers" },
    ] as FilterTabOption[],
  },
  displayNotice: {
    title: "Display Notice & Technical Inquiries:",
    description:
      "Product photographs, dimensional measurements, and technical specifications are presented for display and demonstration purposes. Before placing orders or designing vehicle enclosures, please confirm exact batch dimensions and connector configurations by calling our direct helpline at",
  },
  bulkBanner: {
    badge: "Bulk Supply & Fleet Inquiries",
    title: "Need a Custom Battery Capacity or OEM Bulk Deal?",
    description:
      "Urban Ride Green Motors partners with EV conversion workshops, electric fleet depots, and regional distributors with custom capacity configurations.",
    ctaWhatsApp: "Connect on WhatsApp",
    ctaContact: "Submit Fleet Inquiry",
  },
};

export const ABOUT_PAGE_CONTENT = {
  hero: {
    badge: "RAYO Batteries • Powered by Urban Ride Green Motors",
    title: "About RAYO Batteries",
  },
  difference: {
    badge: "The RAYO Difference",
    title: "Designed to Conquer Indian Roads & Weather",
    paragraph1:
      "India's commercial EV landscape is among the most demanding in the world. High payloads, unpaved potholes, extreme summer temperatures exceeding 45°C, and water-logged monsoon roads destroy generic imported battery packs in months.",
    paragraph2:
      "At Urban Ride Green Motors, we engineer RAYO batteries with heavy dual-tone powder-coated steel enclosures, genuine Anderson high-current disconnects, and automotive Smart BMS chips programmed with rigorous thermal safety boundaries.",
    imageBadge: "Automotive-Grade Lithium Assembly",
    imageCaption:
      "Every cell is impedance-matched and locked into high-density vibration-damped matrices with flame-retardant enclosures.",
    stats: [
      { value: "48V • 60V • 72V", label: "Voltage Options", color: "text-lime-600 dark:text-lime-400" },
      { value: "Integrated BMS", label: "Battery Protection", color: "text-emerald-600 dark:text-emerald-400" },
    ],
  },
  commitments: {
    title: "Our Manufacturing Commitments",
    description: "Empowering EV drivers and fleet operators with non-stop dependability.",
    items: [
      {
        title: "Certified Safety & Rigorous QA",
        desc: "Every battery batch undergoes strict quality audits: capacity verification, vibration endurance tests, short-circuit protection verification, and temperature stress cycling.",
        icon: "ShieldCheck",
      },
      {
        title: "Fleet & Commercial Readiness",
        desc: "We understand that downtime costs livelihoods. We supply fast-turnaround warranty replacements and genuine spare Anderson harnesses to keep delivery fleets rolling.",
        icon: "Truck",
      },
      {
        title: "Continuous BMS Innovation",
        desc: "Our embedded hardware team refines charging curves, improves low-voltage cutoff accuracy, and ensures smooth linear power output across the entire discharge spectrum.",
        icon: "Cpu",
      },
    ],
  },
};

export const CONTACT_PAGE_CONTENT = {
  header: {
    badge: "Connect with RAYO",
    title: "Contact Urban Ride Green Motors",
    description:
      "Whether you are looking to upgrade an existing EV, power a commercial delivery fleet, or become a registered RAYO dealer in your region.",
  },
  leftCard: {
    badge: "Parent Manufacturer",
    title: "Urban Ride Green Motors",
    division: "RAYO Batteries & Charging Systems Division",
    hyderabadTitle: "Hyderabad Facility",
    karimnagarTitle: "Karimnagar",
    getDirectionsText: "Get Directions on Google Maps",
    phoneTitle: "Phone & WhatsApp Hotline:",
    phoneSubtext: "Available for technical inquiries & bulk supply",
    emailTitle: "Official Email:",
    hoursTitle: "Operating Hours:",
    ctaWhatsApp: "WhatsApp Now",
    ctaCall: "Call Us",
  },
  photoCard: {
    badge: "Heavy-Duty Metal Enclosure",
    caption:
      "Every RAYO unit features powder-coated steel housing, standard Anderson connectors, and internal BMS protection.",
  },
  form: {
    title: "Request EV Battery Specs, Pricing or Dealership",
    subtitle:
      "Submit your vehicle specs below. Our battery engineering team at Urban Ride will connect on WhatsApp or phone immediately.",
    nameLabel: "Full Name *",
    namePlaceholder: "e.g. Anand Kumar",
    phoneLabel: "Phone / WhatsApp Number *",
    phonePlaceholder: "e.g. 98490 12345",
    pincodeLabel: "PIN Code (Delivery Area) *",
    pincodePlaceholder: "e.g. 500001",
    pincodeValidBadge: "Express Dispatch Available",
    cityLabel: "City & State *",
    cityPlaceholder: "e.g. Hyderabad, Bengaluru, Delhi",
    vehicleTypeLabel: "Target Vehicle Type *",
    vehicleOptions: [
      "EV Bike / Electric Motorcycle",
      "High-Speed E-Scooter (60V)",
      "City Commuter E-Scooter (48V)",
      "Passenger E-Rickshaw (3W)",
      "Commercial Cargo Loader (3W)",
      "Delivery Fleet 2W / 3W",
      "Custom EV Project / Retrofit",
    ],
    batteryModelLabel: "Preferred Battery Model or Charger *",
    batteryOptions: [
      "RAYO 60V 40Ah Lithium-Ion Battery (Most Popular for EV Bikes)",
      "RAYO 48V 32Ah / 40Ah Lithium-Ion Battery (Drop-in Replacement)",
      "RAYO 72V 40Ah Heavy-Duty Battery (High Torque & Speed)",
      "RAYO Multi-Voltage Fast Charger (48V / 60V / 72V)",
      "Custom Voltage / Capacity Requirement",
    ],
    purposeLabel: "Primary Usage / Intent *",
    purposeOptions: [
      "Individual EV Bike / Scooter Upgrade",
      "Commercial Fleet / Delivery Operations",
      "Passenger E-Rickshaw Daily Workhorse",
      "Regional Dealership / Bulk Reseller",
      "EV Retrofit Workshop / OEM Supply",
    ],
    quantityLabel: "Estimated Units Required *",
    quantityOptions: [
      { value: "1", label: "1 Unit (Personal Upgrade / Sample)" },
      { value: "2-5", label: "2 – 5 Units (Small Fleet / Trials)" },
      { value: "6-20", label: "6 – 20 Units (Fleet / Depot Supply)" },
      { value: "20+", label: "20+ Units (Commercial Bulk / Dealer)" },
    ],
    messageLabel: "Additional Vehicle Notes or Specs (Optional)",
    messagePlaceholder: "Mention current battery setup, motor wattage, or specific range requirements...",
    submitButton: "Send Inquiry on WhatsApp",
    displayNotice: "* Notice: This website is for informational display purposes. For immediate confirmed technical details and pricing, please contact us directly by phone at",
    successTitle: "Inquiry Ready!",
    successDescription: "Your WhatsApp message has been generated. If the WhatsApp window did not open automatically, click the button below:",
    openWhatsAppButton: "Open WhatsApp Chat",
    resetButton: "← Send Another Inquiry",
    validationErrors: {
      nameRequired: "Please enter your full name.",
      phoneInvalid: "Please enter a valid 10-digit mobile number.",
      pincodeInvalid: "Please enter a valid 6-digit Indian PIN code.",
      cityRequired: "Please enter your city and state.",
    },
  },
};

export const FOOTER_CONTENT = {
  trustHighlights: [
    {
      title: "High-Energy Lithium-Ion Technology",
      description: "48V, 60V, and 72V architectures designed for intense daily commercial cycles with minimal self-discharge.",
      icon: "Zap",
    },
    {
      title: "Built-In Safety Protection",
      description: "Integrated battery management system protecting against overcharging, deep discharge, and short circuits.",
      icon: "ShieldCheck",
    },
    {
      title: "All-EV Universal Compatibility",
      description: "Powers e-scooters, passenger e-rickshaws, commercial cargo loaders, and custom electric conversions.",
      icon: "Sparkles",
    },
  ],
  columns: {
    lineupTitle: "Battery Lineup",
    companyTitle: "Company & Standards",
    mobilityTitle: "Partners & Mobility",
    aboutUsLink: "About RAYO Batteries",
    salesDeskLink: "Corporate Sales Desk",
    fleetSupplyLink: "Commercial Fleet Supply",
    urbanRidePortalLink: "Urban Ride EV Portal",
  },
  legalDisclaimer: {
    title: "Legal Disclaimer & Display Notice",
    body: "This website and all related digital content—including product images, technical specifications, illustrations, vehicle pairings, and performance indicators—are published exclusively for display and informational showcase purposes. Specifications, dimensions, cell configurations, and commercial pricing are subject to continuous engineering updates and may vary based on vehicle requirements and production batches. Nothing on this website constitutes a formal commercial quotation, legally binding contract, or warranty undertaking. For verified technical specifications, current availability, and confirmed commercial pricing, please contact our authorized team directly via telephone at",
    visitText: "or visit our facilities.",
  },
};

export const NAVBAR_CONTENT = {
  announcement: {
    brandSubtitle: "RAYO Batteries",
    poweredBy: "Powered by Urban Ride Green Motors",
    specRange: "48V • 60V • 72V Lithium-Ion",
    hotlineLabel: "Direct Hotline:",
  },
  brand: {
    brandName: "RAYO",
    evBadge: "EV",
    poweredByPrefix: "Powered by",
    parentName: "Urban Ride",
  },
  actions: {
    directCallTitle: "Direct Call",
    inquireButton: "Inquire",
    mobileToggleLabel: "Toggle navigation menu",
    mobileCallPrefix: "Call:",
    mobileWhatsApp: "Inquire on WhatsApp",
  },
};

export const LOCATIONS_SECTION_CONTENT = {
  badge: "Our Facilities & Presence",
  title: "Visit Our Locations in Telangana",
  description: "Standardized assembly, sales, and service hubs powering RAYO EV Batteries across Hyderabad and Karimnagar.",
  getDirectionsText: "Get Directions",
  copiedText: "Address Copied!",
  copyAddressText: "Copy Address",
  callPrefix: "Call",
};

export const SPECS_TABLE_CONTENT = {
  badge: "Engineering Specifications",
  title: "RAYO EV Battery & Charger Technical Comparison",
  description: "Compare mechanical dimensions, electrical parameters, cell chemistry, and warranty tiers across the RAYO lineup.",
  printButtonText: "Print / Save PDF",
  columns: [
    { key: "param", label: "Parameter" },
    { key: "rayo60", label: "RAYO 60V 40Ah" },
    { key: "rayo48", label: "RAYO 48V 32/40Ah" },
    { key: "rayo72", label: "RAYO 72V 40Ah" },
    { key: "charger", label: "Smart Fast Charger" },
  ],
  rows: [
    {
      parameter: "Nominal Voltage",
      rayo60: "60 Volts",
      rayo48: "48 Volts",
      rayo72: "72 Volts",
      charger: "48V / 60V / 72V Auto",
    },
    {
      parameter: "Rated Capacity",
      rayo60: "40 Ah (2,400 Wh)",
      rayo48: "32 Ah / 40 Ah",
      rayo72: "40 Ah (2,880 Wh)",
      charger: "6A / 10A / 15A / 20A",
    },
    {
      parameter: "Battery Chemistry",
      rayo60: "Lithium-Ion",
      rayo48: "Lithium-Ion",
      rayo72: "Lithium-Ion",
      charger: "SMPS Switch-Mode",
    },
    {
      parameter: "Protection",
      rayo60: "Integrated BMS",
      rayo48: "Integrated BMS",
      rayo72: "Integrated BMS",
      charger: "Over-Voltage / Short-Circuit",
    },
    {
      parameter: "Approx. Weight",
      rayo60: "~17.5 kg",
      rayo48: "~14.2 kg",
      rayo72: "~21.0 kg",
      charger: "~2.8 kg",
    },
    {
      parameter: "Connector System",
      rayo60: "Anderson SB50 Heavy Plug",
      rayo48: "Anderson SB50 / Marine",
      rayo72: "High-Current Anderson Marine",
      charger: "Anderson + 3-Pin AC Plug",
    },
    {
      parameter: "BMS Safety Cutoffs",
      rayo60: "Overcharge, Overdischarge, Short-circuit, Thermal Overheat",
      rayo48: "Cell Balance, Deep Discharge, Thermal Lockout",
      rayo72: "Dual Sensor Thermal, High Peak Inrush Cutoff",
      charger: "Reverse Polarity, Short, Over-Voltage Cutoff",
    },
    {
      parameter: "Standard Warranty",
      rayo60: "Up to 36 Months",
      rayo48: "18 – 36 Months",
      rayo72: "24 – 36 Months",
      charger: "12 – 24 Months",
    },
    {
      parameter: "Primary Vehicles",
      rayo60: "E-Rickshaws, 60V High-Speed E-Scooters",
      rayo48: "City Commuter E-Scooters, Delivery E-Bikes",
      rayo72: "Cargo Tippers, High-Speed Performance EVs",
      charger: "Universal for All RAYO Battery Packs",
    },
  ],
};

export const PRODUCT_CARD_CONTENT = {
  specsLabels: {
    voltage: "Voltage & Output",
    capacity: "Energy Capacity",
    chemistry: "Battery Type",
    connector: "Connector Plug",
  },
  highlightsHeading: "Engineered Highlights:",
  idealVehiclesHeading: "Ideal EV Applications:",
  inquireWhatsApp: "Inquire on WhatsApp",
  specsAndQuote: "Specs & Quote",
  ariaPrevPhoto: "Previous photo",
  ariaNextPhoto: "Next photo",
  ariaGoToSlidePrefix: "Go to slide",
};

export const QUICK_ACTIONS_CONTENT = {
  scrollToTopAria: "Scroll to top",
  scrollToTopTitle: "Back to top",
  directCallTitle: "Direct Call",
  whatsappTitle: "Inquire on WhatsApp",
  whatsappButtonText: "Inquire on WhatsApp",
};
