import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TFactAddSchema, TFactRemoveSchema, TFactUpdateSchema } from "./fact.schema";

type AddFact = {
  input: TFactAddSchema;
};

export const addFactHandler = async ({ input }: AddFact) => {
  const res = await prisma.fact.create({
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return res;
};

type RemoveFact = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TFactRemoveSchema;
};

export const removeFactHandler = async ({ ctx, input }: RemoveFact) => {
  const { user } = ctx;

  const removeFactRes = await prisma.fact.delete({
    where: {
      id: input.id,
      userId: user.id,
    },
  });

  return { ...removeFactRes };
};

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
