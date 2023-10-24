import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TPodcastEpisodeAddSchema,
  ZPodcastEpisodeDeleteSchema,
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
  const { user } = ctx;

  const addPodcastEpisode = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      podcastepisodes: {
        create: {
          ...input,
          updatedAt: new Date(),
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
  input: ZPodcastEpisodeDeleteSchema;
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
