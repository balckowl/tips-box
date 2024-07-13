import { NextResponse } from "next/server";

import { GITHUB_URL } from "@/const/url";
import { authenticateUser } from "@/lib/authenticate-user";
import { directoryScanQueue } from "@/workers/directory-scan.worker";

export type CreateRepositoryRequest = {
  repositoryUrl: string;
};

export async function POST(req: Request) {
  const sessionUser = await authenticateUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as CreateRepositoryRequest;
  const { repositoryUrl } = body;

  if (!repositoryUrl) {
    return NextResponse.json({ error: "repositoryUrl is required" }, { status: 400 });
  }

  const userAndRepoSegment = repositoryUrl.replace(GITHUB_URL, "");
  const repositoryPath = `/repos/${userAndRepoSegment}/contents`;

  try {
    await directoryScanQueue.add("directoryScan", { repositoryPath, userId: sessionUser.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}