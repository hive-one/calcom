import { z } from "zod";

export const ZPodcastUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export type TPodcastUpdateSchema = z.infer<typeof ZPodcastUpdateSchema>;
