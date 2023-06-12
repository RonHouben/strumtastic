import { pgTable, serial, text, boolean, date } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const table = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  musicXml: text('musicXml').notNull(),
  isEnabled: boolean('isEnabled').notNull(),
  createdAt: date('createdAt').defaultNow().notNull(),
  updatedAt: date('updatedAt')
});

export const createSchema = createInsertSchema(table, {
  id: (schema) => schema.id.positive(),
});

export type IExercise = InferModel<typeof table>;
