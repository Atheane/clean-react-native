import { ServerError } from '@clean-rn/shared/infrastructure';
import { IGlobalErrorActions, IGlobalErrorTypes, IShownUnknownError, IInitGlobalError } from './types';

export const showUnknownError = (error: ServerError | Error): IShownUnknownError => ({
  type: IGlobalErrorTypes.SHOW_UNKNOWN_ERROR,
  payload: error,
});

export const initGlobalError = (): IInitGlobalError => ({
  type: IGlobalErrorTypes.INIT_GLOBAL_ERROR,
});

export { IGlobalErrorTypes, IGlobalErrorActions };
