import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPublicationUpdateSchema } from "./publication.schema";

type UpdatePublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationUpdateSchema;
};

export const updatePublicationHandler = async ({ ctx, input }: UpdatePublication) => {
  const res = await prisma.publication.update({
    where: {
      id: input.id,
    },
    data: input,
  });

  return { ...res };
};
