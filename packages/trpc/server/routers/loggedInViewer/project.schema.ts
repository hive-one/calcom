import { z } from "zod";

export const ZProjectAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string() || undefined,
  updatedAt: z.date(),
});

export const ZProjectUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string() || undefined,
  updatedAt: z.date(),
  userId: z.number().int(),
});

export const ZProjectRemoveSchema = z.object({
  id: z.number().int(),
});

export type TProjectAddSchema = z.infer<typeof ZProjectAddSchema>;
export type TProjectRemoveSchema = z.infer<typeof ZProjectRemoveSchema>;
export type TProjectUpdateSchema = z.infer<typeof ZProjectUpdateSchema>;
