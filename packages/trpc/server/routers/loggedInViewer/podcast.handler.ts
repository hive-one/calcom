import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPodcastAddSchema, TPodcastDeleteSchema, TPodcastUpdateSchema } from "./podcast.schema";

type AddPodcast = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPodcastAddSchema;
};

export const addPodcastHandler = async ({ ctx, input }: AddPodcast) => {
  const addPodcast = await prisma.podcast.upsert({
    where: {
      title: input.title,
    },
    update: {
      hosts: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
    create: {
      ...input,
      updatedAt: new Date(),
      hosts: {
        connect: {
          id: ctx.user.id,
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
  input: TPodcastDeleteSchema;
};

export const removePodcastHandler = async ({ ctx, input }: RemovePodcast) => {
  const removePodcastRes = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      podcasts: {
        disconnect: [{ id: input.id }],
      },
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
