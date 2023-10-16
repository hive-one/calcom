import { prisma } from "@calcom/prisma";

export const updateLinksHandler = async ({ ctx, input }) => {
  const { user } = ctx;
  console.log("handler", user);
  console.log("post input", input);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      socialLinks: { input },
    },
  });

  return { ...updatedUser };
};
