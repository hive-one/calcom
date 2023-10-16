import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TMediaAppearenceAddSchema } from "./addMediaAppearence.schema";

type AddMediaAppearence = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TMediaAppearenceAddSchema;
};

export const addMediaAppearenceHandler = async ({ ctx, input }: AddMediaAppearence) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const addMediaAppearence = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      mediaAppearences: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addMediaAppearence };
};
