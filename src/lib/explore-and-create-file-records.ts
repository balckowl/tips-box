import { Octokit } from "octokit";

import { excludedExtensions } from "@/lib/excluded-extensions";
import prisma from "@/lib/prisma";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
interface File {
  downloadUrl: string;
  isTipTarget: boolean;
  path: string;
}

/**
 * repositoryPathForOctokit は以下のような形式であることが期待される
 * /repos/:owner/:repo/contents
 */
export const exploreAndCreateFileRecords = async (repositoryPathForOctokit: string, repositoryId: number) => {
  const files: File[] = await recursiveExploreRepository(repositoryPathForOctokit, []);

  await prisma.file.createMany({
    data: files.map((file) => ({
      downloadUrl: file.downloadUrl,
      isTipTarget: file.isTipTarget,
      path: file.path,
      repositoryId: repositoryId,
    })),
  });
};

export const doesRepositoryExistInGitHub = async (repositoryUrl: string) => {
  try {
    const { data } = await octokit.request("GET " + repositoryUrl);
    return data ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
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
