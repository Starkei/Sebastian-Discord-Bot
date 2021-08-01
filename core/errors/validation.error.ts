import { ValidationError } from "class-validator";

export class CompactValidationError extends Error {
  constructor(errors: ValidationError[]) {
    super(errors.map((e) => e.toString()).join(", "));
  }
}
