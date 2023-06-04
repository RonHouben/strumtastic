import { Exercise } from '../models/exercise.model.ts';

type PartialExercise = Omit<
  Exercise,
  'updatedAt' | 'id'
>;

export async function seedExercises() {
  const { exerciseRepository } = await import('../repositories/exercise.repository.ts');

  console.log('Seeding Exercises');

  const exercises: PartialExercise[] = [
    {
      isEnabled: true,
      title: 'C Major Triads',
      key: 'C major',
      notesToPlay: ['C3', 'E3', 'G3'],
      createdAt: new Date(),
      musicXml: '' // TODO: add musicXml
    },
    {
      isEnabled: false,
      title: 'C Major (Ionian) scale',
      key: 'C major',
      notesToPlay: ['C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4'],
      createdAt: new Date(),
      musicXml: '' // TODO: add musicXml
    }
  ];

  for (const exercise of exercises) {
    const existing = await exerciseRepository
      .whereEqualTo('title', exercise.title)
      .whereEqualTo('key', exercise.key)
      .whereArrayContainsAny('notesToPlay', exercise.notesToPlay)
      .findOne();

    if (existing) {
      console.log(`Exercise ${exercise.title} already exists`);
    }

    if (!existing) {
      const newExercise = new Exercise();

      newExercise.createdAt = exercise.createdAt;
      newExercise.isEnabled = exercise.isEnabled;
      newExercise.key = exercise.key;
      newExercise.notesToPlay = exercise.notesToPlay;
      newExercise.title = exercise.title;
      newExercise.updatedAt = null;

      console.log('Creating exercise:', newExercise);

      await exerciseRepository.create(newExercise)
    }
  }
}
