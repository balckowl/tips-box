import useSWRMutation from "swr/mutation";

import { CreateRepositoryRequest } from "@/app/api/repositories/route";

export const useRepositories = () => {
  async function createRepository(url: string, { arg }: { arg: CreateRepositoryRequest }) {
    const { repositoryUrl } = arg;
    await fetch(url, {
      body: JSON.stringify({
        repositoryUrl,
      }),
      method: "POST",
    });
  }

  const createRepositoryMutation = useSWRMutation("/api/repositories", createRepository);

  return {
    createRepositoryMutation,
  };
};
