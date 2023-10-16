import { prisma } from "@calcom/prisma";

import type { TFactUpdateSchema } from "./updateFact.schema";

type UpdateFact = {
  input: TFactUpdateSchema;
};

export const updateFactHandler = async ({ input }: UpdateFact) => {
  const updateFactRes = await prisma.fact.update({
    where: {
      id: input.id,
    },
    data: input,
  });

  return { ...updateFactRes };
};
