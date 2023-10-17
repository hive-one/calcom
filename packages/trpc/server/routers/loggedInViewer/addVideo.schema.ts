import { z } from "zod";

export const ZVideoInputSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export type TVideoInputSchema = z.infer<typeof ZVideoInputSchema>;
