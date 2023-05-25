import { initFirestore } from '../init.ts';
import { seedExercises } from './exercises.ts';

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    console.log('Seeding database complete');
  });

async function main() {
  console.log('Starting seeding database');

  initFirestore();

  await seedExercises();
}
