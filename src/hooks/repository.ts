import useSWRMutation from "swr/mutation";

import { CreateRepositoryRequest } from "@/app/api/v1/repositories/init/route";

export const useRepositoryMutation = () => {
  async function initRepository(url: string, { arg }: { arg: CreateRepositoryRequest }) {
    const { repositoryUrl } = arg;
    await fetch(url, {
      body: JSON.stringify({
        repositoryUrl,
      }),
      method: "POST",
    });
  }

  const initRepositoryMutation = useSWRMutation("/api/v1/repositories/init", initRepository);

  return {
    initRepositoryMutation,
  };
};
