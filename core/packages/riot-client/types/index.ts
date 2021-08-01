export type RiotHttpClientConfig = {
  baseUrl: string;
  apiToken: string;
};

export type RiotClientConfig = {
  apiBaseUrl: string;
  apiToken: string;
  getEncryptedUserIdByUserNameEndpoint: string;
  getUserLPbyEncryptedUserId: string;
};
