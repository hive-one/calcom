import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TFactRemoveSchema } from "./removeFact.schema";

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
    },
  });

  return { ...removeFactRes };
};
