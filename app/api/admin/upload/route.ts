import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'images', 'products');

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Admin upload API is only available in local development mode.' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase() || '.jpg';
    const baseName =
      path
        .basename(file.name, path.extname(file.name))
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'rayo-product';

    const fileName = `${baseName}-${Date.now()}${ext}`;
    await fs.mkdir(PRODUCTS_DIR, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(PRODUCTS_DIR, fileName), buffer);

    return NextResponse.json({
      success: true,
      url: `/images/products/${fileName}`,
      fileName,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
