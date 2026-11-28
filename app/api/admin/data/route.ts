import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  RAYO_PRODUCTS,
  COMPANY_INFO,
  COMPANY_LOCATIONS,
  type BatteryProduct,
  type CompanyLocation,
} from '@/data/rayoData';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'rayoData.ts');
const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'images', 'products');

function devOnlyGuard() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Admin API is only available in local development mode.' },
      { status: 403 }
    );
  }
  return null;
}

async function listAvailableImages(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PRODUCTS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.(webp|png|jpe?g|avif|svg)$/i.test(e.name))
      .map((e) => `/images/products/${e.name}`)
      .sort();
  } catch {
    return [];
  }
}

export async function GET() {
  const blocked = devOnlyGuard();
  if (blocked) return blocked;

  const availableImages = await listAvailableImages();

  return NextResponse.json({
    products: RAYO_PRODUCTS,
    locations: COMPANY_LOCATIONS,
    companyInfo: COMPANY_INFO,
    availableImages,
  });
}

export interface RayoCompanyInfoPayload {
  brandName: string;
  brandSubtitle: string;
  parentCompany: string;
  registeredName: string;
  tagline: string;
  slogan: string;
  phone: string;
  formattedPhone: string;
  email: string;
  salesEmail: string;
  dealerEmail: string;
  websiteUrl: string;
  parentWebsiteUrl?: string;
  address: string;
  primaryAddress: string;
  secondaryAddress: string;
  operatingHours: string;
  description: string;
  story: string;
  certifications: string[];
  brandingAssets: {
    shieldLogo: string;
    rayoBadge: string;
    heroBanner: string;
  };
  legalDisclaimer: string;
  copyright: string;
}

interface AdminDataPayload {
  products: BatteryProduct[];
  locations: CompanyLocation[];
  companyInfo: RayoCompanyInfoPayload;
}

function serializeRayoData(payload: AdminDataPayload): string {
  const { products, locations, companyInfo } = payload;

  const scalarFields: Record<string, unknown> = {
    brandName: companyInfo.brandName,
    brandSubtitle: companyInfo.brandSubtitle,
    parentCompany: companyInfo.parentCompany,
    registeredName: companyInfo.registeredName,
    tagline: companyInfo.tagline,
    slogan: companyInfo.slogan,
    phone: companyInfo.phone,
    formattedPhone: companyInfo.formattedPhone,
    email: companyInfo.email,
    salesEmail: companyInfo.salesEmail,
    dealerEmail: companyInfo.dealerEmail,
    websiteUrl: companyInfo.websiteUrl,
  };

  const scalarEntries = Object.entries(scalarFields)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join('\n');

  const postUrlFields: Record<string, unknown> = {
    address: companyInfo.address,
    primaryAddress: companyInfo.primaryAddress,
    secondaryAddress: companyInfo.secondaryAddress,
  };

  const postUrlEntries = Object.entries(postUrlFields)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join('\n');

  const certificationsBlock = JSON.stringify(companyInfo.certifications ?? [], null, 4)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `  ${line}`))
    .join('\n');

  const brandingAssetsBlock = JSON.stringify(
    companyInfo.brandingAssets ?? {
      shieldLogo: '/images/branding/urban-ride-shield.png',
      rayoBadge: '/images/branding/rayo-badge.jpg',
      heroBanner: '/images/branding/rayo-hero-banner.jpg',
    },
    null,
    4
  )
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `  ${line}`))
    .join('\n');

  return `export interface BatteryProduct {
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

export const COMPANY_LOCATIONS: CompanyLocation[] = ${JSON.stringify(locations, null, 2)};

export const COMPANY_INFO = {
${scalarEntries}
  parentWebsiteUrl:
    process.env.NEXT_PUBLIC_URBAN_RIDE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.urbanridegreen.com"),
${postUrlEntries}
  locations: COMPANY_LOCATIONS,
  operatingHours: ${JSON.stringify(companyInfo.operatingHours)},
  description:
    ${JSON.stringify(companyInfo.description)},
  story:
    ${JSON.stringify(companyInfo.story)},
  certifications: ${certificationsBlock},
  brandingAssets: ${brandingAssetsBlock},
  legalDisclaimer:
    ${JSON.stringify(companyInfo.legalDisclaimer)},
  copyright: ${JSON.stringify(companyInfo.copyright)},
};

export const RAYO_PRODUCTS: BatteryProduct[] = ${JSON.stringify(products, null, 2)};
`;
}

export async function POST(request: Request) {
  const blocked = devOnlyGuard();
  if (blocked) return blocked;

  try {
    const body = (await request.json()) as AdminDataPayload;

    if (!Array.isArray(body.products) || !Array.isArray(body.locations) || !body.companyInfo) {
      return NextResponse.json(
        { error: 'Invalid payload: products, locations, and companyInfo are required.' },
        { status: 400 }
      );
    }

    const fileContent = serializeRayoData(body);
    await fs.writeFile(DATA_FILE_PATH, fileContent, 'utf8');

    const availableImages = await listAvailableImages();

    return NextResponse.json({
      success: true,
      message: 'Saved changes to data/rayoData.ts',
      availableImages,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save data.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
