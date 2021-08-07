import { AsyncEither } from "@sebastian/types";
import { Left, Right } from "monet";
import { FilterQuery, Model } from "mongoose";

export abstract class CommonRepo<T, NotFoundError extends Error, AlreadyExistsError extends Error> {
  constructor(protected readonly model: Model<T>) {}

  public async getAll(): Promise<T[]> {
    const result = await this.model.find();
    return result;
  }

  public async get(filter: FilterQuery<T>): AsyncEither<NotFoundError, T> {
    const result = await this.model.findOne(filter);
    if (!result) {
      return Left(this.makeNotFoundError(filter));
    }
    return Right(result);
  }

  public async update(filter: FilterQuery<T>, entity: Partial<T>): Promise<void> {
    await this.model.updateMany(filter, entity as any);
  }

  public async create(entity: Omit<T, "_id">): AsyncEither<AlreadyExistsError, string> {
    try {
      const doc = await this.model.create(entity);
      return Right(doc._id);
    } catch (err) {
      return Left(this.makeAlreadyExistsError(entity));
    }
  }

  public async delete(filter: FilterQuery<T>): Promise<void> {
    await this.model.deleteMany(filter);
  }

  protected abstract makeNotFoundError(filter?: FilterQuery<T>): NotFoundError;
  protected abstract makeAlreadyExistsError(entity: Omit<T, "_id">): AlreadyExistsError;
}
