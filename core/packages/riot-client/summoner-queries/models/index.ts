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
import { Transform, Type } from "class-transformer";
import { mapToArabic } from "../mappers/roman-to-arabic";

export class ByUserNameDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class SummonerDto {
  @IsString()
  @IsNotEmpty()
  tier!: string;

  @Transform(({ value }) => mapToArabic(value), { toClassOnly: true })
  @IsNumber()
  @IsNotEmpty()
  rank!: number;

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
