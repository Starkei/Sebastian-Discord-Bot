import { Exception } from "@sebastian/errors";
import { LeagueOfLegendsUser, LeagueOfLegendsUserModel } from "./models";

export class LeagueOfLegendsUsersRepo {
  constructor() {}

  public createUser(user: LeagueOfLegendsUser) {
    const createdUser = new LeagueOfLegendsUserModel(user);
    return createdUser.save();
  }

  public deleteUser(userName: string) {
    throw new Error("Not implemented yet");
  }

  public async updateUser(userName: string, newUser: Partial<LeagueOfLegendsUser>) {
    const doc = await LeagueOfLegendsUserModel.findOne({ username: userName });
    if (!doc) {
      // TODO: Add exception user not found
      return Exception("User not found");
    }
    return doc.update(newUser);
  }

  public async getUser(userName: string): Promise<LeagueOfLegendsUser> {
    const doc = await LeagueOfLegendsUserModel.findOne({ username: userName });
    if (!doc) {
      // TODO: Add exception user not found
      return Exception("User not found");
    }
    return doc;
  }
}
