import { z } from "zod";

export const ZBookAddSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  converImage: z.string().nullish(),
});
export const ZBookRemoveSchema = z.object({
  isbn: z.string(),
});
export const ZBookUpdateSchema = z.object({
  oldIsbn: z.string(),
  isbn: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullish(),
  converImage: z.string().nullish(),
});

export type TBookAddSchema = z.infer<typeof ZBookAddSchema>;
export type TBookRemoveSchema = z.infer<typeof ZBookRemoveSchema>;
export type TBookUpdateSchema = z.infer<typeof ZBookUpdateSchema>;
