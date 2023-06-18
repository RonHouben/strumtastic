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
  'G# minor'
];

export const table = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  key: text('key', { enum: ['', ...musicKeys] }).notNull(),
  musicXml: text('musicXml').notNull(),
  isEnabled: boolean('isEnabled').notNull(),
  createdAt: date('createdAt').defaultNow(),
  updatedAt: date('updatedAt')
});

export const create = createInsertSchema(table);
export const update = createInsertSchema(table).pick({
  isEnabled: true,
  title: true,
  key: true,
  musicXml: true,
});

export type IExercise = InferModel<typeof table>;
export type ICreateExercise = Zod.TypeOf<typeof create>;
export type IUpdateExercise = Zod.TypeOf<typeof update>;
