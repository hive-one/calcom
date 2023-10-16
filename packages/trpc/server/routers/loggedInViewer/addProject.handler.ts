import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TProjectAddSchema } from "./project.schema";

type AddProject = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TProjectAddSchema;
};

export const addProjectHandler = async ({ ctx, input }: AddProject) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const addProject = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      projects: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addProject };
};
