import { exercises } from '@server/actions';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { exerciseId: string } },
) {
  const exercise = await exercises.getById<
    Pick<exercises.IExercise, 'musicXml'>
  >(Number(params.exerciseId), { musicXml: true });

  if (!exercise) {
    return new NextResponse(null, {
      status: 404,
      statusText: 'exercise not found',
    });
  }

  return new NextResponse(exercise.musicXml, {
    headers: {
      'content-type': 'application/octet-stream',
    },
  });
}
