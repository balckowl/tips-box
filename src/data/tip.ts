import prisma from "@/lib/prisma";

export const getTipsByUserId = async (userId: number) => {
  const userTips = await prisma.tip.findMany({
    where: {
      file: {
        repository: {
          userId: userId,
        },
      },
    },
  });

  return userTips;
};
