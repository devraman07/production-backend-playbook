import { Queue } from "bullmq";
import { redisConnection } from "../../configs/ioRedis";

export const emailQueue = new Queue("email", {
    connection : redisConnection,
})
