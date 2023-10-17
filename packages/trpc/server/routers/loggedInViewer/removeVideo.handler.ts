import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TVideoRemoveSchema } from "./video.schema";

type RemoveVideo = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TVideoRemoveSchema;
};

export const removeVideoHandler = async ({ ctx, input }: RemoveVideo) => {
  const res = await prisma.video.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};
