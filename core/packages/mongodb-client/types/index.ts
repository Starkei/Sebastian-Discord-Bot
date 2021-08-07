export type MongoDBConfig = {
  password: string;
  username: string;
  // Format mongodb+srv://{username}:{password}@bla-bla-bla
  url: string;
};
