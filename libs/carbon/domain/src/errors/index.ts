/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICarbonErrorCodes {
  INVALID_HOUSE_PROPS = 'INVALID_HOUSE_PROPS',
  INVALID_TRANSPORT_PROPS = 'INVALID_TRANSPORT_PROPS',
  INVALID_FOOD_PROPS = 'INVALID_FOOD_PROPS',
  INVALID_FLY_PROPS = 'INVALID_FLY_PROPS',
  MISSING_HEATER_TYPE = 'MISSING_HEATER_TYPE',
  MISSING_PREVIOUS_HEATER_TYPE = 'MISSING_PREVIOUS_HEATER_TYPE',
  MISSING_HEATER_INSTALLATION_YEAR = 'MISSING_HEATER_INSTALLATION_YEAR',
  MISSING_HEATER_PROPS = 'MISSING_HEATER_PROPS',
  MISSING_HEATER = 'MISSING_HEATER',
}

export enum ICarbonErrorMessage {
  INVALID_HOUSE_PROPS = 'Invalid House Props',
  INVALID_TRANSPORT_PROPS = 'Invalid Transport Props',
  INVALID_FOOD_PROPS = 'Invalid Food Props',
  INVALID_FLY_PROPS = 'Invalid Fly Props',
  MISSING_HEATER_TYPE = 'Missing Heater Type',
  MISSING_PREVIOUS_HEATER_TYPE = 'Missing Previous Heater Type',
  MISSING_HEATER_INSTALLATION_YEAR = 'Missing Heater Installation Year',
  MISSING_HEATER_PROPS = 'Missing Heater Props',
  MISSING_HEATER = 'Missing Heater',
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
  export class MissingHeaterType
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.MISSING_HEATER_TYPE;
      this.message = ICarbonErrorMessage.MISSING_HEATER_TYPE;
      this.cause = cause;
    }
  }
  export class MissingHeaterInstallationYear
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.MISSING_HEATER_INSTALLATION_YEAR;
      this.message = ICarbonErrorMessage.MISSING_HEATER_INSTALLATION_YEAR;
      this.cause = cause;
    }
  }
  export class MissingHeaterProps
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.MISSING_HEATER_PROPS;
      this.message = ICarbonErrorMessage.MISSING_HEATER_PROPS;
      this.cause = cause;
    }
  }
  export class MissingHeater extends Error implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage> {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.MISSING_HEATER;
      this.message = ICarbonErrorMessage.MISSING_HEATER;
      this.cause = cause;
    }
  }
  export class MissingPreviousHeaterType
    extends Error
    implements IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
  {
    code: ICarbonErrorCodes;
    message: ICarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = ICarbonErrorCodes.MISSING_PREVIOUS_HEATER_TYPE;
      this.message = ICarbonErrorMessage.MISSING_PREVIOUS_HEATER_TYPE;
      this.cause = cause;
    }
  }
}
