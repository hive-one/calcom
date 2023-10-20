import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type {
  TWorkExperienceAddSchema,
  TWorkExperienceDeleteSchema,
  TWorkExperienceUpdateSchema,
} from "./workExperience.schema";

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
      ...input.workExperience,
      updatedAt: new Date(),
      company: {
        connectOrCreate: {
          where: {
            name: input.company.name,
          },
          create: {
            ...input.company,
            updatedAt: new Date(),
          },
        },
      },
    },
  });

  return { ...addWorkExperience };
};

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
type UpdateWorkExperience = {
  input: TWorkExperienceUpdateSchema;
};

export const updateWorkExperienceHandler = async ({ input }: UpdateWorkExperience) => {
  const updateWorkExperienceRes = await prisma.workExperience.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateWorkExperienceRes };
};
