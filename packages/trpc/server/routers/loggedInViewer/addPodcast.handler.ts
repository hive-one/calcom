import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPodcastAddSchema } from "./addPodcast.schema";

type AddPodcast = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPodcastAddSchema;
};

export const addPodcastHandler = async ({ ctx, input }: AddPodcast) => {
  const { user } = ctx;

  const addPodcast = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      podcasts: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addPodcast };
};
