import { z } from "zod";

export const ZPodcastEpisodeAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  coverImage: z.string().nullish(),
});

export const ZPodcastEpisodeDeleteSchema = z.object({
  id: z.number().int(),
});

export const ZPodcastEpisodeUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  coverImage: z.string().nullish(),
});

export type TPodcastEpisodeUpdateSchema = z.infer<typeof ZPodcastEpisodeUpdateSchema>;
export type TPodcastEpisodeDeleteSchema = z.infer<typeof ZPodcastEpisodeDeleteSchema>;
export type TPodcastEpisodeAddSchema = z.infer<typeof ZPodcastEpisodeAddSchema>;
