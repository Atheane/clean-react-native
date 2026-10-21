/* eslint-disable @typescript-eslint/no-namespace */
import { IDomainError } from '@clean-rn/ddd';

export enum ICarbonErrorCodes {
  INVALID_HOUSE_PROPS = 'CARBON_DOMAIN_0',
  INVALID_TRANSPORT_PROPS = 'CARBON_DOMAIN_1',
  INVALID_FOOD_PROPS = 'CARBON_DOMAIN_2',
  INVALID_FLY_PROPS = 'CARBON_DOMAIN_3',
}

export enum ICarbonErrorMessage {
  INVALID_HOUSE_PROPS = 'Invalid House Props',
  INVALID_TRANSPORT_PROPS = 'Invalid Transport Props',
  INVALID_FOOD_PROPS = 'Invalid Food Props',
  INVALID_FLY_PROPS = 'Invalid Fly Props',
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
}
