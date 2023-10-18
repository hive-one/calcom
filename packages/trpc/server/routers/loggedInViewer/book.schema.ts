import { z } from "zod";

export const ZBookAddSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  converImage: z.string(),
});
export const ZBookRemoveSchema = z.object({
  isbn: z.string(),
});
export const ZBookUpdateSchema = z.object({
  oldIsbn: z.string(),
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  converImage: z.string(),
});

export type TBookAddSchema = z.infer<typeof ZBookAddSchema>;
export type TBookRemoveSchema = z.infer<typeof ZBookRemoveSchema>;
export type TBookUpdateSchema = z.infer<typeof ZBookUpdateSchema>;
