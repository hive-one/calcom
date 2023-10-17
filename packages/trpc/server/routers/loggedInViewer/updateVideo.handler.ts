import { prisma } from "@calcom/prisma";

import type { TVideoUpdateInputSchema } from "./updateVideo.schema";

type UpdateVideo = {
  input: TVideoUpdateInputSchema;
};

export const updateVideoHandler = async ({ input }: UpdateVideo) => {
  const updateVideoRes = await prisma.video.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateVideoRes };
};
