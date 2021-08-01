export class RiotWrongCredentialsError extends Error {
  constructor() {
    super(`Wrong credentials for Riot API`);
  }
}
