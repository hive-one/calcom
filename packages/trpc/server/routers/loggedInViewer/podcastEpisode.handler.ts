import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TPodcastEpisodeAddSchema,
  TPodcastEpisodeDeleteSchema,
  TPodcastEpisodeUpdateSchema,
} from "./podcastEpisode.schema";

type AddPodcastEpisode = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPodcastEpisodeAddSchema;
};

export const addPodcastEpisodeHandler = async ({ ctx, input }: AddPodcastEpisode) => {
  const addPodcastEpisode = await prisma.podcastEpisode.upsert({
    where: {
      title: input.title,
    },
    update: {},
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

  return { ...addPodcastEpisode };
};

type RemovePodcastEpisode = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPodcastEpisodeDeleteSchema;
};

export const removePodcastEpisodeHandler = async ({ ctx, input }: RemovePodcastEpisode) => {
  const { user } = ctx;

  const removePodcastEpisodeRes = await prisma.podcastEpisode.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removePodcastEpisodeRes };
};

type UpdatePodcastEpisode = {
  input: TPodcastEpisodeUpdateSchema;
};

export const updatePodcastEpisodeHandler = async ({ input }: UpdatePodcastEpisode) => {
  const updatePodcastEpisodeRes = await prisma.podcastEpisode.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updatePodcastEpisodeRes };
};
