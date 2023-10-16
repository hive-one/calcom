import { z } from "zod";

export const ZFactRemoveSchema = z.object({
  id: z.number().int(),
});

export type TFactRemoveSchema = z.infer<typeof ZFactRemoveSchema>;
