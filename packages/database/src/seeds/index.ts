import { seedExercises } from './exercises.ts';

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    console.log('Seeding database complete');

    process.exit(0);
  });

async function main() {
  console.log('Starting seeding database');

  await seedExercises();
}
