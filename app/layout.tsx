import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import { COMPANY_INFO } from "@/data/rayoData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "RAYO Batteries by Urban Ride - High-Performance Lithium-Ion EV Batteries",
    template: "%s | RAYO Batteries by Urban Ride",
  },
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
  authors: [{ name: "Urban Ride Green Motors" }],
  creator: "Urban Ride",
  publisher: "RAYO by Urban Ride",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(COMPANY_INFO.websiteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "RAYO Batteries - Reliable Power, Every Ride | Urban Ride",
    description:
      "High-density, smart BMS-controlled Lithium-Ion EV batteries (48V, 60V, 72V) and intelligent fast chargers for electric two-wheelers, three-wheelers, and commercial cargo EVs in India.",
    url: COMPANY_INFO.websiteUrl,
    siteName: "RAYO Batteries by Urban Ride",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/products/rayo-60v-battery.jpg",
        width: 1200,
        height: 630,
        alt: "RAYO 60V 40Ah Lithium-Ion EV Battery by Urban Ride Green Motors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAYO Batteries - Lithium-Ion Power for All EVs",
    description:
      "Advanced 48V, 60V, and 72V Lithium-Ion EV batteries by Urban Ride Green Motors for electric scooters, e-rickshaws, and loaders.",
    images: ["/images/products/rayo-60v-battery.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RAYO Batteries",
    legalName: COMPANY_INFO.registeredName,
    alternateName: COMPANY_INFO.parentCompany,
    url: COMPANY_INFO.websiteUrl,
    telephone: COMPANY_INFO.formattedPhone,
    email: COMPANY_INFO.email,
    slogan: COMPANY_INFO.brandSubtitle,
    description: COMPANY_INFO.description,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "H.No. 4-163, Road No. 7, RTC Colony, Chengicherla",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500092",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Dairy Complex, Padmanagar, Ramnagar",
        addressLocality: "Karimnagar",
        addressRegion: "Telangana",
        postalCode: "505001",
        addressCountry: "IN",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RAYO EV Lithium-Ion Batteries & Chargers",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "RAYO 60V 40Ah Lithium-Ion Battery",
            description: "High performance dual-tone casing EV battery with Anderson connector for e-rickshaws and e-scooters.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "RAYO 48V 32Ah / 40Ah Lithium-Ion Battery",
            description: "Lightweight drop-in lead-acid replacement battery for standard EV commuters.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "RAYO 72V 40Ah Heavy Duty EV Battery",
            description: "Extreme torque commercial battery for high-speed motorcycles and cargo loaders.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "RAYO Smart Multi-Voltage Fast Charger",
            description: "Universal switch-mode intelligent charger with active cooling fan for 48V, 60V, and 72V lithium batteries.",
          },
        },
      ],
    },
  };

  // Always default to White + Green (light theme)
  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('rayo-theme');
        var isDark = stored === 'dark';
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      } catch (e) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    })();
  `;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-lime-500 selection:text-stone-950 transition-colors duration-300">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
