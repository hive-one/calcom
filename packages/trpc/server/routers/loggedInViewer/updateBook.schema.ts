import { z } from "zod";

export const ZBookUpdateSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  converImage: z.string(),
});

export type TBookUpdateSchema = z.infer<typeof ZBookUpdateSchema>;
