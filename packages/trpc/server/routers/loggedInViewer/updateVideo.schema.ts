import { z } from "zod";

export const ZVideoUpdateInputSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
});

export type TVideoUpdateInputSchema = z.infer<typeof ZVideoUpdateInputSchema>;
