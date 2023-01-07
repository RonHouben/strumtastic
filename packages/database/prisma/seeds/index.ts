import { PrismaClient } from '@prisma/client';
import { seedExercises } from './exercises';

const prismaClient = new PrismaClient();

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding database complete');
  });

async function main() {
  console.log('Starting seeding database');

  await seedExercises(prismaClient);

  await prismaClient.$disconnect();
}
