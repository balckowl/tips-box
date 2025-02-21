import { NextResponse } from "next/server";

import { GITHUB_URL } from "@/const/url";
import { authenticateUser } from "@/lib/authenticate-user";
import prisma from "@/lib/prisma";
import { repositoryInitQueue } from "@/workers/repository-init.worker";

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

  const repository = await prisma.repository.create({
    data: {
      url: repositoryUrl,
      userId: sessionUser.id,
    },
  });

  const userAndRepoSegment = repository.url.replace(GITHUB_URL, "");
  const repositoryPathForOctokit = `/repos/${userAndRepoSegment}/contents`;

  try {
    await repositoryInitQueue.add("repositoryInit", {
      repositoryId: repository.id,
      repositoryPathForOctokit,
      userId: sessionUser.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
