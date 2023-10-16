import { z } from "zod";

export const ZBookDeleteSchema = z.object({
  isbn: z.string(),
});

export type TBookDeleteSchema = z.infer<typeof ZBookDeleteSchema>;
