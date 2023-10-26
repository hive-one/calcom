import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TPublicationAddSchema,
  TPublicationRemoveSchema,
  TPublicationUpdateSchema,
} from "./publication.schema";

type AddPublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationAddSchema;
};

export const addPublicationHandler = async ({ ctx, input }: AddPublication) => {
  const addPublication = await prisma.publication.upsert({
    where: {
      title: input.title,
    },
    update: {
      authors: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
    create: {
      ...input,
      updatedAt: new Date(),
      authors: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
  });

  return { ...addPublication };
};

type RemovePublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationRemoveSchema;
};

export const removePublicationHandler = async ({ ctx, input }: RemovePublication) => {
  const res = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      publications: {
        disconnect: [{ id: input.id }],
      },
    },
  });

  return { ...res };
};

type UpdatePublication = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TPublicationUpdateSchema;
};

export const updatePublicationHandler = async ({ ctx, input }: UpdatePublication) => {
  const res = await prisma.publication.update({
    where: {
      id: input.id,
    },
    data: input,
  });

  return { ...res };
};
