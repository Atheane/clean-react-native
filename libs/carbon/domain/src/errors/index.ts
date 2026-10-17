/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum CarbonErrorCodes {
  INVALID_HOUSE_PROPS = 'CARBON_DOMAIN_0',
  INVALID_TRANSPORT_PROPS = 'CARBON_DOMAIN_1',
  INVALID_FOOD_PROPS = 'CARBON_DOMAIN_2',
  INVALID_FLY_PROPS = 'CARBON_DOMAIN_3',
}

export enum CarbonErrorMessage {
  INVALID_HOUSE_PROPS = 'Invalid House Props',
  INVALID_TRANSPORT_PROPS = 'Invalid Transport Props',
  INVALID_FOOD_PROPS = 'Invalid Food Props',
  INVALID_FLY_PROPS = 'Invalid Fly Props',
}

export namespace CarbonError {
  export class InvalidHouseProps extends Error implements IDomainError<CarbonErrorCodes, CarbonErrorMessage> {
    code: CarbonErrorCodes;
    message: CarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = CarbonErrorCodes.INVALID_HOUSE_PROPS;
      this.message = CarbonErrorMessage.INVALID_HOUSE_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidTransportProps
    extends Error
    implements IDomainError<CarbonErrorCodes, CarbonErrorMessage>
  {
    code: CarbonErrorCodes;
    message: CarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = CarbonErrorCodes.INVALID_TRANSPORT_PROPS;
      this.message = CarbonErrorMessage.INVALID_TRANSPORT_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFoodProps extends Error implements IDomainError<CarbonErrorCodes, CarbonErrorMessage> {
    code: CarbonErrorCodes;
    message: CarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = CarbonErrorCodes.INVALID_FOOD_PROPS;
      this.message = CarbonErrorMessage.INVALID_FOOD_PROPS;
      this.cause = cause;
    }
  }
  export class InvalidFlyProps extends Error implements IDomainError<CarbonErrorCodes, CarbonErrorMessage> {
    code: CarbonErrorCodes;
    message: CarbonErrorMessage;
    cause?: unknown;

    constructor(cause?: unknown) {
      super();
      this.code = CarbonErrorCodes.INVALID_FLY_PROPS;
      this.message = CarbonErrorMessage.INVALID_FLY_PROPS;
      this.cause = cause;
    }
  }
}
