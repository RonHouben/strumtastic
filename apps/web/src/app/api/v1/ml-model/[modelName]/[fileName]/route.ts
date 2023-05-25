import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(_request: Request, { params: { modelName, fileName } }: { params: { modelName: string, fileName: string } }) {
  try {
    const modelPath = path.join(process.cwd(), 'src', 'ml-models', modelName, fileName);

    if (fileName.includes('.json')) {
      const modelFile = await fs.readFile(modelPath, 'utf-8');
      return NextResponse.json(JSON.parse(modelFile));
    }

    const modelFile = await fs.readFile(modelPath);

    return new NextResponse(modelFile , {
      headers: {
        'content-type': 'application/octet-stream'
      }
    })
  } catch (err) {
    console.error(err)
    return new NextResponse(`Error loading model ${fileName}`, { status: 400 });
  }
}