import { TipProps } from "@/components/home/tips-section/tip";
import prisma from "@/lib/prisma";

export const getTipsByUserId = async (userId: number) => {
  const dbTips = await prisma.tip.findMany({
    select: {
      title: true,
      content: true,
      createdAt: true,
      file: {
        select: {
          path: true,
          repository: {
            select: {
              url: true,
            },
          },
        },
      },
    },
    where: {
      file: {
        repository: {
          userId: userId,
        },
      },
    },
  });

  const tips: TipProps[] = dbTips.map((tip) => {
    return {
      title: tip.title,
      codeUrl: `${tip.file.repository.url}/blob/main/${tip.file.path}`,
      content: tip.content,
      createdAt: tip.createdAt.toISOString(),
    };
  });

  return tips;
};
