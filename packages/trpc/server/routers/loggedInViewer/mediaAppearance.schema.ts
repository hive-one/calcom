import { z } from "zod";

export const ZMediaAppearanceAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export const ZMediaAppearanceUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export const ZMediaAppearanceRemoveSchema = z.object({
  id: z.number(),
});

export type TMediaAppearanceAddSchema = z.infer<typeof ZMediaAppearanceAddSchema>;
export type TMediaAppearanceUpdateSchema = z.infer<typeof ZMediaAppearanceUpdateSchema>;
export type TMediaAppearanceRemoveSchema = z.infer<typeof ZMediaAppearanceRemoveSchema>;
