import { FilterQuery } from "mongoose";
import { LeagueOfLegendsUserEntity } from "../models";

export class LolUserNotFoundError extends Error {
  constructor(filter?: FilterQuery<LeagueOfLegendsUserEntity>) {
    super(`League of legends user not found. Details: ${filter}`);
  }
}

export class LolUserAlreadyExistsError extends Error {
  constructor(entity: LeagueOfLegendsUserEntity) {
    super(`League of legends user is already exists. Details: ${entity}`);
  }
}
