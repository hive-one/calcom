import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TCompanyAddSchema, TCompanyDeleteSchema, TCompanyUpdateSchema } from "./company.schema";

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

type RemoveCompany = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TCompanyDeleteSchema;
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
