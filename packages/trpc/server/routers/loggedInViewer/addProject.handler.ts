import { prisma } from "@calcom/prisma";

import type { TProjectAddSchema } from "./project.schema";

type AddProject = {
  input: TProjectAddSchema;
};

export const addProjectHandler = async ({ input }: AddProject) => {
  const res = await prisma.project.create({
    data: input,
  });

  return { ...res };
};
