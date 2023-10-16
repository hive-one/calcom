import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TPodcastRemoveSchema } from "./removePodcast.schema";

type RemovePodcast = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPodcastRemoveSchema;
};

export const removePodcastHandler = async ({ ctx, input }: RemovePodcast) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const removePodcastRes = await prisma.podcast.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removePodcastRes };
};
