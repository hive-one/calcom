import { prisma } from "@calcom/prisma";

import type { TFactAddSchema } from "./addFact.schema";

type AddFact = {
  input: TFactAddSchema;
};

export const addFactHandler = async ({ input }: AddFact) => {
  const addSocialLinkRes = await prisma.fact.create({
    data: input,
  });

  return { ...addSocialLinkRes };
};
