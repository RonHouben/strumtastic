import { Exercises } from '../schemas/index.ts';
import { db } from '../index.ts';
import { eq } from 'drizzle-orm';

export async function seedExercises() {
  console.log('Seeding Exercises');

  const exercises = [
    Exercises.createSchema.parse({
      isEnabled: true,
      title: 'C Major Triads',
      musicXml: '' // TODO: add musicXml

    }),
    Exercises.createSchema.parse({
      isEnabled: false,
      title: 'C Major (Ionian) scale',
      musicXml: '' // TODO: add musicXml
    })
  ];

  for (const exercise of exercises) {
    const exercises = await db
      .select()
      .from(Exercises.table)
      .where(eq(Exercises.table.title, exercise.title))
      .where(eq(Exercises.table.isEnabled, true))
      .where(eq(Exercises.table.musicXml, exercise.musicXml))
      .limit(1);

    const existingExercise = exercises[0];

    if (existingExercise) {
      console.log(`Exercise ${exercise.title} already exists`);
    }

    if (!existingExercise) {
      await db.insert(Exercises.table).values(exercise);

      console.log('Creating exercise:', exercise);
    }
  }
}
