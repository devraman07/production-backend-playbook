import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis.js";

export const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log(
      "Processing email job:",
      job.name
    );

    console.log(job.data);

    if (job.name === "welcome-email") {
      console.log(
        `Sending welcome email to ${job.data.email}`
      );
    }
  },
  {
    connection: redisConnection,
  }
);