import { Exception } from "@sebastian/errors";
import { LeagueOfLegendsUserEntity, LeagueOfLegendsUserModel } from "./models";

export class LeagueOfLegendsUsersRepo {
  constructor() {}

  public createUser(user: LeagueOfLegendsUserEntity) {
    const createdUser = new LeagueOfLegendsUserModel(user);
    return createdUser.save();
  }

  public deleteUser(userName: string) {
    throw new Error("Not implemented yet");
  }

  public async updateUser(userName: string, newUser: Partial<LeagueOfLegendsUserEntity>) {
    const doc = await LeagueOfLegendsUserModel.findOne({ username: userName });
    if (!doc) {
      // TODO: Add exception user not found
      return Exception("User not found");
    }
    return doc.update(newUser);
  }

  public async getUser(userName: string): Promise<LeagueOfLegendsUserEntity> {
    const doc = await LeagueOfLegendsUserModel.findOne({ username: userName });
    if (!doc) {
      // TODO: Add exception user not found
      return Exception("User not found");
    }
    return doc;
  }
}
