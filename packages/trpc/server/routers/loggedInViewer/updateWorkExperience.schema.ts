import { z } from "zod";

export const ZWorkExperienceUpdateSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  startDay: z.number().int().nullish(),
  startMonth: z.number().int().nullish(),
  startYear: z.number().int(),
  endDay: z.number().int().nullish(),
  endMonth: z.number().int().nullish(),
  endYear: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  companyId: z.number().int(),
  userId: z.number().int(),
});

export type TWorkExperienceUpdateSchema = z.infer<typeof ZWorkExperienceUpdateSchema>;
