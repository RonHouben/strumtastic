import { db, schema } from '../index.ts';
import { eq } from 'drizzle-orm';

export async function seedExercises() {
  console.log('Seeding Exercises');

  const exercises = [
    schema.exercises.create.parse({
      isEnabled: true,
      title: 'C Major Triads',
      musicXml: '' // TODO: add musicXml

    }),
    schema.exercises.create.parse({
      isEnabled: false,
      title: 'C Major (Ionian) scale',
      musicXml: '' // TODO: add musicXml
    })
  ];

  for (const exercise of exercises) {
    const exercises = await db
      .select()
      .from(schema.exercises.table)
      .where(eq(schema.exercises.table.title, exercise.title))
      .where(eq(schema.exercises.table.isEnabled, true))
      .where(eq(schema.exercises.table.musicXml, exercise.musicXml))
      .limit(1);

    const existingExercise = exercises[0];

    if (existingExercise) {
      console.log(`Exercise ${exercise.title} already exists`);
    }

    if (!existingExercise) {
      await db.insert(schema.exercises.table).values(exercise);

      console.log('Creating exercise:', exercise);
    }
  }
}
