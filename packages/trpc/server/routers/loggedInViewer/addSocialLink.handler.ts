import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TSocialLinkInputSchema } from "./addSocialLink.schema";

type AddSocialLink = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TSocialLinkInputSchema;
};

export const addSocialLinkHandler = async ({ ctx, input }: AddSocialLink) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const addSocialLinkRes = await prisma.socialLink.create({
    data: input,
  });

  return { ...addSocialLinkRes };
};
