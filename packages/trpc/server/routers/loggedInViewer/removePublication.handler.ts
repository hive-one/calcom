import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPublicationRemoveSchema } from "./publication.schema";

type RemovePublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationRemoveSchema;
};

export const removePublicationHandler = async ({ ctx, input }: RemovePublication) => {
  const res = await prisma.publication.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};
