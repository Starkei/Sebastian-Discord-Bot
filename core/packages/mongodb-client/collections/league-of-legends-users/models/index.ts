import { Schema, model } from "mongoose";

export interface LeagueOfLegendsUserEntity {
  username: string;
  encryptedUsername: string;
  lp: number;
}

const schema = new Schema<LeagueOfLegendsUserEntity>({
  username: { type: String, required: true },
  encryptedUsername: { type: String, required: true },
  lp: { type: Number, required: false },
});

export const LeagueOfLegendsUserModel = model<LeagueOfLegendsUserEntity>("LeagueOfLegendsUser", schema);
