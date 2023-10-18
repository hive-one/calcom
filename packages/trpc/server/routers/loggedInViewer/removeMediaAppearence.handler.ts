import { prisma } from "@calcom/prisma";

import type { TMediaAppearenceRemoveSchema } from "./mediaAppearence.schema";

type RemoveMediaAppearence = {
  input: TMediaAppearenceRemoveSchema;
};

export const removeMediaAppearenceHandler = async ({ input }: RemoveMediaAppearence) => {
  const res = await prisma.mediaAppearence.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};
