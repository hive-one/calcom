import { z } from "zod";

export const ZCompanyDeleteSchema = z.object({
  id: z.number().int(),
});

export type TCompanyDeleteSchema = z.infer<typeof ZCompanyDeleteSchema>;
