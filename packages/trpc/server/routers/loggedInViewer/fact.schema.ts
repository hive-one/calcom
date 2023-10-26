import { z } from "zod";

export const ZFactAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export const ZFactRemoveSchema = z.object({
  id: z.number().int(),
});

export const ZFactUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TFactUpdateSchema = z.infer<typeof ZFactUpdateSchema>;
export type TFactRemoveSchema = z.infer<typeof ZFactRemoveSchema>;
export type TFactAddSchema = z.infer<typeof ZFactAddSchema>;
