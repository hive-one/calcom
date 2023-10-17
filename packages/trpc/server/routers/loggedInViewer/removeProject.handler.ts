import { prisma } from "@calcom/prisma";

import type { TProjectRemoveSchema } from "./project.schema";

type RemoveProject = {
  input: TProjectRemoveSchema;
};

export const removeProjectHandler = async ({ input }: RemoveProject) => {
  const res = await prisma.project.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};
