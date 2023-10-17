import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TWorkExperienceAddSchema } from "./addWorkExperience.schema";

type AddWorkExperience = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TWorkExperienceAddSchema;
};

export const addWorkExperienceHandler = async ({ ctx, input }: AddWorkExperience) => {
  const { user } = ctx;

  const addWorkExperience = await prisma.workExperience.create({
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...addWorkExperience };
};
