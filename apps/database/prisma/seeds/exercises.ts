import { PrismaClient, Exercise } from '@prisma/client';

type PartialExercise = Pick<
  Exercise,
  'title' | 'key' | 'isDisabled' | 'notesToPlay'
>;

export async function seedExercises(prismaClient: PrismaClient) {
  console.log('Seeding Exercises');

  const exercises: PartialExercise[] = [
    {
      isDisabled: false,
      title: 'C Major Triads',
      key: 'C major',
      notesToPlay: ['C3', 'E3', 'G3']
    },
    {
      isDisabled: true,
      title: 'C Major (Ionian) scale',
      key: 'C major',
      notesToPlay: []
    }
  ];

  for (const exercise of exercises) {
    const existing = await prismaClient.exercise.findFirst({
      where: {
        title: exercise.title,
        key: exercise.key,
        notesToPlay: { equals: exercise.notesToPlay }
      }
    });

    if (existing) {
      console.log(`Exercise ${exercise.title} already exists`);
    }

    if (!existing) {
      console.log('Creating exercise:', exercise);

      await prismaClient.exercise.create({
        data: exercise
      });
    }
  }
}
