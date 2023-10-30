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
  const addBook = await prisma.book.upsert({
    where: {
      isbn: input.isbn,
    },
    update: {
      authors: {
        connect: {
          id: ctx.user.id,
        },
      },
    },
    create: {
      ...input,
      updatedAt: new Date(),
      authors: {
        connect: {
          id: ctx.user.id,
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
  const removeBookRes = await prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      books: {
        disconnect: [{ isbn: input.isbn }],
      },
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
