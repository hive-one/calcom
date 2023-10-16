import { z } from "zod";

export const ZPublicationAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
  updatedAt: z.date(),
});

export type TPublicationAddSchema = z.infer<typeof ZPublicationAddSchema>;
