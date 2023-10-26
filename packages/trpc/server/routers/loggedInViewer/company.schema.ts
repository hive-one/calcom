import { z } from "zod";

export const ZCompanyAddSchema = z.object({
  name: z.string(),
  linkedInId: z.string().nullish(),
  url: z.string().nullish(),
});

export const ZCompanyDeleteSchema = z.object({
  id: z.number().int(),
});

export const ZCompanyUpdateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  linkedInId: z.string(),
  url: z.string(),
});

export type TCompanyUpdateSchema = z.infer<typeof ZCompanyUpdateSchema>;
export type TCompanyDeleteSchema = z.infer<typeof ZCompanyDeleteSchema>;
export type TCompanyAddSchema = z.infer<typeof ZCompanyAddSchema>;
