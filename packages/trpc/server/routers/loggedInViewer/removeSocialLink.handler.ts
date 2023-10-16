import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TSocialLinkRemoveSchema } from "./removeSocialLink.schema";

type RemoveSocialLink = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TSocialLinkRemoveSchema;
};

export const removeSocialLinkHandler = async ({ ctx, input }: RemoveSocialLink) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const removeSocialLinkRes = await prisma.socialLink.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeSocialLinkRes };
};
