/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum IFootprintErrorCodes {
  INVALID_HOUSE_PROPS = 'INVALID_HOUSE_PROPS',
  INVALID_TRANSPORT_PROPS = 'INVALID_TRANSPORT_PROPS',
  INVALID_FOOD_PROPS = 'INVALID_FOOD_PROPS',
  INVALID_FLY_PROPS = 'INVALID_FLY_PROPS',
  INVALID_HEATER_DATE = 'INVALID_HEATER_DATE',
  INVALID_HEATER_TYPE = 'INVALID_HEATER_TYPE',
  INVALID_HEATER_USAGE = 'INVALID_HEATER_USAGE',
  HEATER_ALREADY_EXISTS = 'HEATER_ALREADY_EXISTS',
}

export enum IFootprintErrorMessage {
  INVALID_HOUSE_PROPS = 'Invalid House Props',
  INVALID_TRANSPORT_PROPS = 'Invalid Transport Props',
  INVALID_FOOD_PROPS = 'Invalid Food Props',
  INVALID_FLY_PROPS = 'Invalid Fly Props',
  INVALID_HEATER_DATE = 'Invalid Heater Date',
  INVALID_HEATER_TYPE = 'Invalid Heater Type',
  INVALID_HEATER_USAGE = 'Invalid Heater Usage',
  HEATER_ALREADY_EXISTS = 'Heater already exists',
}

export namespace FootprintError {
  export class InvalidHouseProps
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_HOUSE_PROPS;
      this.message = IFootprintErrorMessage.INVALID_HOUSE_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidTransportProps
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_TRANSPORT_PROPS;
      this.message = IFootprintErrorMessage.INVALID_TRANSPORT_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFoodProps
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_FOOD_PROPS;
      this.message = IFootprintErrorMessage.INVALID_FOOD_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFlyProps
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_FLY_PROPS;
      this.message = IFootprintErrorMessage.INVALID_FLY_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidHeaterDate
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_HEATER_DATE;
      this.message = IFootprintErrorMessage.INVALID_HEATER_DATE;
      this.cause = cause;
    }
  }
  export class InvalidHeaterType
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_HEATER_TYPE;
      this.message = IFootprintErrorMessage.INVALID_HEATER_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidHeaterUsage
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.INVALID_HEATER_USAGE;
      this.message = IFootprintErrorMessage.INVALID_HEATER_USAGE;
      this.cause = cause;
    }
  }
  export class HeaterAlreadyExists
    extends Error
    implements IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>
  {
    code: IFootprintErrorCodes;
    message: IFootprintErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = IFootprintErrorCodes.HEATER_ALREADY_EXISTS;
      this.message = IFootprintErrorMessage.HEATER_ALREADY_EXISTS;
      this.cause = cause;
    }
  }
}
