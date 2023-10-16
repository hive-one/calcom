import { z } from "zod";

export const ZFactUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TFactUpdateSchema = z.infer<typeof ZFactUpdateSchema>;
