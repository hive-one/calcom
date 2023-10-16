import { prisma } from "@calcom/prisma";

import type { TPublicationAddSchema } from "./publication.schema";

type AddPublication = {
  input: TPublicationAddSchema;
};

export const addPublicationHandler = async ({ input }: AddPublication) => {
  const res = await prisma.publication.create({
    data: input,
  });

  return { ...res };
};
