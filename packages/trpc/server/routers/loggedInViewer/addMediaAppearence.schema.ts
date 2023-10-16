import { z } from "zod";

export const ZMediaAppearenceAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export type TMediaAppearenceAddSchema = z.infer<typeof ZMediaAppearenceAddSchema>;
