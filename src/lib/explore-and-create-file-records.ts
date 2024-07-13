import { Octokit } from "octokit";

import { excludedExtensions } from "@/lib/excluded-extensions";
import prisma from "@/lib/prisma";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
interface File {
  downloadUrl: string;
  isTipTarget: boolean;
  path: string;
}

export const exploreAndCreateFileRecords = async (repositoryPath: string, repositoryId: number) => {
  const files: File[] = await recursiveExploreRepository(repositoryPath, []);

  await prisma.file.createMany({
    data: files.map((file) => ({
      downloadUrl: file.downloadUrl,
      isTipTarget: file.isTipTarget,
      path: file.path,
      repositoryId: repositoryId,
    })),
  });
};

const recursiveExploreRepository = async (url: string, files: File[]) => {
  try {
    const { data } = await octokit.request("GET " + url);

    const items = Array.isArray(data) ? data : [data];

    for (const item of items) {
      if (item.type === "dir") {
        await recursiveExploreRepository(item.url, files);
      } else if (item.type === "file" && item.download_url) {
        pushFileRecord(item, files);
      }
    }

    return files;
  } catch (error) {
    console.error(error);
    return files;
  }
};

interface GitHubFileData {
  download_url: string;
  path: string;
}

const pushFileRecord = (data: GitHubFileData, files: File[]) => {
  const isTipTarget = excludedExtensions.every((ext) => !data.path.endsWith(ext));

  files.push({
    downloadUrl: data.download_url,
    isTipTarget: isTipTarget,
    path: data.path,
  });
  return files;
};
