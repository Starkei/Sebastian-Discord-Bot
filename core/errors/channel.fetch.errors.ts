export class InvalidChannelIdError extends Error {
  constructor(id: string) {
    super(`Invalid channel id ${id}`);
  }
}

export class InvalidChannelTypeError extends Error {
  constructor(expectedType: keyof typeof ChannelType, actualType: keyof typeof ChannelType) {
    super(`Expected channel with type ${expectedType}. Details: actual type ${actualType}`);
  }
}

export class ChannelNotFoundError extends Error {
  constructor(id: string) {
    super(`Channel with ${id} not found`);
  }
}
