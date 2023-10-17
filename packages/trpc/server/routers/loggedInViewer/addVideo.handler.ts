import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TVideoAddSchema } from "./addVideo.schema";

type AddVideo = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TVideoAddSchema;
};

export const addVideoHandler = async ({ ctx, input }: AddVideo) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const addVideo = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      videos: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addVideo };
};
