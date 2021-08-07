import { Either, Left } from "monet";
import { AsyncEither } from "@sebastian/types";

export async function doEither<TError extends Error, R>(
  callback: (run: typeof runContext) => AsyncEither<TError, R>
): AsyncEither<TError, R> {
  try {
    const result = await callback(runContext);
    return result;
  } catch (err) {
    if (err instanceof RunErrorHandler) {
      return Left(err.err as TError);
    }
    throw err;
  }
}

function runContext<L extends Error, R>(either: Either<L, R>): R {
  if (either.isLeft()) {
    throw new RunErrorHandler(either.left());
  }
  return either.right();
}

class RunErrorHandler {
  constructor(public readonly err: Error) {}
}
