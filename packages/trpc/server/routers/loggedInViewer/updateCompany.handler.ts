import { prisma } from "@calcom/prisma";

import type { TCompanyUpdateSchema } from "./updateCompany.schema";

type UpdateCompany = {
  input: TCompanyUpdateSchema;
};

export const updateCompanyHandler = async ({ input }: UpdateCompany) => {
  const updateCompanyRes = await prisma.company.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateCompanyRes };
};
