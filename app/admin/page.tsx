import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import AdminClient from '@/components/AdminClient';
import {
  RAYO_PRODUCTS,
  COMPANY_LOCATIONS,
  COMPANY_INFO,
} from '@/data/rayoData';

export const dynamic = 'force-dynamic';

async function getAvailableProductImages(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'products');
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.(webp|png|jpe?g|avif|svg)$/i.test(e.name))
      .map((e) => `/images/products/${e.name}`)
      .sort();
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const availableImages = await getAvailableProductImages();

  return (
    <AdminClient
      initialProducts={RAYO_PRODUCTS}
      initialLocations={COMPANY_LOCATIONS}
      initialCompanyInfo={COMPANY_INFO}
      initialAvailableImages={availableImages}
    />
  );
}
