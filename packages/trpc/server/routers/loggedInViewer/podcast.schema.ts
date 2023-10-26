import { z } from "zod";

export const ZPodcastAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  coverImage: z.string().nullish(),
});

export const ZPodcastDeleteSchema = z.object({
  id: z.number().int(),
});

export const ZPodcastUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  coverImage: z.string().nullish(),
});

export type TPodcastUpdateSchema = z.infer<typeof ZPodcastUpdateSchema>;
export type TPodcastDeleteSchema = z.infer<typeof ZPodcastDeleteSchema>;
export type TPodcastAddSchema = z.infer<typeof ZPodcastAddSchema>;
