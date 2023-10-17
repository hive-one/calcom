import { prisma } from "@calcom/prisma";

import type { TVideoUpdateSchema } from "./video.schema";

type UpdateVideo = {
  input: TVideoUpdateSchema;
};

export const updateVideoHandler = async ({ input }: UpdateVideo) => {
  const res = await prisma.video.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};
