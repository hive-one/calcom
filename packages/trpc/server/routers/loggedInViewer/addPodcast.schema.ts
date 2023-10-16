import { z } from "zod";

export const ZPodcastAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export type TPodcastAddSchema = z.infer<typeof ZPodcastAddSchema>;
