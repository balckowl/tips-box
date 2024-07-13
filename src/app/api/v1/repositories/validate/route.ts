import { NextRequest, NextResponse } from "next/server";

import { authenticateUser } from "@/lib/authenticate-user";
import { doesRepositoryExistInGitHub } from "@/lib/does-repository-exists-in-github";

export type ValidateRepositoryRequest = {
  url: string;
};

export const GET = async (req: NextRequest) => {
  const sessionUser = await authenticateUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const repositoryUrl = searchParams.get("url");

  if (!repositoryUrl) {
    return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
  }

  const [owner, repo] = repositoryUrl.replace("https://github.com/", "").split("/");

  const repositoryExists = await doesRepositoryExistInGitHub(`/repos/${owner}/${repo}/contents`);
  return NextResponse.json({ repositoryExists });
};

export type ValidateRepositoryResponse = {
  repositoryExists: boolean;
};
