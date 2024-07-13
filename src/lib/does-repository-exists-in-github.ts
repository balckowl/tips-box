import { octokit } from "./octokit";

export const doesRepositoryExistInGitHub = async (repositoryUrl: string) => {
  try {
    const { data } = await octokit.request("GET " + repositoryUrl);
    return data ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
