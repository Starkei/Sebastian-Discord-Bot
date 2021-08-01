import { Either } from "monet";

export type AsyncEither<TErr, TResult> = Promise<Either<TErr, TResult>>;
