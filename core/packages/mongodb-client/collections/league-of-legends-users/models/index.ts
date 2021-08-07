import { Schema, model } from "mongoose";

export interface LeagueOfLegendsUser {
  username: string;
  encryptedUsername: string;
  lp: number;
}

const schema = new Schema<LeagueOfLegendsUser>({
  username: { type: String, required: true },
  encryptedUsername: { type: String, required: true },
  lp: { type: Number, required: false },
});

export const LeagueOfLegendsUserModel = model<LeagueOfLegendsUser>("LeagueOfLegendsUser", schema);
