import { prisma } from "@calcom/prisma";

import type { TProjectUpdateSchema } from "./project.schema";

type UpdateProject = {
  input: TProjectUpdateSchema;
};

export const updateProjectHandler = async ({ input }: UpdateProject) => {
  const res = await prisma.project.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};
