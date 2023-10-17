import { z } from "zod";

export const ZVideoAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string() || undefined,
  updatedAt: z.date(),
});

export type TVideoAddSchema = z.infer<typeof ZVideoAddSchema>;
