import { z } from "zod";

export const ZCompanyAddSchema = z.object({
  name: z.string(),
  linkedInId: z.string().nullish(),
  url: z.string().nullish(),
});

export type TCompanyAddSchema = z.infer<typeof ZCompanyAddSchema>;
