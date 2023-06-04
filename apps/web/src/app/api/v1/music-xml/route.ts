
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(_request: Request) {
  try {
    const filePath= path.join(process.cwd(), 'src/app/api/v1/music-xml', 'c-major.xml')

    const xmlFile = await fs.readFile(filePath);

    return new NextResponse(xmlFile, {
      headers: {
        'content-type': 'application/octet-stream'
      }
    })
  } catch (err) {
    console.error(err)
    return new NextResponse(`Error loading file`, { status: 400 });
  }
}