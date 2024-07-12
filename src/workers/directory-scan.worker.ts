import { Queue, Worker } from "bullmq";
import Redis from "ioredis";

import { exploreAndCreateFileRecords } from "@/lib/explore-and-create-file-records";

const connection = new Redis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

export type DirectoryScanWorkerInputType = {
  repositoryUrl: string;
  userId: number;
};

export const directoryScanQueue = new Queue<DirectoryScanWorkerInputType>("directoryScanQueue", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      delay: 5000,
      type: "exponential",
    },
  },
});

const directoryScanWorker = new Worker<DirectoryScanWorkerInputType>(
  "directoryScanQueue",
  async (job) => {
    const { repositoryUrl, userId } = job.data;
    await exploreAndCreateFileRecords(userId, repositoryUrl);
  },
  {
    concurrency: 5,
    connection,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  },
);

export default directoryScanWorker;
