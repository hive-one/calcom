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
  console.log("handler", user);
  console.log("post input", input);

  const addPodcast = await prisma.podcast.create({
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...addPodcast };
};
