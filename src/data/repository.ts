import prisma from "@/lib/prisma";

async function getRepositoryCount(userId: number) {
  const userRepocount = await prisma.repository.count({
    where: {
      userId,
    },
  });

  return userRepocount;
}

export { getRepositoryCount };
