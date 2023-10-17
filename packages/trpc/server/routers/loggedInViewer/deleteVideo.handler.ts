import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TVideoDeleteInputSchema } from "./deleteVideo.schema";

type RemoveVideo = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TVideoDeleteInputSchema;
};

export const removeVideoHandler = async ({ ctx, input }: RemoveVideo) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const removeVideoRes = await prisma.video.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeVideoRes };
};
