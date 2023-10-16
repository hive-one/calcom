import { z } from "zod";

export const ZPodcastDeleteSchema = z.object({
  id: z.number().int(),
});

export type TPodcastDeleteSchema = z.infer<typeof ZPodcastDeleteSchema>;
