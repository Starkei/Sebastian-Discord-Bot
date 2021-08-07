import { Exception } from "@sebastian/errors";
import { doEither } from "@sebastian/packages/eithers";
import { AsyncEither } from "@sebastian/types";
import { Right } from "monet";
import { FilterQuery } from "mongoose";
import { CommonRepo } from "../common.repo";
import { LolUserAlreadyExistsError, LolUserNotFoundError } from "./errors";
import { LeagueOfLegendsUserEntity, LeagueOfLegendsUserModel } from "./models";

export class LeagueOfLegendsUsersRepo extends CommonRepo<
  LeagueOfLegendsUserEntity,
  LolUserNotFoundError,
  LolUserAlreadyExistsError
> {
  constructor() {
    super(LeagueOfLegendsUserModel);
  }

  public async getLpByEncryptedUserId(encryptedUsername: string): AsyncEither<LolUserNotFoundError, number> {
    return doEither(async (run) => {
      const user = run(await this.get({ encryptedUsername: encryptedUsername }));
      return Right(user.lp);
    });
  }

  protected makeNotFoundError(filter?: FilterQuery<LeagueOfLegendsUserEntity>): LolUserNotFoundError {
    return new LolUserNotFoundError(filter);
  }

  protected makeAlreadyExistsError(entity: Omit<LeagueOfLegendsUserEntity, "_id">): LolUserAlreadyExistsError {
    return new LolUserAlreadyExistsError(entity);
  }
}
