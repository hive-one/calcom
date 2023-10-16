import { z } from "zod";

export const ZMediaAppearenceDeleteSchema = z.object({
  id: z.number().int(),
});

export type TMediaAppearenceDeleteSchema = z.infer<typeof ZMediaAppearenceDeleteSchema>;
