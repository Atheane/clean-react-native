import { ServerError } from '@clean-rn/shared/infrastructure';

export enum IGlobalErrorTypes {
  SHOW_UNKNOWN_ERROR = 'SHOW_UNKNOWN_ERROR',
  INIT_GLOBAL_ERROR = 'INIT_GLOBAL_ERROR',
}

export type IShownUnknownError = {
  type: typeof IGlobalErrorTypes.SHOW_UNKNOWN_ERROR;
  payload: ServerError | Error;
};

export type IInitGlobalError = {
  type: typeof IGlobalErrorTypes.INIT_GLOBAL_ERROR;
};

export type IGlobalErrorActions = IShownUnknownError | IInitGlobalError;
