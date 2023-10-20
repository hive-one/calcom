import { z } from "zod";

export const ZVideoAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
});

export const ZVideoUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
});

export const ZVideoRemoveSchema = z.object({
  id: z.number(),
});

export type TVideoAddSchema = z.infer<typeof ZVideoAddSchema>;
export type TVideoRemoveSchema = z.infer<typeof ZVideoRemoveSchema>;
export type TVideoUpdateSchema = z.infer<typeof ZVideoUpdateSchema>;
