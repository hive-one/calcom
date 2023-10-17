import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TBookRemoveSchema } from "./removeBook.schema";

type RemoveBook = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TBookRemoveSchema;
};

export const removeBookHandler = async ({ ctx, input }: RemoveBook) => {
  const { user } = ctx;

  const removeBookRes = await prisma.book.delete({
    where: {
      isbn: input.isbn,
    },
  });

  return { ...removeBookRes };
};
