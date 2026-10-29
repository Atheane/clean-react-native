/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICarbonErrorCodes {
  INVALID_HOUSE_PROPS = 'INVALID_HOUSE_PROPS',
  INVALID_TRANSPORT_PROPS = 'INVALID_TRANSPORT_PROPS',
  INVALID_FOOD_PROPS = 'INVALID_FOOD_PROPS',
  INVALID_FLY_PROPS = 'INVALID_FLY_PROPS',
  INVALID_HEATER_DATE = 'INVALID_HEATER_DATE',
  INVALID_HEATER_TYPE = 'INVALID_HEATER_TYPE',
  INVALID_HEATER_USAGE = 'INVALID_HEATER_USAGE',
}

export enum ICarbonErrorMessage {
  INVALID_HOUSE_PROPS = 'Invalid House Props',
  INVALID_TRANSPORT_PROPS = 'Invalid Transport Props',
  INVALID_FOOD_PROPS = 'Invalid Food Props',
  INVALID_FLY_PROPS = 'Invalid Fly Props',
  INVALID_HEATER_DATE = 'Invalid Heater Date',
  INVALID_HEATER_TYPE = 'Invalid Heater Type',
  INVALID_HEATER_USAGE = 'Invalid Heater Usage',
}

export namespace CarbonError {
  export class InvalidHouseProps
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_HOUSE_PROPS;
      this.message = ICarbonErrorMessage.INVALID_HOUSE_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidTransportProps
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_TRANSPORT_PROPS;
      this.message = ICarbonErrorMessage.INVALID_TRANSPORT_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFoodProps
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_FOOD_PROPS;
      this.message = ICarbonErrorMessage.INVALID_FOOD_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFlyProps extends Error implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage> {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_FLY_PROPS;
      this.message = ICarbonErrorMessage.INVALID_FLY_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidHeaterDate
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_HEATER_DATE;
      this.message = ICarbonErrorMessage.INVALID_HEATER_DATE;
      this.cause = cause;
    }
  }
  export class InvalidHeaterType
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_HEATER_TYPE;
      this.message = ICarbonErrorMessage.INVALID_HEATER_TYPE;
      this.cause = cause;
    }
  }
  export class InvalidHeaterUsage
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.INVALID_HEATER_USAGE;
      this.message = ICarbonErrorMessage.INVALID_HEATER_USAGE;
      this.cause = cause;
    }
  }
}
