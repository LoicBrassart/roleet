import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`,
});
export default redisClient;
