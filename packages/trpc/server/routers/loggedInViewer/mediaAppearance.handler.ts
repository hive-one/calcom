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
  const { user } = ctx;

  const addMediaAppearance = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      mediaAppearances: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addMediaAppearance };
};

type RemoveMediaAppearance = {
  input: TMediaAppearanceRemoveSchema;
};

export const removeMediaAppearanceHandler = async ({ input }: RemoveMediaAppearance) => {
  const res = await prisma.mediaAppearance.delete({
    where: {
      id: input.id,
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
      updatedAt: new Date(),
    },
  });

  return { ...updateMediaAppearanceRes };
};
