import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import type { TBookAddSchema, TBookRemoveSchema, TBookUpdateSchema } from "./book.schema";

type AddBook = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TBookAddSchema;
};

export const addBookHandler = async ({ ctx, input }: AddBook) => {
  const { user } = ctx;

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

type UpdateBook = {
  input: TBookUpdateSchema;
};

export const updateBookHandler = async ({ input }: UpdateBook) => {
  console.log("update book", input);
  const res = await prisma.book.update({
    where: {
      isbn: input.oldIsbn,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};
