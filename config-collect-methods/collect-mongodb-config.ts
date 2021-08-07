import { MongoDBConfig } from "@sebastian/packages/mongodb-client";
import { assert } from "console";

export function collectMongoDbConfig(): MongoDBConfig {
  const username: string = String(process.env.MONGODB_USERNAME);
  assert(username !== "undefined", "MongoDB username is not defined");

  const password: string = String(process.env.MONGODB_PASSWORD);
  assert(password !== "undefined", "MongoDB password is not defined");

  const url: string = String(process.env.MONGODB_URL);
  assert(url !== "undefined", "MongoDB url is not defined");

  return {
    username,
    password,
    url,
  };
}
