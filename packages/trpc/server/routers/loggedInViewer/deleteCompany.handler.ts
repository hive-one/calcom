import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TCompanyRemoveSchema } from "./removeCompany.schema";

type RemoveCompany = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TCompanyRemoveSchema;
};

export const removeCompanyHandler = async ({ ctx, input }: RemoveCompany) => {
  const { user } = ctx;

  const removeCompanyRes = await prisma.company.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeCompanyRes };
};
