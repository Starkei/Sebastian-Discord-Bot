export type RiotHttpClientConfig = {
  baseUrl: string;
  verificationUrl: string;
  apiToken: string;
};

export type RiotClientConfig = {
  apiBaseUrl: string;
  apiToken: string;
  verificationUrl: string;
  getEncryptedUserIdByUserNameEndpoint: string;
  getUserLPbyEncryptedUserId: string;
};
