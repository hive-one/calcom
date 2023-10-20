import { z } from "zod";

export const ZPublicationAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
});

export const ZPublicationRemoveSchema = z.object({
  id: z.number(),
});

export const ZPublicationUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  updatedAt: z.date(),
});

export type TPublicationAddSchema = z.infer<typeof ZPublicationAddSchema>;
export type TPublicationUpdateSchema = z.infer<typeof ZPublicationUpdateSchema>;
export type TPublicationRemoveSchema = z.infer<typeof ZPublicationRemoveSchema>;
