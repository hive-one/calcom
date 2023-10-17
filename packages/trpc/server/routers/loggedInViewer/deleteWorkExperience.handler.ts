import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TWorkExperienceDeleteSchema } from "./deleteWorkExperience.schema";

type RemoveWorkExperience = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TWorkExperienceDeleteSchema;
};

export const removeWorkExperienceHandler = async ({ ctx, input }: RemoveWorkExperience) => {
  const { user } = ctx;

  const removeWorkExperienceRes = await prisma.workExperience.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeWorkExperienceRes };
};
