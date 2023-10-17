import { z } from "zod";

export const ZVideoAddInputSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export type TVideoAddInputSchema = z.infer<typeof ZVideoAddInputSchema>;
