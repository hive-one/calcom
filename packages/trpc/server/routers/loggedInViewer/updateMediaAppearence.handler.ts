import { prisma } from "@calcom/prisma";

import type { TMediaAppearenceUpdateSchema } from "./updateMediaAppearence.schema";

type UpdateMediaAppearence = {
  input: TMediaAppearenceUpdateSchema;
};

export const updateMediaAppearenceHandler = async ({ input }: UpdateMediaAppearence) => {
  const updateMediaAppearenceRes = await prisma.mediaAppearence.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateMediaAppearenceRes };
};
