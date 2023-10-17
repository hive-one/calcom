import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPublicationAddSchema } from "./publication.schema";

type AddPublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationAddSchema;
};

export const addPublicationHandler = async ({ ctx, input }: AddPublication) => {
  const { user } = ctx;

  const addPublication = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      publications: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addPublication };
};
