import prisma from "@/lib/prisma";

async function getRepositoryCount(userId: number) {
  const userRepositoryCount = await prisma.repository.count({
    where: {
      userId,
    },
  });

  return userRepositoryCount;
}

export { getRepositoryCount };
