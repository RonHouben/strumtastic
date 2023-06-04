// This is placed in a separate file so the Zod schema's can be shared
// with the frontend for form-validation
import z from 'zod';

const TITLE_MIN_LENGHT = 3 as const;
const TITLE_MAX_LENGHT = 140 as const;

export const exercisesSchemas = {
  getById: z.object({
    id: z.string(),
  }),
  create: z.object({
    title: z.string().min(TITLE_MIN_LENGHT).and(z.string().max(TITLE_MAX_LENGHT)),
    key: z.string().endsWith(' major').or(z.string().endsWith(' minor')),
    isEnabled: z.boolean(),
    notesToPlay: z.array(z.string()).min(1, 'Must select at least 1 note'),
    musicXml: z.string(),
  }),
  delete: z.object({
    id: z.string(),
  }),
  updateById: z.object({
    id: z.string(),
    title: z.string().min(TITLE_MIN_LENGHT).and(z.string().max(TITLE_MAX_LENGHT)).optional(),
    key: z
      .string()
      .endsWith(' major')
      .or(z.string().endsWith(' minor'))
      .optional(),
    isEnabled: z.boolean().optional(),
    notesToPlay: z
      .array(z.string())
      .min(1, 'Must select at least 1 note')
      .optional(),
  }),
};
