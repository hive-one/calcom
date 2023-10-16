import { z } from "zod";

export const ZCompanyUpdateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  linkedInId: z.string(),
  url: z.string(),
});

export type TCompanyUpdateSchema = z.infer<typeof ZCompanyUpdateSchema>;
