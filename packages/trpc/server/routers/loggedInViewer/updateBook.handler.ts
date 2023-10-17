import { prisma } from "@calcom/prisma";

import type { TBookUpdateSchema } from "./book.schema";

type UpdateBook = {
  input: TBookUpdateSchema;
};

export const updateBookHandler = async ({ input }: UpdateBook) => {
  const res = await prisma.book.update({
    where: {
      isbn: input.isbn,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...res };
};
