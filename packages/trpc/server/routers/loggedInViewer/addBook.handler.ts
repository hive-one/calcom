import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TBookAddSchema } from "./addBook.schema";

type AddBook = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TBookAddSchema;
};

export const addBookHandler = async ({ ctx, input }: AddBook) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const addBook = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      books: {
        create: {
          ...input,
          updatedAt: new Date(),
        },
      },
    },
  });

  return { ...addBook };
};
