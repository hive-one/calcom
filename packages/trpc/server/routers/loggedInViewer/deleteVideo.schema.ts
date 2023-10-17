import { z } from "zod";

export const ZVideoDeleteInputSchema = z.object({
  id: z.number().int(),
});

export type TVideoDeleteInputSchema = z.infer<typeof ZVideoDeleteInputSchema>;
