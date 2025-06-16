import type { GraphQLResolveInfo } from "graphql";
import type { ArgsDictionary, MiddlewareFn } from "type-graphql";
import redisClient from "../lib/Redis";

function generateKey(info: GraphQLResolveInfo, args: ArgsDictionary) {
  const operationName = info.fieldName;
  const argsHash = Buffer.from(JSON.stringify(args)).toString("base64");
  //TODO: Add Context
  return `query:${operationName};args:${argsHash}.`;
}

export default function CheckCache(
  cacheDurationInSeconds: number,
): MiddlewareFn {
  return async ({ info, args }, next) => {
    const key = generateKey(info, args);
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const result = await next();
    await redisClient.set(key, JSON.stringify(result));
    await redisClient.expire(key, cacheDurationInSeconds);
    return result;
  };
}
