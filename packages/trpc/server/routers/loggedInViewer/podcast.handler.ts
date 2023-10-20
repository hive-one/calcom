import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPodcastAddSchema, ZPodcastDeleteSchema, TPodcastUpdateSchema } from "./podcast.schema";

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

type RemovePodcast = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: ZPodcastDeleteSchema;
};

export const removePodcastHandler = async ({ ctx, input }: RemovePodcast) => {
  const { user } = ctx;

  const removePodcastRes = await prisma.podcast.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removePodcastRes };
};

type UpdatePodcast = {
  input: TPodcastUpdateSchema;
};

export const updatePodcastHandler = async ({ input }: UpdatePodcast) => {
  const updatePodcastRes = await prisma.podcast.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updatePodcastRes };
};
