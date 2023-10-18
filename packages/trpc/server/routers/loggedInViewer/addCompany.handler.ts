import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TCompanyAddSchema } from "./addCompany.schema";

type AddCompany = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TCompanyAddSchema;
};

export const addCompanyHandler = async ({ ctx, input }: AddCompany) => {
  const { user } = ctx;

  const company = await prisma.company.create({
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  console.log("company in handler", company);

  return { ...company };
};
