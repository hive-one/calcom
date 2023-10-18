import { z } from "zod";

export const ZWorkExperienceAddSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDay: z.number().int().nullish(),
  startMonth: z.number().int().nullish(),
  startYear: z.number().int(),
  isCurrentRole: z.boolean().default(false),
  endDay: z.number().int().nullish(),
  endMonth: z.number().int().nullish(),
  endYear: z.number().int().nullish(),
  companyId: z.number().int(),
  userId: z.number().int(),
});

export type TWorkExperienceAddSchema = z.infer<typeof ZWorkExperienceAddSchema>;
