import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TVideoAddSchema, TVideoUpdateSchema, TVideoRemoveSchema } from "./video.schema";

type AddVideo = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TVideoAddSchema;
};

export const addVideoHandler = async ({ ctx, input }: AddVideo) => {
  const addVideo = await prisma.video.upsert({
    where: {
      url: input.url,
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

  return { ...addVideo };
};

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
      description: input.description!,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};

type RemoveVideo = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TVideoRemoveSchema;
};

export const removeVideoHandler = async ({ ctx, input }: RemoveVideo) => {
  const res = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      videos: {
        disconnect: [{ id: input.id }],
      },
    },
  });

  return { ...res };
};
