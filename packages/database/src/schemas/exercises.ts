import { pgTable, serial, text, boolean, date } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const musicKeys = [
  'A major',
  'A minor',
  'A# major',
  'A# minor',
  'B major',
  'B minor',
  'C major',
  'C minor',
  'C# major',
  'C# minor',
  'D major',
  'D minor',
  'D# major',
  'D# minor',
  'E major',
  'E minor',
  'F major',
  'F minor',
  'F# major',
  'F# minor',
  'G major',
  'G minor',
  'G# major',
  'G# minor',
];

export const table = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  key: text('key', { enum: ['' , ...musicKeys ] }).notNull(),
  musicXml: text('musicXml').notNull(),
  isEnabled: boolean('isEnabled').notNull(),
  createdAt: date('createdAt').defaultNow().notNull(),
  updatedAt: date('updatedAt')
});

export const create = createInsertSchema(table, {
  id: (schema) => schema.id.positive()
});

export type IExercise = InferModel<typeof table>;
