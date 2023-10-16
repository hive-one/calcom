import { z } from "zod";

export const ZWorkExperienceDeleteSchema = z.object({
  id: z.number().int(),
});

export type TWorkExperienceDeleteSchema = z.infer<typeof ZWorkExperienceDeleteSchema>;
