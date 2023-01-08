// This is placed in a separate file so the Zod schema's can be shared
// with the frontend for form-validation
import z from 'zod';

export const exercisesSchemas = {
  getById: z.object({
    id: z.string().uuid(),
  }),
  create: z.object({
    title: z.string().min(5).and(z.string().max(140)),
    key: z.string().endsWith(' major').or(z.string().endsWith(' minor')),
    isEnabled: z.boolean(),
    notesToPlay: z.array(z.string()).min(1, 'Must select at least 1 note'),
  }),
  updateById: z.object({
    id: z.string().uuid(),
    title: z.string().min(5).and(z.string().max(140)).optional(),
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
