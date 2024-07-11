import { Octokit } from 'octokit';

import { excludedExtensions } from '@/lib/excludedExtensions';
import prisma from '@/lib/prisma';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
interface File {
  downloadUrl: string;
  isTipTarget: boolean;
  path: string;
}

export const exploreAndCreateFileRecords = async (userId: number, repositoryUrl: string) => {
  const files: File[] = await recursiveExploreRepository(repositoryUrl, []);

  const repository = await prisma.repository.create({
    data: {
      url: repositoryUrl,
      userId: userId,
    },
  });
  await prisma.file.createMany({
    data: files.map((file) => ({
      downloadUrl: file.downloadUrl,
      isTipTarget: file.isTipTarget,
      path: file.path,
      repositoryId: repository.id,
    })),
  });
};

const recursiveExploreRepository = async (url: string, files: File[]) => {
  let data;
  try {
    const response = await octokit.request('GET ' + url);
    data = response.data;
  } catch (error) {
    console.error(error);
    return files;
  }
  
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.type === 'dir') {
        await recursiveExploreRepository(item.url, files);
      }

      if (item.type === 'file' && item.download_url) {
        pushFileRecord(item, files);
      }
    }
  }

  // dataが単数のとき
  if (data.type === 'dir') {
    await recursiveExploreRepository(data.url, files);
  }

  if (data.type === 'file' && data.download_url) {
    pushFileRecord(data, files);
  }

  return files;
};

interface GitHubFileData {
  download_url: string;
  path: string;
}

const pushFileRecord = (data: GitHubFileData, files: File[]) => {
  let isTipTarget = true;
  if (excludedExtensions.some((ext) => data.path.endsWith(ext))) {
    isTipTarget = false;
  }

  files.push({
    downloadUrl: data.download_url,
    isTipTarget: isTipTarget,
    path: data.path,
  });
  return files;
};
