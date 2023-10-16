import { prisma } from "@calcom/prisma";

import type { TWorkExperienceUpdateSchema } from "./updateWorkExperience.schema";

type UpdateWorkExperience = {
  input: TWorkExperienceUpdateSchema;
};

export const updateWorkExperienceHandler = async ({ input }: UpdateWorkExperience) => {
  const updateWorkExperienceRes = await prisma.workExperience.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateWorkExperienceRes };
};
