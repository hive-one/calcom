import { z } from "zod";

export const ZMediaAppearenceUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  mediaType: z.string(),
  podcastId: z.number().int().nullish(),
  videoId: z.number().int().nullish(),
});

export type TMediaAppearenceUpdateSchema = z.infer<typeof ZMediaAppearenceUpdateSchema>;
