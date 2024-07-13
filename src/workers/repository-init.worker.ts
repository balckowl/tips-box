import { Queue, Worker } from "bullmq";
import Redis from "ioredis";

import { exploreAndCreateFileRecords } from "@/lib/explore-and-create-file-records";
import { generateTip } from "@/lib/generate-tip";

const connection = new Redis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

export type RepositoryInitWorkerInputType = {
  repositoryId: number;
  repositoryPathForOctokit: string;
  userId: number;
};

export const repositoryInitQueue = new Queue<RepositoryInitWorkerInputType>("repositoryInitQueue", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      delay: 5000,
      type: "exponential",
    },
  },
});

const repositoryInitWorker = new Worker<RepositoryInitWorkerInputType>(
  "repositoryInitQueue",
  async (job) => {
    const { repositoryId, repositoryPathForOctokit, userId } = job.data;
    await exploreAndCreateFileRecords(repositoryPathForOctokit, repositoryId);
    for (let i = 0; i < 5; i++) {
      await generateTip(userId);
    }
  },
  {
    concurrency: 5,
    connection,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  },
);

export default repositoryInitWorker;
