import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TProjectAddSchema, TProjectRemoveSchema, TProjectUpdateSchema } from "./project.schema";

type AddProject = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TProjectAddSchema;
};

export const addProjectHandler = async ({ ctx, input }: AddProject) => {
  const addProject = await prisma.project.upsert({
    where: {
      title_userId: {
        title: input.title,
        userId: ctx.user.id,
      },
    },
    update: {},
    create: {
      ...input,
      updatedAt: new Date(),
      userId: ctx.user.id,
    },
  });

  return { ...addProject };
};

type RemoveProject = {
  input: TProjectRemoveSchema;
};

export const removeProjectHandler = async ({ input }: RemoveProject) => {
  const res = await prisma.project.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};

type UpdateProject = {
  input: TProjectUpdateSchema;
};

export const updateProjectHandler = async ({ input }: UpdateProject) => {
  const res = await prisma.project.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};
