import { z } from "zod";

export const ZBookAddSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  converImage: z.string(),
});

export type TBookAddSchema = z.infer<typeof ZBookAddSchema>;
