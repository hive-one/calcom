import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TMediaAppearanceAddSchema,
  TMediaAppearanceRemoveSchema,
  TMediaAppearanceUpdateSchema,
} from "./mediaAppearance.schema";

type AddMediaAppearance = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TMediaAppearanceAddSchema;
};

export const addMediaAppearanceHandler = async ({ ctx, input }: AddMediaAppearance) => {
  const addMediaAppearance = await prisma.mediaAppearance.upsert({
    where: {
      url: input.url,
    },
    update: {
      guests: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
    create: {
      ...input,
      updatedAt: new Date(),
      guests: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
  });

  return { ...addMediaAppearance };
};

type RemoveMediaAppearance = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TMediaAppearanceRemoveSchema;
};

export const removeMediaAppearanceHandler = async ({ ctx, input }: RemoveMediaAppearance) => {
  const res = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      mediaAppearances: {
        disconnect: [{ id: input.id }],
      },
    },
  });

  return { ...res };
};

type UpdateMediaAppearance = {
  input: TMediaAppearanceUpdateSchema;
};

export const updateMediaAppearanceHandler = async ({ input }: UpdateMediaAppearance) => {
  const updateMediaAppearanceRes = await prisma.mediaAppearance.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      description: input.description!,
      updatedAt: new Date(),
    },
  });

  return { ...updateMediaAppearanceRes };
};
