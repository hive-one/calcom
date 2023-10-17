import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TMediaAppearenceRemoveSchema } from "./removeMediaAppearence.schema";

type RemoveMediaAppearence = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TMediaAppearenceRemoveSchema;
};

export const removeMediaAppearenceHandler = async ({ ctx, input }: RemoveMediaAppearence) => {
  const { user } = ctx;

  const removeMediaAppearenceRes = await prisma.mediaAppearence.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeMediaAppearenceRes };
};
