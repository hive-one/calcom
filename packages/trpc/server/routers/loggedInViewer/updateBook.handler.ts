import { prisma } from "@calcom/prisma";

import type { TBookUpdateSchema } from "./book.schema";

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
