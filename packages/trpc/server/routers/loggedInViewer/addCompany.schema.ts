import { z } from "zod";

export const ZCompanyAddSchema = z.object({
  name: z.string(),
  linkedInId: z.string(),
  url: z.string(),
});

export type TCompanyAddSchema = z.infer<typeof ZCompanyAddSchema>;
