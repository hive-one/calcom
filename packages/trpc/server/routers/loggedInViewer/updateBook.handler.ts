import { prisma } from "@calcom/prisma";

import type { TBookUpdateSchema } from "./updateBook.schema";

type UpdateBook = {
  input: TBookUpdateSchema;
};

export const updateBookHandler = async ({ input }: UpdateBook) => {
  const updateBookRes = await prisma.book.update({
    where: {
      isbn: input.isbn,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  return { ...updateBookRes };
};
