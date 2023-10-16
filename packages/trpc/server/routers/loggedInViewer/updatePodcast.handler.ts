import { prisma } from "@calcom/prisma";

import type { TPodcastUpdateSchema } from "./updatePodcast.schema";

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
