import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TSocialLinkInputSchema,
  TSocialLinkRemoveSchema,
  TSocialLinkUpdateSchema,
} from "./socialLink.schema";

type AddSocialLink = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TSocialLinkInputSchema;
};

export const addSocialLinkHandler = async ({ ctx, input }: AddSocialLink) => {
  const { user } = ctx;

  const addSocialLinkRes = await prisma.socialLink.create({
    data: input,
  });

  return { ...addSocialLinkRes };
};

type RemoveSocialLink = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TSocialLinkRemoveSchema;
};

export const removeSocialLinkHandler = async ({ ctx, input }: RemoveSocialLink) => {
  const { user } = ctx;

  const removeSocialLinkRes = await prisma.socialLink.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeSocialLinkRes };
};

type UpdateSocialLink = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TSocialLinkUpdateSchema;
};

export const updateSocialLinkHandler = async ({ ctx, input }: UpdateSocialLink) => {
  const { user } = ctx;

  const updateSocialLinkRes = await prisma.socialLink.update({
    where: {
      id: input.id,
    },
    data: input,
  });

  return { ...updateSocialLinkRes };
};
