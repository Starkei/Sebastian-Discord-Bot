export { ChannelNotFoundError, InvalidChannelIdError, InvalidChannelTypeError } from "./channel.fetch.errors";
export { CompactValidationError } from "./validation.error";

export function Exception(val: Error | string): never {
  if (val instanceof Error) {
    throw new Error(val.message);
  }
  throw new Error(val);
}
