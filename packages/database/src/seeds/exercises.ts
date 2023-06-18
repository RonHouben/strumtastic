import * as schema from '../schemas/index.ts';
import { db } from '../database.ts';
import { eq } from 'drizzle-orm';
import { getMusicXml } from './music-xml/index.ts';

export async function seedExercises() {
  console.log('Seeding Exercises');

  const exercises = [
    schema.exercises.create.parse({
      isEnabled: true,
      title: 'C Major Triads',
      key: 'C major',
      musicXml: getMusicXml('c-major')
    }),
    schema.exercises.create.parse({
      isEnabled: false,
      title: 'C Major (Ionian) scale',
      key: 'C major',
      musicXml: '' // TODO: add musicXml
    })
  ];

  for (const exercise of exercises) {
    const existingExercises = await db
      .select()
      .from(schema.exercises.table)
      .where(eq(schema.exercises.table.title, exercise.title))
      .where(eq(schema.exercises.table.isEnabled, exercise.isEnabled))
      .where(eq(schema.exercises.table.key, exercise.key))
      .where(eq(schema.exercises.table.musicXml, exercise.musicXml))
      .limit(1);

    const existingExercise = existingExercises[0];

    if (existingExercise) {
      console.log(`Exercise ${exercise.title} already exists`);

    }

    if (!existingExercise) {
      await db.insert(schema.exercises.table).values(exercise);

      console.log('Creating exercise:', exercise);
    }
  }
}