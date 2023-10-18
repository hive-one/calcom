import { z } from "zod";

export const ZMediaAppearenceAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export const ZMediaAppearenceUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export const ZMediaAppearenceRemoveSchema = z.object({
  id: z.number(),
});

export type TMediaAppearenceAddSchema = z.infer<typeof ZMediaAppearenceAddSchema>;
export type TMediaAppearenceUpdateSchema = z.infer<typeof ZMediaAppearenceUpdateSchema>;
export type TMediaAppearenceRemoveSchema = z.infer<typeof ZMediaAppearenceRemoveSchema>;
