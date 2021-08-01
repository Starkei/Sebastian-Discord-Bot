import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import "reflect-metadata";
import { Type } from "class-transformer";

export class ByUserNameDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class SummonerDto {
  @IsString()
  @IsNotEmpty()
  tier!: string;

  @IsString()
  @IsNotEmpty()
  rank!: string;

  @IsNumber()
  @IsNotEmpty()
  leaguePoints!: number;

  @IsNumber()
  @IsNotEmpty()
  wins!: number;

  @IsNumber()
  @IsNotEmpty()
  losses!: number;

  @IsBoolean()
  @IsNotEmpty()
  hotStreak!: boolean;
}

export class ByEncryptedUserIdDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => SummonerDto)
  gameModes!: [SummonerDto, SummonerDto];
}
