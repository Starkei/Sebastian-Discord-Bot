import { Either, Left, Right } from "monet";
import { AxiosResponse } from "axios";
import { validateSync } from "class-validator";
import { CompactValidationError, Exception } from "@sebastian/errors";
import { EncryptedSummonerId, LeaguePoints, SummonerRankData, SummonerUserName } from "../types";
import { NotFoundEncryptedUserIDError, NotFoundSummonerNameError } from "../errors";
import { RiotWrongCredentialsError } from "../../errors";
import { ByEncryptedUserIdDto, ByUserNameDto, SummonerDto } from "../models";
import { mapToSummonerRankData } from "../mappers";
import { plainToClass } from "class-transformer";

export function hardMapToEncryptedSummonerId(
  response: AxiosResponse,
  userName: SummonerUserName
): Either<NotFoundSummonerNameError | RiotWrongCredentialsError | CompactValidationError, EncryptedSummonerId> {
  if (response.status === 200) {
    const dto = Object.assign(new ByUserNameDto(), { ...response.data });
    const errors = validateSync(dto);
    if (errors.length) {
      return Left(new CompactValidationError(errors));
    }
    return Right(response.data.id);
  }
  if (response.status === 404) {
    return Left(new NotFoundSummonerNameError(userName));
  }
  if (response.status === 403) {
    return Left(new RiotWrongCredentialsError());
  }
  return Exception(`Unsupported response status`);
}

export function hardMapToLeaguePoints(
  response: AxiosResponse,
  encryptedSummonerId: EncryptedSummonerId
): Either<NotFoundEncryptedUserIDError | RiotWrongCredentialsError | CompactValidationError, SummonerRankData> {
  if (response.status === 200) {
    const dto = new ByEncryptedUserIdDto();
    dto.gameModes = response.data.map((r: any) => plainToClass(SummonerDto, { ...r }));
    const errors = validateSync(dto);
    if (errors.length) {
      return Left(new CompactValidationError(errors));
    }
    return Right(mapToSummonerRankData(dto.gameModes[0]));
  }
  if (response.status === 404) {
    return Left(new NotFoundEncryptedUserIDError(encryptedSummonerId));
  }
  if (response.status === 403) {
    return Left(new RiotWrongCredentialsError());
  }
  return Exception(`Unsupported response status`);
}
