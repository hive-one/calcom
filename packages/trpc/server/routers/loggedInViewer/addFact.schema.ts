import { z } from "zod";

export const ZFactAddSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TFactAddSchema = z.infer<typeof ZFactAddSchema>;
