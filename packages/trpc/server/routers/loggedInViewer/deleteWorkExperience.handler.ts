import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TWorkExperienceRemoveSchema } from "./removeWorkExperience.schema";

type RemoveWorkExperience = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TWorkExperienceRemoveSchema;
};

export const removeWorkExperienceHandler = async ({ ctx, input }: RemoveWorkExperience) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const removeWorkExperienceRes = await prisma.workExperience.delete({
    where: {
      id: input.id,
    },
  });

  return { ...removeWorkExperienceRes };
};
