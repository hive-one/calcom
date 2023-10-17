import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TSocialLinkUpdateSchema } from "./updateSocialLink.schema";

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
