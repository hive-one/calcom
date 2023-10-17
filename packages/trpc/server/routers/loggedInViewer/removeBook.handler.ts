import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TBookRemoveSchema } from "./book.schema";

type Removebook = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TBookRemoveSchema;
};

export const removeBookHandler = async ({ ctx, input }: Removebook) => {
  const res = await prisma.book.delete({
    where: {
      id: input.id,
    },
  });

  return { ...res };
};
